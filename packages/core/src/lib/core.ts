import {
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  CubicBezierCurve3,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LinearFilter,
  PerspectiveCamera,
  Plane,
  Points,
  RawShaderMaterial,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  VertexColors,
  WebGLRenderer,
  WebGLRenderTarget,
} from 'three';

import { EventEmitter } from './emitter';
import { GraphOptions } from './options';
import { fragmentShader, vertexShader } from './shaders';

import { Line2 } from '../../externals/lines/Line2.js';
import { LineMaterial } from '../../externals/lines/LineMaterial.js';
import { LineSegmentsGeometry } from '../../externals/lines/LineSegmentsGeometry.js';

export class PretyGraph {

  public onEvent: EventEmitter = new EventEmitter();

  private _camera!: PerspectiveCamera;

  private _scene!: Scene;

  private _options: GraphOptions = {};

  private _renderer!: WebGLRenderer;

  private _container: HTMLElement = document.body;

  private _fov: number = 75;

  private _far: number = 10000;

  private _nodes: any[] = [];

  private _edges: any[] = [];

  private _nodesMaterial!: RawShaderMaterial;

  private _nodesGeometry!: InstancedBufferGeometry;

  private _animationFrameRequestId: number | null = null;

  private _nodeTranslateAttribute!: InstancedBufferAttribute;

  private _nodeColorAttribute!: InstancedBufferAttribute;

  private _center: any = null;

  private _controls!: any;

  private _pickingNodesScene!: Scene;

  private _pickingTexture!: WebGLRenderTarget;

  private _nodesPickingMaterial!: RawShaderMaterial;

  private _nodesPickingGeometry!: BufferGeometry;

  private _nodeMesh!: Points;

  private _nodesPickingsMesh!: Points;

  private _hoveredNode: any = null;

  private _hoveredNodeID: number | null = null;

  private _hoveredEdge: any = null;

  private _hoveredEdgeID: number | null = null;

  private _dragInProgress: boolean = false;

  private _dragging: boolean = false;

  private _plane = new Plane();

  private _raycaster = new Raycaster();

  private _intersection = new Vector3()

  private _offset = new Vector3();

  private _textureCanvas!: HTMLCanvasElement;

  private _textureWidth: number = 0;

  private _textureHeight: number = 0;

  private _textureIndex: number = 0;

  private _nodeImageToIndex: any = {};

  private _textureMap!: CanvasTexture;

  private _lineGeometry!: LineSegmentsGeometry;

  private _lineMaterial!: LineMaterial;

  private _pickingLineScene!: Scene;

  private _linesPickingGeometry!: LineSegmentsGeometry;

  private _lineMesh!: Line2;

  private _canvasTextureWidth: number = 4096;

  private _canvasTextureHeight: number = 4096;

  constructor(options: GraphOptions) {
    this.options = options;

    if (this.options.container) {
      this._container = this.options.container;

      // Wipe dom
      this._container.innerHTML = '';
    }

    this._setupScene();
    this._setupCamera();
    this._setupRenderer();

    this._controls = new options.controls(this._camera, this._container);
    this._controls.init();

    this._controls.onChange.on('scale', this._onScale.bind(this));

    this._controls.onChange.on('mousemove', this._onMouseMove.bind(this));

    this._controls.onChange.on('contextmenu', this._onContextMenu.bind(this));

    this._controls.onChange.on('dblclick', this._onDblClick.bind(this));

    this._controls.onChange.on('mousedown', this._onMouseDown.bind(this));

    this._controls.onChange.on('mouseup', this._onMouseUp.bind(this));

    this._pickingNodesScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);

    this._pickingLineScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);

    const dimensions = this._container.getBoundingClientRect();
    this._pickingTexture = new WebGLRenderTarget(dimensions.width, dimensions.height);
    this._pickingTexture.texture.minFilter = LinearFilter;

    this._createTextureMap();

    // Start render loop
    this._renderLoop();

    window.addEventListener('resize', () => {
      const d = this._container.getBoundingClientRect();

      this._renderer.setSize(d.width, d.height);
      this._camera.aspect = d.width / d.height;
      this._camera.updateProjectionMatrix();

      this._pickingTexture = new WebGLRenderTarget(d.width, d.height);
    });
  }

  set options(options: GraphOptions) {
    // Добавить мердж с дефолтными опциями
    this._options = options;
  }

  get options(): GraphOptions {
    return this._options;
  }

  public setData(data: any): void {
    this._nodes = data.nodes;
    this._edges = data.links;

    if (data.center) {
      this._center = data.nodes.find((n: any) => +n.id === +data.center);
      if (this._center) {
        this._controls.setTransform(this._center);
      }
    }

    this._drawEdges();
    this._drawNodes();
    this._drawArrows();
  }

  public stopRenderLoop(): void {
    if (this._animationFrameRequestId) {
      cancelAnimationFrame(this._animationFrameRequestId);
    }

    this._animationFrameRequestId = null;
  }

  public resumeRenderLoop(): void {
    if (!this._animationFrameRequestId) {
      this._renderLoop();
    }
  }

  public destroy(): void {
    this._disposeMesh();
    this._disposeTextures();
    this._disposeMaterials();
    this._disposeGeometries();

    this.stopRenderLoop();

    this._disposeRenderer();

    this._container.innerHTML = '';
  }

  private _onMouseMove(position: any): void {
    if (this._dragging) {
      // dragging node
      const d = this._container.getBoundingClientRect();
      const mouse = new Vector3();
      mouse.x = (position.x / d.width) * 2 - 1;
      mouse.y = -(position.y / d.height) * 2 + 1;

      let newPos = {
        x: this._hoveredNode.x,
        y: this._hoveredNode.y
      };

      if (!this._dragInProgress) {
        const worldVector = new Vector3();
        this._camera.getWorldDirection(worldVector);
        this._plane.setFromNormalAndCoplanarPoint(worldVector, new Vector3(this._hoveredNode.x, this._hoveredNode.y, 0));
        this._raycaster.setFromCamera(mouse, this._camera);
        this._raycaster.ray.intersectPlane(this._plane, this._intersection);
        this._offset.copy(this._intersection).sub(new Vector3(this._hoveredNode.x, this._hoveredNode.y, 0));
        newPos = this._intersection.sub(this._offset).clone();

        this._dragInProgress = true;
      } else {
        this._raycaster.setFromCamera(mouse, this._camera);
        this._raycaster.ray.intersectPlane(this._plane, this._intersection);
        newPos = this._intersection.sub(this._offset).clone();
      }

      if (this._hoveredNodeID !== null) {
        this._nodesGeometry.attributes.translation.setXYZ(this._hoveredNodeID, newPos.x, newPos.y, 0)
        this._nodesPickingGeometry.attributes.translation.setXYZ(this._hoveredNodeID, newPos.x, newPos.y, 0)
      }

      this._hoveredNode.x = newPos.x;
      this._hoveredNode.y = newPos.y;

      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeMoving', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });

      (this._nodesGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;

      const links = this._constructLines(this._edges);
      this._lineGeometry.setPositions(links.positions);
      this._linesPickingGeometry.setPositions(links.positions);
      this._lineGeometry.attributes.instanceStart.data.needsUpdate = true;
      this._lineGeometry.attributes.instanceEnd.data.needsUpdate = true;
      this._linesPickingGeometry.attributes.instanceStart.data.needsUpdate = true;
      this._linesPickingGeometry.attributes.instanceEnd.data.needsUpdate = true;
    } else {
      this._testNode(position);
      this._testEdge(position);
    }
  }

  private _onMouseUp(): void {
    this._controls.enabled = true;
    this._dragging = false;
    this._dragInProgress = false;
  }

  private _onMouseDown(): void {
    if (this._hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeClick', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
      this._controls.enabled = false;
      this._dragging = true;
    }
  }

  private _onDblClick(): void {
    if (this._hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeDblClick', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
    }
  }

  private _onContextMenu(): void {
    if (this._hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeContextMenu', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
    }
  }

  private _onScale(scale: number): void {
    if (this._nodesMaterial) {
      this._nodesMaterial.uniforms.scale.value = scale;
      this._nodesMaterial.needsUpdate = true;
      this._nodesPickingMaterial.uniforms.scale.value = scale;
      this._nodesPickingMaterial.needsUpdate = true;

      if (this._hoveredNode) {
        const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
        this.onEvent.emit('nodeScaling', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
      }
    }
  }

  private _disposeMesh(): void {
    if (this._lineMesh) {
      this._scene.remove(this._lineMesh);
    }

    if (this._nodeMesh) {
      this._scene.remove(this._nodeMesh);
    }

    if (this._nodesPickingsMesh) {
      this._pickingNodesScene.remove(this._nodesPickingsMesh);
    }
  }

  private _disposeGeometries(): void {
    if (this._nodesGeometry) {
      this._nodesGeometry.dispose();
    }

    if (this._nodesPickingGeometry) {
      this._nodesPickingGeometry.dispose();
    }

    if (this._lineGeometry) {
      this._lineGeometry.dispose();
    }
  }

  private _disposeRenderer(): void {
    if (this._renderer) {
      this._renderer.dispose();
    }
  }

  private _disposeMaterials(): void {
    if (this._nodesMaterial) {
      this._nodesMaterial.dispose();
    }

    if (this._nodesPickingMaterial) {
      this._nodesPickingMaterial.dispose();
    }

    if (this._lineMaterial) {
      this._lineMaterial.dispose();
    }
  }

  private _disposeTextures(): void {
    if (this._textureMap) {
      this._textureMap.dispose();
    }

    if (this._pickingTexture) {
      this._pickingTexture.dispose();
    }
  }

  private _testNode(position: any): void {
    this._renderer.render(this._pickingNodesScene, this._camera, this._pickingTexture);
    const pixelBuffer = new Uint8Array(4);
    this._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
    /* tslint:disable-next-line */
    const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
    if (id) {
      if (this._hoveredNodeID !== id - 1) {
        if (this._hoveredNode !== null) {
          this._setNodeColor(this._hoveredNode.color);
        }

        this._hoveredNode = this._nodes[id - 1];
        this._hoveredNodeID = id - 1;
        this._setNodeColor(0xff0000);

        const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
        this.onEvent.emit('nodeHover', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
      }
    } else {
      if (this._hoveredNode !== null) {
        this._setNodeColor(this._hoveredNode.color);
        this.onEvent.emit('nodeUnhover', { node: this._hoveredNode });
        this._hoveredNode = null;
        this._hoveredNodeID = null;
      }
    }
  }

  private _testEdge(position: any): void {
    this._renderer.render(this._pickingLineScene, this._camera, this._pickingTexture);
    const pixelBuffer = new Uint8Array(4);
    this._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
    /* tslint:disable-next-line */
    const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
    if (id) {
      if (this._hoveredEdgeID !== id - 1) {
        if (this._hoveredEdge !== null) {
          this._setEdgeColor(this._hoveredEdge.color);
          this._setEdgeSize(this._hoveredEdge.size);
        }

        this._hoveredEdge = this._edges[id - 1];
        this._hoveredEdgeID = id - 1;
        this._setEdgeColor(0xff0000);
        this._setEdgeSize(this._hoveredEdge.size * 5);

        // ToDo: отсылать надо центр ребра?
        this.onEvent.emit('edgeHover', { edge: this._hoveredEdge, ...position });
      }
    } else {
      if (this._hoveredEdge !== null) {
        this._setEdgeColor(this._hoveredEdge.color);
        this._setEdgeSize(this._hoveredEdge.size);

        this.onEvent.emit('edgeUnhover', { edge: this._hoveredEdge });
        this._hoveredEdge = null;
        this._hoveredEdgeID = null;
      }
    }
  }

  private _setEdgeSize(size: number): void {
    if (this._hoveredEdge._lineSizeRange) {
      const count = this._hoveredEdge._lineSizeRange[1] - this._hoveredEdge._lineSizeRange[0];

      if (count > 1) {
        for (let i = this._hoveredEdge._lineSizeRange[0]; i < this._hoveredEdge._lineSizeRange[1] / 2 + 2; i++) {
          this._lineGeometry.attributes.linewidth.setX(i, size);
        }
      } else {
        this._lineGeometry.attributes.linewidth.setX(this._hoveredEdge._lineSizeRange[0], size);
      }

      this._lineGeometry.attributes.linewidth.updateRange = { offset: this._hoveredEdge._lineSizeRange[0], count };
      this._lineGeometry.attributes.linewidth.needsUpdate = true;

      if (count > 1) {
        for (let i = this._hoveredEdge._lineSizeRange[0]; i < this._hoveredEdge._lineSizeRange[1] / 2 + 2; i++) {
          this._linesPickingGeometry.attributes.linewidth.setX(i, size);
        }
      } else {
        this._linesPickingGeometry.attributes.linewidth.setX(this._hoveredEdge._lineSizeRange[0], size);
      }
      this._linesPickingGeometry.attributes.linewidth.updateRange = { offset: this._hoveredEdge._lineSizeRange[0], count };
      this._linesPickingGeometry.attributes.linewidth.needsUpdate = true;
    }
  }

  private _setEdgeColor(edgeColor: any): void {
    const color = new Color();
    color.setHex(edgeColor);

    if (this._hoveredEdgeID !== null) {
      //
    }
  }

  private _setNodeColor(nodeColor: any): void {
    const color = new Color();
    color.setHex(nodeColor);

    if (this._hoveredNodeID !== null) {
      this._nodeColorAttribute.setXYZ(this._hoveredNodeID, color.r, color.g, color.b);
      this._nodeColorAttribute.needsUpdate = true;
    }
  }

  private _translateCoordinates(x: number, y: number): any {
    const vector = new Vector3(x, y, 0);

    const widthHalf = 0.5 * this._renderer.context.canvas.width;
    const heightHalf = 0.5 * this._renderer.context.canvas.height;

    vector.project(this._camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return {
      x: vector.x,
      y: vector.y
    };
  }

  private _drawNodes(): void {
    const color = new Color();

    const translateArray = new Float32Array(this._nodes.length * 3);
    const colors = new Float32Array(this._nodes.length * 3);
    const sizes = new Float32Array(this._nodes.length);
    const images = new Float32Array(this._nodes.length);

    for (let i = 0, i3 = 0, l = this._nodes.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._nodes[i].x;
      translateArray[ i3 + 1 ] = this._nodes[i].y;
      translateArray[ i3 + 2 ] = 0;

      color.setHex(this._nodes[i].color);

      colors[ i3 + 0 ] = color.r;
      colors[ i3 + 1 ] = color.g;
      colors[ i3 + 2 ] = color.b;

      sizes[i] = this._nodes[i].size;

      if (this._nodes[i].img) {
        images[i] = this._loadImage(this._nodes[i].img);
      } else {
        images[i] = -1;
      }
    }

    const nodesGeometry = new BufferGeometry();
    this._nodesGeometry = new InstancedBufferGeometry();
    this._nodesGeometry.index = nodesGeometry.index;
    this._nodesGeometry.attributes = nodesGeometry.attributes;

    this._nodesGeometry.addAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3));

    this._nodeTranslateAttribute = new InstancedBufferAttribute(translateArray, 3);
    this._nodeColorAttribute = new InstancedBufferAttribute(colors, 3);

    this._nodesGeometry.addAttribute('translation', this._nodeTranslateAttribute);
    this._nodesGeometry.addAttribute('color', this._nodeColorAttribute);
    this._nodesGeometry.addAttribute('size', new InstancedBufferAttribute(sizes, 1));
    this._nodesGeometry.addAttribute('image', new InstancedBufferAttribute(images, 1));

    this._nodesMaterial = new RawShaderMaterial({
      depthTest: false,
      fragmentShader,
      transparent: false,
      uniforms: {
        scale: {
          type: 'f',
          value: this._controls ? this._controls.scale : 1.0
        },
        spriteDim: {
          value: new Vector2(this._textureWidth, this._textureHeight)
        },
        textureDim: {
          value: new Vector2(this._canvasTextureWidth, this._canvasTextureHeight)
        },
        textureMap: {
          type: 't',
          value: this._textureMap
        },
        useColor: {
          type: 'f',
          value: 0.0,
        },
      },
      vertexShader
    });

    this._nodeMesh = new Points(this._nodesGeometry, this._nodesMaterial);
    this._nodeMesh.frustumCulled = false;
    this._nodeMesh.renderOrder = 10;
    this._scene.add(this._nodeMesh);

    // Add duplicates for GPU picking
    const pickingColors = new Float32Array(this._nodes.length * 3);
    for (let i = 0, i3 = 0, l = this._nodes.length; i < l; i ++, i3 += 3 ) {
      color.setHex(i + 1);

      pickingColors[ i3 + 0 ] = color.r;
      pickingColors[ i3 + 1 ] = color.g;
      pickingColors[ i3 + 2 ] = color.b;
    }

    this._nodesPickingMaterial = new RawShaderMaterial({
      fragmentShader,
      uniforms: {
        scale: {
          type: 'f',
          value: this._controls ? this._controls.scale : 1.0
        },
        useColor: {
          type: 'f',
          value: 1.0,
        },
      },
      vertexShader,
    });

    const clone = this._nodeMesh.clone();
    this._nodesPickingGeometry = clone.geometry.clone() as BufferGeometry;
    this._nodesPickingGeometry.addAttribute('color', new InstancedBufferAttribute(pickingColors, 3));
    this._nodesPickingsMesh = new Points(this._nodesPickingGeometry, this._nodesPickingMaterial);
    this._nodesPickingsMesh.frustumCulled = false;
    this._pickingNodesScene.add(this._nodesPickingsMesh);
    this._pickingNodesScene.updateMatrixWorld(true);
  }

  private _drawEdges(): void {
    const linesData = this._constructLines(this._edges);

    this._lineGeometry = new LineSegmentsGeometry();
    this._lineGeometry.setPositions(linesData.positions);
    this._lineGeometry.setColors(linesData.colors);

    this._lineGeometry.addAttribute('linewidth', new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1));

    this._lineGeometry.attributes.instanceStart.data.dynamic = true;
    this._lineGeometry.attributes.instanceEnd.data.dynamic = true;

    this._lineMaterial = new LineMaterial({
      dashed: false,
      vertexColors: VertexColors
    });

    const dimensions = this._container.getBoundingClientRect();

    this._lineMaterial.useColor = 1.0;
    this._lineMaterial.resolution.set(dimensions.width, dimensions.height);

    this._lineMesh = new Line2(this._lineGeometry, this._lineMaterial);
    this._lineMesh.computeLineDistances();
    this._scene.add(this._lineMesh);

    // clone lines for GPU picking
    const cloneLine = this._lineMesh.clone();
    this._linesPickingGeometry = new LineSegmentsGeometry();
    this._linesPickingGeometry.setPositions(linesData.positions);
    this._linesPickingGeometry.setColors(linesData.pickingColors);

    this._linesPickingGeometry.addAttribute('linewidth', new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1));

    this._linesPickingGeometry.attributes.instanceStart.data.dynamic = true;
    this._linesPickingGeometry.attributes.instanceEnd.data.dynamic = true;

    cloneLine.geometry = this._linesPickingGeometry;

    this._pickingLineScene.add(cloneLine);
    this._pickingLineScene.updateMatrixWorld(true);
  }

  private _drawArrows(): void {
    //
  }

  private _setupScene(): void {
    this._scene = new Scene();
    this._scene.background = new Color(this.options.backgroundColor || 'white');
  }

  private _setupCamera(): void {
    const dimensions = this._container.getBoundingClientRect();

    this._camera = new PerspectiveCamera(this._fov, dimensions.width / dimensions.height, 0.1, this._far);
    this._camera.lookAt(0, 0, 0);
  }

  private _setupRenderer(): void {
    this._renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    });

    // Add support for retina displays
    this._renderer.setPixelRatio(window.devicePixelRatio);

    const dimensions = this._container.getBoundingClientRect();

    // Set canvas dimension
    this._renderer.setSize(dimensions.width, dimensions.height);

    // Add the canvas to the DOM
    this._container.appendChild(this._renderer.domElement);
  }

  private _renderLoop(): void {
    this._renderer.render(this._scene, this._camera);
    this._animationFrameRequestId = requestAnimationFrame(this._renderLoop.bind(this));
  }

  private _createTextureMap(): void {
    this._textureCanvas = document.createElement('canvas');
    this._textureCanvas.width = this._canvasTextureWidth;
    this._textureCanvas.height = this._canvasTextureHeight;
    this._textureHeight = this._canvasTextureHeight / 32;
    this._textureWidth = this._canvasTextureWidth / 32;

    const ctx = this._textureCanvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.clearRect(0, 0, this._canvasTextureWidth, this._canvasTextureHeight);
    }

    this._textureMap = new CanvasTexture(this._textureCanvas);
    this._textureMap.flipY = false;
  }

  private _loadImage(imageUrl: string): number {
    if (this._nodeImageToIndex[imageUrl] !== undefined) {
      return this._nodeImageToIndex[imageUrl];
    }

    const ctx = this._textureCanvas.getContext('2d');

    if (!ctx) {
      return -1;
    }

    const index = this._textureIndex;
    this._textureIndex += 1;
    this._nodeImageToIndex[imageUrl] = index;

    const img = new Image();

    img.onload = () => {
      const x = (index * this._textureWidth) % this._canvasTextureWidth;
      const y = Math.floor((index * this._textureWidth) / this._canvasTextureWidth) * this._textureHeight;

      ctx.drawImage(
        img,
        0, 0,
        img.width, img.height,
        x, y,
        this._textureWidth, this._textureHeight
      );

      this._textureMap.needsUpdate = true;
    };

    img.src = imageUrl;

    return index;
  }

  private _constructLines(links: any[]): any {
    const positions: any[] = [];
    const colors: any[] = [];
    const sizes: any[] = [];
    const pickingColors: any[] = [];

    const color = new Color();
    const pickingColor = new Color();

    links.forEach((link, index) => {
      // Это радиус ноды, его надо брать из параметров и вычислять вот так (size * scale * 10.0)
      const radius = (5 / 2) * 10.0;
      const angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);

      const sourceX = link.source.x + radius * Math.cos(angle);
      const sourceY = link.source.y + radius * Math.sin(angle);

      const targetX = link.target.x - radius * Math.cos(angle);
      const targetY = link.target.y - radius * Math.sin(angle);

      color.setHex(link.color);
      pickingColor.setHex(index + 1);

      if (link.source.x === link.target.x && link.source.y === link.target.y) {
        const vStart = new Vector3(link.source.x, link.source.y || 0, 0);
        const vEnd = new Vector3(link.target.x, link.target.y || 0, 0);

        const d = 15 * link.source.size;
        const endAngle = -0; // Rotate clockwise (from Z angle perspective)
        const startAngle = endAngle + Math.PI / 2;

        const curve = new CubicBezierCurve3(
          vStart,
          new Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0).add(vStart),
          new Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0).add(vStart),
          vEnd
        );
        const points = curve.getPoints(50);
        link._lineSizeRange = [sizes.length, sizes.length + points.length * 2];

        let lastPoint;
        for (let i = 0; i < points.length - 1; i += 2) {
          if (lastPoint) {
            positions.push(
              lastPoint.x, lastPoint.y, 0,
              points[i].x, points[i].y, 0,
              points[i].x, points[i].y, 0,
              points[i + 1].x, points[i + 1].y, 0
            );

            sizes.push(link.size, link.size);

            colors.push(
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b,  // color end
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b  // color end
            );

            pickingColors.push(
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
            );
          } else {
            positions.push(
              points[i].x, points[i].y, 0,
              points[i + 1].x, points[i + 1].y, 0
            );

            sizes.push(link.size);

            colors.push(
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b  // color end
            );

            pickingColors.push(
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
            );
          }
          lastPoint = points[i + 1];
        }
      } else {
        positions.push(
          sourceX, sourceY, 0, // start point
          targetX, targetY, 0  // end point
        );

        link._lineSizeRange = [sizes.length, sizes.length + 1];
        sizes.push(link.size);

        colors.push(
          color.r, color.g, color.b, // color start
          color.r, color.g, color.b  // color end
        );

        pickingColors.push(
          pickingColor.r, pickingColor.g, pickingColor.b,
          pickingColor.r, pickingColor.g, pickingColor.b,
        );
      }
    });

    return {
      colors,
      pickingColors,
      positions,
      sizes
    }
  }
}
