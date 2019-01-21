import {
  BufferAttribute,
  BufferGeometry,
  Color,
  CubicBezierCurve3,
  Event as ThreeEvent,
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
import { ImageCanvas } from './imageCanvas';
import { GraphOptions } from './options';
import {
  fragmentShader,
  pickingFragmentShader,
  pickingVertexShader,
  vertexShader,
} from './shaders';

import { ArrowsLayer } from './arrows/arrows';
import { LabelsLayer } from './labels/labels';

import { Line2 } from '../../externals/lines/Line2.js';
import { LineMaterial } from '../../externals/lines/LineMaterial.js';
import { LineSegmentsGeometry } from '../../externals/lines/LineSegmentsGeometry.js';

export class PretyGraph {

  public onEvent: EventEmitter = new EventEmitter();

  public nodeScalingFactor: number = 7.0;

  public animationTime: number = 500;

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

  private _hoveredEdge: any = null;

  private _hoveredEdgeID: number | null = null;

  private _dragInProgress: boolean = false;

  private _dragging: boolean = false;

  private _plane = new Plane();

  private _raycaster = new Raycaster();

  private _intersection = new Vector3()

  private _offset = new Vector3();

  private _lineGeometry!: LineSegmentsGeometry;

  private _lineMaterial!: LineMaterial;

  private _pickingLineScene!: Scene;

  private _linesPickingGeometry!: LineSegmentsGeometry;

  private _lineMesh!: Line2;

  private _linePickingMesh!: Line2;

  private _imageCanvas: ImageCanvas;

  private _imageLoaded: (event: ThreeEvent) => void;

  private _indexedNodes: { [id: string]: any; } = {};

  private _colorToNodeID: { [id: number]: string; } = {};

  private _labelsLayer: LabelsLayer | null = null;

  private _arrowsLayer!: ArrowsLayer;

  constructor(options: GraphOptions) {
    this.options = options;

    if (this.options.container) {
      this._container = this.options.container;

      if (options.clearContainer) {
        // Wipe dom
        this._container.innerHTML = '';
      }
    }

    this._setupScene();
    this._setupCamera();
    this._setupRenderer();
    this._setupPickingScene();

    this._controls = new options.controls(this._camera, this._container);
    this._controls.init();

    this._controls.addEventListener('scale', this._onScale.bind(this));

    this._controls.addEventListener('mousemove', this._onMouseMove.bind(this));

    this._controls.addEventListener('contextmenu', this._onContextMenu.bind(this));

    this._controls.addEventListener('dblclick', this._onDblClick.bind(this));

    this._controls.addEventListener('click', this._onClick.bind(this));

    this._controls.addEventListener('mousedown', this._onMouseDown.bind(this));

    this._controls.addEventListener('mouseup', this._onMouseUp.bind(this));

    this._imageLoaded = () => {
      this._render();
    };

    this._imageCanvas = new ImageCanvas();

    this._render();

    if (this.options.showLabels) {
      this._labelsLayer = new LabelsLayer(this._scene, this.nodeScalingFactor);
    }
    this._arrowsLayer = new ArrowsLayer(this._scene, this.nodeScalingFactor);

    window.addEventListener('resize', () => {
      this._renderer.setSize(this._container.clientWidth, this._container.clientHeight);
      this._camera.aspect = this._container.clientWidth / this._container.clientHeight;
      this._camera.updateProjectionMatrix();

      if (this._lineMaterial) {
        this._lineMaterial.resolution.set(this._container.clientWidth, this._container.clientHeight);
        this._lineMaterial.needsUpdate = true;
      }

      this._pickingTexture = new WebGLRenderTarget(this._container.clientWidth, this._container.clientHeight);

      this._render();
    });
  }

  set options(options: GraphOptions) {
    // Добавить мердж с дефолтными опциями
    this._options = options;
  }

  get options(): GraphOptions {
    return this._options;
  }

  public setData(data: any, options = { animate: false }): void {
    this._nodes = data.nodes;
    this._edges = data.links;

    const lastIndexedNodes = JSON.parse(JSON.stringify(this._indexedNodes));
    this._indexingNodes();

    if (data.center) {
      this._center = this._indexedNodes[data.center];
      if (this._center) {
        this._controls.setTransform(this._center);
      }
    }

    this._disposeMesh();
    this._disposeMaterials();
    this._disposeGeometries();
    this._disposeTextures();

    if (this._labelsLayer) {
      this._labelsLayer.dispose();
    }
    this._arrowsLayer.dispose();

    this._renderer.clear();
    this._renderer.renderLists.dispose();

    this._pickingTexture = new WebGLRenderTarget(this._container.clientWidth, this._container.clientHeight);
    this._pickingTexture.texture.minFilter = LinearFilter;

    this._imageCanvas.addEventListener('imageLoaded', this._imageLoaded);

    if (options.animate) {
        for (const k in this._indexedNodes) {
          if (lastIndexedNodes[k]) {
            this._indexedNodes[k].toX = this._indexedNodes[k].x;
            this._indexedNodes[k].toY = this._indexedNodes[k].y;
            this._indexedNodes[k].fromX = lastIndexedNodes[k].x;
            this._indexedNodes[k].fromY = lastIndexedNodes[k].y;
            this._indexedNodes[k].x = lastIndexedNodes[k].x;
            this._indexedNodes[k].y = lastIndexedNodes[k].y;
          } else {
            this._indexedNodes[k].toX = this._indexedNodes[k].x;
            this._indexedNodes[k].toY = this._indexedNodes[k].y;
            if (this._center && this._indexedNodes[k].id === this._center.id) {
              this._indexedNodes[k].fromX = this._center.x;
              this._indexedNodes[k].fromY = this._center.y;
              this._indexedNodes[k].x = this._center.x;
              this._indexedNodes[k].y = this._center.y;
            } else {
              this._indexedNodes[k].fromX = this._getRandomFromRange(-this._container.clientWidth, this._container.clientWidth);
              this._indexedNodes[k].fromY = this._getRandomFromRange(-this._container.clientHeight, this._container.clientHeight);
              this._indexedNodes[k].x = this._getRandomFromRange(-this._container.clientWidth, this._container.clientWidth);
              this._indexedNodes[k].y = this._getRandomFromRange(-this._container.clientHeight, this._container.clientHeight);
            }
          }
        }

        this._drawEdges();
        this._arrowsLayer.draw();

        this._drawNodes();

        if (this._labelsLayer) {
          this._labelsLayer.draw();
        }

        this._render();

        requestAnimationFrame(this._animate.bind(this));
    } else {
      this._drawEdges();
      this._arrowsLayer.draw();

      this._drawNodes();

      if (this._labelsLayer) {
        this._labelsLayer.draw();
      }

      this._render();
    }
  }

  public stopRenderLoop(): void {
    if (this._animationFrameRequestId) {
      cancelAnimationFrame(this._animationFrameRequestId);
    }

    this._animationFrameRequestId = null;
  }

  public resumeRenderLoop(): void {
    if (!this._animationFrameRequestId) {
      this._render();
    }
  }

  public getNodeByID(nodeID: string): any {
    const node = this._indexedNodes[nodeID];

    const coordinates = this._translateCoordinates(node.x, node.y);

    return {
      node,
      ...coordinates,
      scale: this._controls.scale
    };
  }

  public getScreenshot(): string {
    const renderer = new WebGLRenderer({ premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: true, alpha: true });
    renderer.setSize(this._container.clientWidth, this._container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(this._scene, this._camera);

    return renderer.domElement.toDataURL( 'image/png' );
  }

  public destroy(): void {
    this._disposeMesh();
    this._disposeTextures();
    this._disposeMaterials();
    this._disposeGeometries();

    this.stopRenderLoop();

    if (this._labelsLayer) {
      this._labelsLayer.dispose();
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.dispose();
    }

    this._disposeRenderer();

    this._controls.dispose();
  }

  private _onMouseMove({ position }: any): void {
    if (this._dragging) {
      // dragging node
      const mouse = new Vector3();
      mouse.x = (position.x / this._container.clientWidth) * 2 - 1;
      mouse.y = -(position.y / this._container.clientHeight) * 2 + 1;

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

      if (this._hoveredNode !== null) {
        this._nodesGeometry.attributes.translation.setXYZ(this._hoveredNode.__positionIndex, newPos.x, newPos.y, 0)
        this._nodesPickingGeometry.attributes.translation.setXYZ(this._hoveredNode.__positionIndex, newPos.x, newPos.y, 0)

        if (this._labelsLayer && this._hoveredNode.__labelIndex) {
          this._labelsLayer.setLabelPosition(this._hoveredNode.__labelIndex, { x: newPos.x, y: newPos.y, z: 0 });
        }
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

      this._arrowsLayer.recalculate();

      this._render();
    } else {
      if (!this._testNode(position)) {
        this._testEdge(position);
      }
    }
  }

  private _onMouseUp(): void {
    this._controls.enabled = true;
    this._dragging = false;
    this._dragInProgress = false;
  }

  private _onMouseDown({ event }): void {
    if (this._hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeClick', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });

      if (event.buttons === 1) {
        this._controls.enabled = false;
        this._dragging = true;
      }
    }
  }

  private _onClick(): void {
    if (!this._hoveredNode && !this._hoveredEdge) {
      this.onEvent.emit('workspaceClick');
    }
  }

  private _onDblClick(): void {
    if (this._hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeDblClick', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
    }
  }

  private _onContextMenu(position: { x: number, y: number }): void {
    if (this._hoveredNode) {
      const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
      this.onEvent.emit('nodeContextMenu', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
    } else if (this._hoveredEdge) {
      this.onEvent.emit('edgeContextMenu', { edge: this._hoveredEdge, coordinates: position, scale: this._controls.scale });
    }

  }

  private _onScale(event: any): void {
    if (this._nodesMaterial) {
      this._nodesMaterial.uniforms.scale.value = event.scale;
      this._nodesMaterial.needsUpdate = true;
      this._nodesPickingMaterial.uniforms.scale.value = event.scale;
      this._nodesPickingMaterial.needsUpdate = true;

      this._lineMaterial.uniforms.scale.value = event.scale;
      this._lineMaterial.needsUpdate = true;

      this._render();

      if (this._hoveredNode) {
        const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
        this.onEvent.emit('nodeScaling', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
      } else {
        this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale });
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

    if (this._linePickingMesh) {
      this._pickingLineScene.remove(this._linePickingMesh);
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

    if (this._linesPickingGeometry) {
      this._linesPickingGeometry.dispose();
    }
  }

  private _disposeRenderer(): void {
    if (this._renderer) {
      this._renderer.clear();
      this._renderer.renderLists.dispose();
      this._container.removeChild(this._renderer.domElement);
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
    this._imageCanvas.removeEventListener('imageLoaded', this._imageLoaded);

    if (this._imageCanvas) {
      this._imageCanvas.dispose();
    }

    if (this._pickingTexture) {
      this._pickingTexture.dispose();
    }
  }

  private _testNode(position: any): boolean {
    if (this._pickingTexture) {
      this._renderer.render(this._pickingNodesScene, this._camera, this._pickingTexture);
      const pixelBuffer = new Uint8Array(4);
      this._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
      /* tslint:disable-next-line */
      const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
      if (id) {
        const node = this._indexedNodes[this._colorToNodeID[id]];
        if (this._hoveredNode !== node) {
          if (this._hoveredNode !== null) {
            this._setNodeColor(this._hoveredNode.color);
          }

          if (this._hoveredEdge !== null) {
            this._setEdgeColor(this._hoveredEdge.color);
            this._setEdgeSize(this._hoveredEdge.size);
          }

          this._hoveredNode = this._indexedNodes[this._colorToNodeID[id]];
          this._setNodeColor(0xff0000);

          const coordinates = this._translateCoordinates(this._hoveredNode.x, this._hoveredNode.y);
          this.onEvent.emit('nodeHover', { node: this._hoveredNode, ...coordinates, scale: this._controls.scale });
          this._render();
        }

        return true;
      } else {
        if (this._hoveredNode !== null) {
          this._setNodeColor(this._hoveredNode.color);
          this.onEvent.emit('nodeUnhover', { node: this._hoveredNode });
          this._hoveredNode = null;
          this._render();
        }

        return false;
      }
    }

    return false;
  }

  private _testEdge(position: any): void {
    if (this._pickingTexture) {
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

          if (this._hoveredNode !== null) {
            this._setNodeColor(this._hoveredNode.color);
          }

          this._hoveredEdge = this._edges[id - 1];
          this._hoveredEdgeID = id - 1;
          this._setEdgeColor(0xff0000);
          this._setEdgeSize(this._hoveredEdge.size < 3 ? 3 : this._hoveredEdge.size);

          // ToDo: отсылать надо центр ребра?
          this.onEvent.emit('edgeHover', { edge: this._hoveredEdge, ...position });
          this._render();
        }
      } else {
        if (this._hoveredEdge !== null) {
          this._setEdgeColor(this._hoveredEdge.color);
          this._setEdgeSize(this._hoveredEdge.size);

          this.onEvent.emit('edgeUnhover', { edge: this._hoveredEdge });
          this._hoveredEdge = null;
          this._hoveredEdgeID = null;
          this._render();
        }
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

      this._render();
    }
  }

  private _setEdgeColor(edgeColor: any): void {
    const color = new Color();
    color.setHex(edgeColor);

    if (this._hoveredEdgeID !== null) {
      //
      this._render();
    }
  }

  private _setNodeColor(nodeColor: any): void {
    const color = new Color();
    color.setHex(nodeColor);

    if (this._hoveredNode !== null) {
      this._nodeColorAttribute.setXYZ(this._hoveredNode.__positionIndex, color.r, color.g, color.b);
      this._nodeColorAttribute.needsUpdate = true;
      this._render();
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
        const imageIndex = this._imageCanvas.loadImage(this._nodes[i].img);
        this._nodes[i]._imageIndex = imageIndex;
        images[i] = imageIndex;
      } else {
        images[i] = -1;
      }

      this._nodes[i].__positionIndex = i;

      if (this._labelsLayer && this._nodes[i].label) {
        this._nodes[i].__labelIndex = this._labelsLayer.addLabel(this._nodes[i].label, this._nodes[i].x, this._nodes[i].y, this._nodes[i].size);
      }
    }

    const nodesGeometry = new BufferGeometry();
    this._nodesGeometry = new InstancedBufferGeometry();
    this._nodesGeometry.index = nodesGeometry.index;
    this._nodesGeometry.attributes = nodesGeometry.attributes;

    this._nodesGeometry.addAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3));

    this._nodeTranslateAttribute = new InstancedBufferAttribute(translateArray, 3);
    this._nodeTranslateAttribute.setDynamic(true);
    this._nodeColorAttribute = new InstancedBufferAttribute(colors, 3);
    this._nodeColorAttribute.setDynamic(true);

    this._nodesGeometry.addAttribute('translation', this._nodeTranslateAttribute);
    this._nodesGeometry.addAttribute('color', this._nodeColorAttribute);
    this._nodesGeometry.addAttribute('size', new InstancedBufferAttribute(sizes, 1));
    this._nodesGeometry.addAttribute('image', new InstancedBufferAttribute(images, 1));

    this._nodesMaterial = new RawShaderMaterial({
      depthTest: false,
      fragmentShader,
      transparent: false,
      uniforms: {
        nodeScalingFactor: {
          type: 'f',
          value: this.nodeScalingFactor
        },
        scale: {
          type: 'f',
          value: this._controls ? this._controls.scale : 1.0
        },
        spriteDim: {
          value: new Vector2(this._imageCanvas.textureWidth, this._imageCanvas.textureHeight)
        },
        textureDim: {
          value: new Vector2(this._imageCanvas.canvasWidth, this._imageCanvas.canvasHeight)
        },
        textureMap: {
          type: 't',
          value: this._imageCanvas.textureMap
        }
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

      this._colorToNodeID[i + 1] = this._nodes[i].id;
    }

    this._nodesPickingMaterial = new RawShaderMaterial({
      fragmentShader: pickingFragmentShader,
      uniforms: {
        nodeScalingFactor: {
          type: 'f',
          value: this.nodeScalingFactor
        },
        scale: {
          type: 'f',
          value: this._controls ? this._controls.scale : 1.0
        }
      },
      vertexShader: pickingVertexShader,
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
    this._lineGeometry.addAttribute('dashed', new InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1));

    this._lineGeometry.attributes.instanceStart.data.dynamic = true;
    this._lineGeometry.attributes.instanceEnd.data.dynamic = true;

    this._lineMaterial = new LineMaterial({
      dashScale: 0.1,
      dashSize: 2,
      depthTest: false,
      gapSize: 1,
      scale: this._controls ? this._controls.scale : 1.0,
      vertexColors: VertexColors
    });

    this._lineMaterial.useColor = 1.0;
    this._lineMaterial.resolution.set(this._container.clientWidth, this._container.clientHeight);

    this._lineMesh = new Line2(this._lineGeometry, this._lineMaterial);
    this._lineMesh.computeLineDistances();
    this._scene.add(this._lineMesh);

    // clone lines for GPU picking
    this._linePickingMesh = this._lineMesh.clone();
    this._linesPickingGeometry = new LineSegmentsGeometry();
    this._linesPickingGeometry.setPositions(linesData.positions);
    this._linesPickingGeometry.setColors(linesData.pickingColors);

    this._linesPickingGeometry.addAttribute('linewidth', new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1));
    this._linesPickingGeometry.addAttribute('dashed', new InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1));

    this._linesPickingGeometry.attributes.instanceStart.data.dynamic = true;
    this._linesPickingGeometry.attributes.instanceEnd.data.dynamic = true;

    this._linePickingMesh.geometry = this._linesPickingGeometry;

    this._pickingLineScene.add(this._linePickingMesh);
    this._pickingLineScene.updateMatrixWorld(true);
  }

  private _setupScene(): void {
    this._scene = new Scene();
    this._scene.background = new Color(this.options.backgroundColor || 'white');
  }

  private _setupPickingScene(): void {
    this._pickingNodesScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);

    this._pickingLineScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);
  }

  private _setupCamera(): void {
    this._camera = new PerspectiveCamera(this._fov, this._container.clientWidth / this._container.clientHeight, 0.1, this._far);
    this._camera.lookAt(0, 0, 0);
  }

  private _setupRenderer(): void {
    this._renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    });

    // Add support for retina displays
    this._renderer.setPixelRatio(window.devicePixelRatio);

    // Set canvas dimension
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight);

    // Add the canvas to the DOM
    this._container.appendChild(this._renderer.domElement);
  }

  private _render(): void {
    /* tslint:disable-next-line */
    console.log('Render draw calls: ', this._renderer.info.render.calls);
    this._renderer.render(this._scene, this._camera);
  }

  private _constructLines(links: any[]): any {
    const positions: any[] = [];
    const colors: any[] = [];
    const sizes: any[] = [];
    const isDashed: any[] = [];
    const pickingColors: any[] = [];

    const color = new Color();
    const pickingColor = new Color();

    this._arrowsLayer.reset();

    links.forEach((link, index) => {
      const angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);

      const sourceX = link.source.x + ((link.source.size / 2) * this.nodeScalingFactor) * Math.cos(angle);
      const sourceY = link.source.y + ((link.source.size / 2) * this.nodeScalingFactor) * Math.sin(angle);

      const targetX = link.target.x - (((link.target.size / 2) * this.nodeScalingFactor) + link.size * 2) * Math.cos(angle);
      const targetY = link.target.y - (((link.target.size / 2) * this.nodeScalingFactor) + link.size * 2) * Math.sin(angle);

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

            if (link.type === 'dashed') {
              isDashed.push(1.0, 1.0);
            } else {
              isDashed.push(0.0, 0.0);
            }

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
            if (link.type === 'dashed') {
              isDashed.push(1.0);
            } else {
              isDashed.push(0.0);
            }

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
        if (link.type === 'dashed') {
          isDashed.push(1.0);
        } else {
          isDashed.push(0.0);
        }

        colors.push(
          color.r, color.g, color.b, // color start
          color.r, color.g, color.b  // color end
        );

        pickingColors.push(
          pickingColor.r, pickingColor.g, pickingColor.b,
          pickingColor.r, pickingColor.g, pickingColor.b,
        );

        this._arrowsLayer.addArrow(link.source, link.target, link.size, link.color);
      }
    });

    return {
      colors,
      isDashed,
      pickingColors,
      positions,
      sizes,
    }
  }

  private _indexingNodes(): void {
    this._indexedNodes = {};

    this._nodes.forEach((node) => {
      if (this._indexedNodes[node.id]) {
        console.error(`Node with id ${node.id} already exists`);
      }

      this._indexedNodes[node.id] = node;
    });
  }

  private _moveNodes(last: boolean = false): void {
    const translateArray = new Float32Array(this._nodes.length * 3);

    for (let i = 0, i3 = 0, l = this._nodes.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._nodes[i].x;
      translateArray[ i3 + 1 ] = this._nodes[i].y;
      translateArray[ i3 + 2 ] = 0;

      this._nodes[i].__positionIndex = i;

      if (this._labelsLayer) {
        this._labelsLayer.setLabelPosition(this._nodes[i].__labelIndex, { x: this._nodes[i].x, y: this._nodes[i].y, z: 0}, false);
      }
    }

    (this._nodesGeometry.attributes.translation as InstancedBufferAttribute).setArray(translateArray);
    (this._nodesGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;

    if (this._labelsLayer) {
      this._labelsLayer.recalculate();
    }

    this._lineGeometry.dispose();
    const linesData = this._constructLines(this._edges);
    this._lineGeometry = new LineSegmentsGeometry();
    this._lineGeometry.setPositions(linesData.positions);
    this._lineGeometry.setColors(linesData.colors);

    this._lineGeometry.addAttribute('linewidth', new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1));

    this._lineGeometry.attributes.instanceStart.data.dynamic = true;
    this._lineGeometry.attributes.instanceEnd.data.dynamic = true;

    this._lineMesh.geometry = this._lineGeometry;

    this._arrowsLayer.recalculate();

    if (last) {
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).setArray(translateArray);
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;

      this._linesPickingGeometry.dispose();
      this._linesPickingGeometry = new LineSegmentsGeometry();
      this._linesPickingGeometry.setPositions(linesData.positions);
      this._linesPickingGeometry.setColors(linesData.pickingColors);

      this._linesPickingGeometry.addAttribute('linewidth', new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1));

      this._linesPickingGeometry.attributes.instanceStart.data.dynamic = true;
      this._linesPickingGeometry.attributes.instanceEnd.data.dynamic = true;
      this._linePickingMesh.geometry = this._linesPickingGeometry;
    }
  }

  private _getRandomFromRange(min, max): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _animate(): void {
    const interpolate = (val: number) => {
      let newValue = val;

      if ((newValue *= 2) < 1) {
        return 0.5 * newValue * newValue;
      }
      return - 0.5 * (--newValue * (newValue - 2) - 1);
    };

    const start = Date.now();
    this._arrowsLayer.hide();
    if (this._labelsLayer) {
      this._labelsLayer.hide();
    }

    const step = () => {
      let p = (Date.now() - start) / this.animationTime;

      if (p >= 1) {
        for (const k in this._indexedNodes) {
          if (this._indexedNodes[k]) {
            this._indexedNodes[k].x = this._indexedNodes[k].toX;
            this._indexedNodes[k].y = this._indexedNodes[k].toY;
          }
        }

        // ADD change node positions
        this._moveNodes(true);
        this._arrowsLayer.show();
        if (this._labelsLayer) {
          this._labelsLayer.show();
        }

        this._render();
      } else {
        p = interpolate(p);
        for (const k in this._indexedNodes) {
          if (this._indexedNodes[k]) {
            this._indexedNodes[k].x = this._indexedNodes[k].toX * p + this._indexedNodes[k].fromX * (1 - p);
            this._indexedNodes[k].y = this._indexedNodes[k].toY * p + this._indexedNodes[k].fromY * (1 - p);
          }
        }

        // ADD change node positions
        this._moveNodes();

        this._render();
        requestAnimationFrame(step);
      }
    };

    step();
  }
}
