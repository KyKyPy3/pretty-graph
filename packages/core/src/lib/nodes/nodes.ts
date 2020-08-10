import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  Event as ThreeEvent,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LinearFilter,
  Points,
  RawShaderMaterial,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderTarget,
} from "three";

import {
  fragmentShader,
  pickingFragmentShader,
  pickingVertexShader,
  vertexShader,
} from './shaders';

import { ImageCanvas } from './imageCanvas';
import { throttle, getRandomFromRange } from '../utils';

export class NodesLayer {

  public hoveredNode: any = null;

  private _color!: Color | null;

  private _colorToNodeID: { [id: number]: string; } = {};

  private _graph: any;

  private _nodesInstancedGeometry!: InstancedBufferGeometry | null;

  private _nodesBufferGeometry!: BufferGeometry | null;

  private _nodesMaterial!: RawShaderMaterial | null;

  private _pickingNodesScene!: Scene | null;

  private _nodeMesh!: Points | null;

  private _nodesPickingMaterial!: RawShaderMaterial | null;

  private _nodesPickingGeometry!: BufferGeometry | null;

  private _nodesPickingsMesh!: Points | null;

  private _imageCanvas: ImageCanvas;

  private _nodeTranslateAttribute!: InstancedBufferAttribute;

  private _nodeColorAttribute!: InstancedBufferAttribute;

  private _pickingTexture!: WebGLRenderTarget | null;

  private _imageLoaded: (event: ThreeEvent) => void;

  private _silent: boolean = false;

  private _size: Vector3 = new Vector3();

  private _buffer: Uint8Array = new Uint8Array();

  private _hoveredNodes: any[] = [];

  private _activeNodes: any[] = [];

  private _nodeList: Map<string, any> = new Map();

  constructor(graph: any) {
    this._graph = graph;

    this._imageLoaded = throttle(() => {
      if (!this._silent) {
        this._graph._render();
      }
    }, 800, { trailing: true });

    this._imageCanvas = new ImageCanvas();
    this._imageCanvas.addEventListener('imageLoaded', this._imageLoaded);

    this._pickingTexture = new WebGLRenderTarget(this._graph._container.clientWidth, this._graph._container.clientHeight);
    this._pickingTexture.texture.minFilter = LinearFilter;

    this._pickingNodesScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);

    this._color = new Color();
  }

  get activeNodes(): any[] {
    return this._activeNodes;
  }

  public getNodeByID(nodeID: string): any {
    return this._nodeList.get(nodeID);
  }

  public setNodes(nodes: any[], options: { animate: boolean }): void {
    let prevNodeList;

    if (options.animate) {
      prevNodeList = this._nodeList;
    }

    this._nodeList = new Map();

    for (const node of nodes) {
      if (this._nodeList.has(node.id)) {
        /* tslint:disable-next-line no-console */
        console.error(`Node with id ${node.id} already exists`);
      }

      // Клонируем ноду чтобы не иметь связи с изночальным объектом
      this._nodeList.set(node.id, JSON.parse(JSON.stringify(node)));

      if (options.animate) {
        const nodeItem = this._nodeList.get(node.id);
        nodeItem.toX = nodeItem.x;
        nodeItem.toY = nodeItem.y;

        if (prevNodeList && prevNodeList.has(node.id)) {
          const prev = prevNodeList.get(node.id);

          nodeItem.fromX = prev.x;
          nodeItem.fromY = prev.y;
          nodeItem.x = prev.x;
          nodeItem.y = prev.y;
        } else {
          if (this._graph._center && node.id === this._graph._center.id) {
            nodeItem.fromX = this._graph._center.x;
            nodeItem.fromY = this._graph._center.y;
            nodeItem.x = this._graph._center.x;
            nodeItem.y = this._graph._center.y;
          } else {
            nodeItem.fromX = getRandomFromRange(-this._graph._container.clientWidth, this._graph._container.clientWidth);
            nodeItem.fromY = getRandomFromRange(-this._graph._container.clientHeight, this._graph._container.clientHeight);
            nodeItem.x = getRandomFromRange(-this._graph._container.clientWidth, this._graph._container.clientWidth);
            nodeItem.y = getRandomFromRange(-this._graph._container.clientHeight, this._graph._container.clientHeight);
          }
        }
      }
    }
  }

  public setSilent(silent: boolean): void {
    this._silent = silent;
  }

  public draw(): void {
    this._disposeInternal();
    if (this._graph._labelsLayer) {
      this._graph._labelsLayer.clear();
    }
    const nodesLength = this._nodeList.size;

    const translateArray = new Float32Array(nodesLength * 3);
    const colors = new Float32Array(nodesLength * 3);
    const sizes = new Float32Array(nodesLength);
    const images = new Float32Array(nodesLength);
    const showDot = new Float32Array(nodesLength);
    const pickingColors = new Float32Array(nodesLength * 3);

    let i3 = 0;
    let i = 0;

    for (const node of this._nodeList.values()) {
      translateArray[ i3 + 0 ] = node.x;
      translateArray[ i3 + 1 ] = node.y;
      translateArray[ i3 + 2 ] = 0;

      if (this._color) {
        this._color.setHex(node.color);

        colors[ i3 + 0 ] = this._color.r;
        colors[ i3 + 1 ] = this._color.g;
        colors[ i3 + 2 ] = this._color.b;
      }

      sizes[i] = node.size;

      if (node.img) {
        const imageIndex = this._imageCanvas.loadImage(node.img);
        node._imageIndex = imageIndex;
        images[i] = imageIndex;
      } else {
        images[i] = -1;
      }

      node.__positionIndex = i;

      if (node.showDot) {
        showDot[i] = 1.0;
      } else {
        showDot[i] = 0.0;
      }

      if (this._graph._labelsLayer && node.label) {
        node.__labelIndex = this._graph._labelsLayer.addLabel(
          node.label,
          node.x,
          node.y,
          node.size
        );
      }

      if (this._color) {
        this._color.setHex(i + 1);

        pickingColors[ i3 + 0 ] = this._color.r;
        pickingColors[ i3 + 1 ] = this._color.g;
        pickingColors[ i3 + 2 ] = this._color.b;
      }

      this._colorToNodeID[i + 1] = node.id;

      i++;
      i3 += 3;
    }

    const boundingBox = new Box3();
    boundingBox.setFromArray(translateArray);
    boundingBox.getSize(this._size);

    this._nodesBufferGeometry = new BufferGeometry();
    this._nodesInstancedGeometry = new InstancedBufferGeometry();
    this._nodesInstancedGeometry.index = this._nodesBufferGeometry.index;
    this._nodesInstancedGeometry.attributes = this._nodesBufferGeometry.attributes;

    this._nodesInstancedGeometry.setAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3));

    this._nodeTranslateAttribute = new InstancedBufferAttribute(translateArray, 3);
    this._nodeTranslateAttribute.setUsage(DynamicDrawUsage);
    this._nodeColorAttribute = new InstancedBufferAttribute(colors, 3);
    this._nodeColorAttribute.setUsage(DynamicDrawUsage);

    this._nodesInstancedGeometry.setAttribute('translation', this._nodeTranslateAttribute);
    this._nodesInstancedGeometry.setAttribute('color', this._nodeColorAttribute);
    this._nodesInstancedGeometry.setAttribute('size', new InstancedBufferAttribute(sizes, 1));
    this._nodesInstancedGeometry.setAttribute('image', new InstancedBufferAttribute(images, 1));
    this._nodesInstancedGeometry.setAttribute('showDot', new InstancedBufferAttribute(showDot, 1));

    this._nodesMaterial = new RawShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader,
      transparent: false,
      uniforms: {
        nodeScalingFactor: {
          value: this._graph.nodeScalingFactor
        },
        scale: {
          value: this._graph._controls ? this._graph._controls.scale : 1.0
        },
        spriteDim: {
          value: new Vector2(this._imageCanvas.textureWidth, this._imageCanvas.textureHeight)
        },
        textureDim: {
          value: new Vector2(this._imageCanvas.canvasWidth, this._imageCanvas.canvasHeight)
        },
        textureMap: {
          value: this._imageCanvas.textureMap
        }
      },
      vertexColors: true,
      vertexShader,
    });

    this._nodeMesh = new Points(this._nodesInstancedGeometry, this._nodesMaterial);
    this._nodeMesh.frustumCulled = false;
    this._nodeMesh.renderOrder = 10;
    this._graph._scene.add(this._nodeMesh);

    this._nodesPickingMaterial = new RawShaderMaterial({
      fragmentShader: pickingFragmentShader,
      uniforms: {
        nodeScalingFactor: {
          value: this._graph.nodeScalingFactor
        },
        scale: {
          value: this._graph._controls ? this._graph._controls.scale : 1.0
        }
      },
      vertexShader: pickingVertexShader,
    });

    this._nodesPickingGeometry = this._nodeMesh.geometry.clone() as BufferGeometry;
    this._nodesPickingGeometry.setAttribute('color', new InstancedBufferAttribute(pickingColors, 3));
    this._nodesPickingsMesh = new Points(this._nodesPickingGeometry, this._nodesPickingMaterial);
    this._nodesPickingsMesh.frustumCulled = false;

    if (this._pickingNodesScene) {
      this._pickingNodesScene.add(this._nodesPickingsMesh);
      this._pickingNodesScene.updateMatrixWorld(true);
    }
  }

  public getSize(): Vector3 {
    return this._size;
  }

  public setActiveNodes(nodes: any): void {
    if (this._activeNodes.length && nodes[0].index === this._activeNodes[0].index) {
      this.clearActiveNodes();
      return;
    }
    this.clearActiveNodes();

    this._activeNodes = nodes;
    this._activeNodes.forEach((n) => n.__active = true);

    const activatingNodes = this._activeNodes.filter((n) => n.__hovered === undefined || n.__hovered === false);

    this.setNodesColor(activatingNodes, 0x4b7bec);
  }

  public clearActiveNodes(): void {
    this._activeNodes.forEach((n) => n.__active = false);

    const deactivatingNodes = this._activeNodes.filter((n) => n.__hovered === undefined || n.__hovered === false);

    this.setNodesColor(deactivatingNodes);

    this._activeNodes = [];
  }

  public setNodesColor(nodes: any[], newColor?: any): void {
    if (!nodes.length) {
      return;
    }

    const color = new Color();

    for (const node of nodes) {
      if (newColor) {
        color.setHex(newColor);
      } else {
        color.setHex(node.color);
      }

      this._nodeColorAttribute.setXYZ(node.__positionIndex, color.r, color.g, color.b);
    }

    this._nodeColorAttribute.needsUpdate = true;
  }

  public setNodePosition(nodes: any[], offset): void {
    if (this._nodesInstancedGeometry && this._nodesPickingGeometry) {
      for (const node of nodes) {
        if (this._nodesInstancedGeometry && this._nodesPickingGeometry) {
          node.x -= offset.x;
          node.y -= offset.y;

          this._nodesInstancedGeometry.attributes.translation.setXYZ(node.__positionIndex, node.x, node.y, 0);
          this._nodesPickingGeometry.attributes.translation.setXYZ(node.__positionIndex, node.x, node.y, 0);
        }
      }

      (this._nodesInstancedGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
    }
  }

  public testNode(position): any {
    if (this._pickingTexture) {
      this._graph._renderer.setRenderTarget(this._pickingTexture);
      this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
      this._graph._renderer.setRenderTarget(null);
      const pixelBuffer = new Uint8Array(4);
      this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
      /* tslint:disable-next-line */
      const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
      if (id) {
        const node = this._nodeList.get(this._colorToNodeID[id]);
        if (this.hoveredNode !== node) {
          // clear last nodes
          const unhoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
          this.setNodesColor(unhoveringNodes);
          this._hoveredNodes.forEach((n) => n.__hovered = false);

          this.hoveredNode = node;
          this._hoveredNodes = [node, ...this._graph.neighbourhoodNodes[node.id]];
          this._hoveredNodes.forEach((n) => n.__hovered = true);

          const hoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
          this.setNodesColor(hoveringNodes, 0x4b7bec);

          const coordinates = this._graph._translateCoordinates(this.hoveredNode.x, this.hoveredNode.y);
          this._graph.onEvent.emit('nodeHover', { node: this.hoveredNode, ...coordinates, scale: this._graph._controls.scale });
          this._graph._render();
        }

        return this.hoveredNode;
      } else {
        if (this.hoveredNode !== null) {
          const unhoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
          this.setNodesColor(unhoveringNodes);
          this._hoveredNodes.forEach((n) => n.__hovered = false);
          this._hoveredNodes = [];

          this._graph.onEvent.emit('nodeUnhover', { node: this.hoveredNode });
          this.hoveredNode = null;
          this._graph._render();
        }

        return undefined;
      }
    }

    return undefined;
  }

  public pickNode(position): any {
    if (this._pickingTexture && this._buffer.length) {
      const index = position.x + (this._pickingTexture.height - position.y) * this._pickingTexture.width;
      const pixel = this._buffer.slice(index * 4, index * 4 + 4);
      /* tslint:disable-next-line */
      const id = (pixel[0]<<16)|(pixel[1]<<8)|(pixel[2]);
      if (id) {
        return this._nodeList.get(this._colorToNodeID[id]);
      }
    }

    return null;
  }

  public recalculate(): void {
    const translateArray = new Float32Array(this._nodeList.size * 3);
    let i = 0;
    let i3 = 0;

    for (const node of this._nodeList.values()) {
      translateArray[ i3 + 0 ] = node.x;
      translateArray[ i3 + 1 ] = node.y;
      translateArray[ i3 + 2 ] = 0;

      node.__positionIndex = i;

      if (this._graph._labelsLayer && node.__labelIndex !== undefined) {
        this._graph._labelsLayer.setLabelPosition(node.__labelIndex, { x: node.x, y: node.y, z: 0}, false);
      }

      i++;
      i3 += 3;
    }

    if (this._nodesInstancedGeometry) {
      const newTranslation = new InstancedBufferAttribute(translateArray, 3);
      this._nodesInstancedGeometry.setAttribute('translation', newTranslation);
    }
  }

  public recalculatePicking(): void {
    const translateArray = new Float32Array(this._nodeList.size * 3);
    let i3 = 0;

    for (const node of this._nodeList.values()) {
      translateArray[ i3 + 0 ] = node.x;
      translateArray[ i3 + 1 ] = node.y;
      translateArray[ i3 + 2 ] = 0;

      i3 += 3;
    }

    if (this._nodesPickingGeometry) {
      const newTranslation = new InstancedBufferAttribute(translateArray, 3);
      this._nodesPickingGeometry.setAttribute('translation', newTranslation);
    }
  }

  public onScale(scale: number): void {
    if (this._nodesMaterial && this._nodesPickingMaterial) {
      this._nodesMaterial.uniforms.scale.value = scale;
      this._nodesMaterial.needsUpdate = true;
      this._nodesPickingMaterial.uniforms.scale.value = scale;
      this._nodesPickingMaterial.needsUpdate = true;
    }
  }

  public onResize(): void {
    if (this._pickingTexture) {
      this._pickingTexture.setSize(this._graph._container.clientWidth, this._graph._container.clientHeight);
    }
  }

  public dispose(): void {
    this._disposeInternal();

    if (this._imageCanvas) {
      this._imageCanvas.dispose();
    }

    if (this._pickingNodesScene) {
      (this._pickingNodesScene as any).dispose();
      this._pickingNodesScene = null;
    }

    this._imageCanvas.removeEventListener('imageLoaded', this._imageLoaded);

    if (this._pickingTexture) {
      this._pickingTexture.dispose();
      this._pickingTexture = null;
    }

    this.hoveredNode = null;
    this._color = null;
    this._colorToNodeID = {};
  }

  public refreshBuffer(): void {
    if (this._pickingTexture) {
      this._graph._renderer.setRenderTarget(this._pickingTexture);
      this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
      this._graph._renderer.setRenderTarget(null);
      this._buffer = new Uint8Array(4 * this._pickingTexture.width * this._pickingTexture.height);
      this._graph._renderer.readRenderTargetPixels(this._pickingTexture, 0, 0, this._pickingTexture.width, this._pickingTexture.height, this._buffer);
    }
  }

  public nodesAnimationStep(p): void {
    for (const value of this._nodeList.values()) {
      if (p >= 1) {
        value.x = value.toX;
        value.y = value.toY;
      } else {
        value.x = value.toX * p + value.fromX * (1 - p);
        value.y = value.toY * p + value.fromY * (1 - p);
      }
    }
  }

  public onBeforeAnimation(): void {
    this.setSilent(true);
  }

  public onAfterAnimation(): void {
    this.setSilent(false);
  }

  private _disposeInternal(): void {
    if (this._nodesBufferGeometry) {
      this._nodesBufferGeometry.dispose();
      this._nodesBufferGeometry = null;
    }

    if (this._nodesInstancedGeometry) {
      this._nodesInstancedGeometry.dispose();
      this._nodesInstancedGeometry = null;
    }

    if (this._nodesMaterial) {
      this._nodesMaterial.dispose();
      this._nodesMaterial = null;
    }

    if (this._nodeMesh) {
      this._graph._scene.remove(this._nodeMesh);
      this._nodeMesh = null;
    }

    if (this._nodesPickingGeometry) {
      this._nodesPickingGeometry.dispose();
      this._nodesPickingGeometry = null;
    }

    if (this._nodesPickingMaterial) {
      this._nodesPickingMaterial.dispose();
      this._nodesPickingMaterial = null;
    }

    if (this._nodesPickingsMesh && this._pickingNodesScene) {
      this._pickingNodesScene.remove(this._nodesPickingsMesh);
      this._nodesPickingsMesh = null;
    }

    this._buffer = new Uint8Array();
    this._hoveredNodes = [];
    this.hoveredNode = null;
    this._activeNodes = [];
  }

}
