import {
  Box3,
  BufferAttribute,
  BufferGeometry,
  Color,
  Event as ThreeEvent,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  LinearFilter,
  Points,
  RawShaderMaterial,
  Scene,
  Vector2,
  Vector3,
  VertexColors,
  WebGLRenderTarget
} from "three";

import {
  fragmentShader,
  pickingFragmentShader,
  pickingVertexShader,
  vertexShader,
} from './shaders';

import { ImageCanvas } from './imageCanvas';

function throttle(callback, limit): () => void {
  let wait = false;
  return () => {
    if (!wait) {
      callback.call();
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  }
}

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

  constructor(graph: any) {
    this._graph = graph;

    this._imageLoaded = throttle(() => {
      if (!this._silent) {
        this._graph._render();
      }
    }, 800);

    this._imageCanvas = new ImageCanvas();
    this._imageCanvas.addEventListener('imageLoaded', this._imageLoaded);

    this._pickingTexture = new WebGLRenderTarget(this._graph._container.clientWidth, this._graph._container.clientHeight);
    this._pickingTexture.texture.minFilter = LinearFilter;

    this._pickingNodesScene = new Scene();
    this._pickingNodesScene.background = new Color(0x000000);

    this._color = new Color();
  }

  public setSilent(silent: boolean): void {
    this._silent = silent;
  }

  public draw(): void {
    this._disposeInternal();
    if (this._graph._labelsLayer) {
      this._graph._labelsLayer.clear();
    }

    const translateArray = new Float32Array(this._graph._nodes.length * 3);
    const colors = new Float32Array(this._graph._nodes.length * 3);
    const sizes = new Float32Array(this._graph._nodes.length);
    const images = new Float32Array(this._graph._nodes.length);
    const showDot = new Float32Array(this._graph._nodes.length);

    for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._graph._nodes[i].x;
      translateArray[ i3 + 1 ] = this._graph._nodes[i].y;
      translateArray[ i3 + 2 ] = 0;

      if (this._color) {
        this._color.setHex(this._graph._nodes[i].color);

        colors[ i3 + 0 ] = this._color.r;
        colors[ i3 + 1 ] = this._color.g;
        colors[ i3 + 2 ] = this._color.b;
      }

      sizes[i] = this._graph._nodes[i].size;

      if (this._graph._nodes[i].img) {
        const imageIndex = this._imageCanvas.loadImage(this._graph._nodes[i].img);
        this._graph._nodes[i]._imageIndex = imageIndex;
        images[i] = imageIndex;
      } else {
        images[i] = -1;
      }

      this._graph._nodes[i].__positionIndex = i;

      if (this._graph._nodes[i].showDot) {
        showDot[i] = 1.0;
      } else {
        showDot[i] = 0.0;
      }

      if (this._graph._labelsLayer && this._graph._nodes[i].label) {
        this._graph._nodes[i].__labelIndex = this._graph._labelsLayer.addLabel(
          this._graph._nodes[i].label,
          this._graph._nodes[i].x,
          this._graph._nodes[i].y,
          this._graph._nodes[i].size
        );
      }
    }

    const boundingBox = new Box3();
    boundingBox.setFromArray(translateArray);
    boundingBox.getSize(this._size);

    this._nodesBufferGeometry = new BufferGeometry();
    this._nodesInstancedGeometry = new InstancedBufferGeometry();
    this._nodesInstancedGeometry.index = this._nodesBufferGeometry.index;
    this._nodesInstancedGeometry.attributes = this._nodesBufferGeometry.attributes;

    this._nodesInstancedGeometry.addAttribute('position', new BufferAttribute(new Float32Array([0, 0, 0]), 3));

    this._nodeTranslateAttribute = new InstancedBufferAttribute(translateArray, 3);
    this._nodeTranslateAttribute.setDynamic(true);
    this._nodeColorAttribute = new InstancedBufferAttribute(colors, 3);
    this._nodeColorAttribute.setDynamic(true);

    this._nodesInstancedGeometry.addAttribute('translation', this._nodeTranslateAttribute);
    this._nodesInstancedGeometry.addAttribute('color', this._nodeColorAttribute);
    this._nodesInstancedGeometry.addAttribute('size', new InstancedBufferAttribute(sizes, 1));
    this._nodesInstancedGeometry.addAttribute('image', new InstancedBufferAttribute(images, 1));
    this._nodesInstancedGeometry.addAttribute('showDot', new InstancedBufferAttribute(showDot, 1));

    this._nodesMaterial = new RawShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fragmentShader,
      transparent: false,
      uniforms: {
        nodeScalingFactor: {
          type: 'f',
          value: this._graph.nodeScalingFactor
        },
        scale: {
          type: 'f',
          value: this._graph._controls ? this._graph._controls.scale : 1.0
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
      vertexColors: VertexColors,
      vertexShader,
    });

    this._nodeMesh = new Points(this._nodesInstancedGeometry, this._nodesMaterial);
    this._nodeMesh.frustumCulled = false;
    this._nodeMesh.renderOrder = 10;
    this._graph._scene.add(this._nodeMesh);

    // Add duplicates for GPU picking
    const pickingColors = new Float32Array(this._graph._nodes.length * 3);
    for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i ++, i3 += 3 ) {
      if (this._color) {
        this._color.setHex(i + 1);

        pickingColors[ i3 + 0 ] = this._color.r;
        pickingColors[ i3 + 1 ] = this._color.g;
        pickingColors[ i3 + 2 ] = this._color.b;
      }

      this._colorToNodeID[i + 1] = this._graph._nodes[i].id;
    }

    this._nodesPickingMaterial = new RawShaderMaterial({
      fragmentShader: pickingFragmentShader,
      uniforms: {
        nodeScalingFactor: {
          type: 'f',
          value: this._graph.nodeScalingFactor
        },
        scale: {
          type: 'f',
          value: this._graph._controls ? this._graph._controls.scale : 1.0
        }
      },
      vertexShader: pickingVertexShader,
    });

    this._nodesPickingGeometry = this._nodeMesh.geometry.clone() as BufferGeometry;
    this._nodesPickingGeometry.addAttribute('color', new InstancedBufferAttribute(pickingColors, 3));
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

  public setNodeColor(nodeColor: any): void {
    const color = new Color();
    color.setHex(nodeColor);

    if (this.hoveredNode !== null) {
      this._nodeColorAttribute.setXYZ(this.hoveredNode.__positionIndex, color.r, color.g, color.b);
      this._nodeColorAttribute.needsUpdate = true;
      this._graph._render();
    }
  }

  public setNodePosition(newPos): void {
    if (this._nodesInstancedGeometry && this._nodesPickingGeometry) {
      this._nodesInstancedGeometry.attributes.translation.setXYZ(this.hoveredNode.__positionIndex, newPos.x, newPos.y, 0);
      this._nodesPickingGeometry.attributes.translation.setXYZ(this.hoveredNode.__positionIndex, newPos.x, newPos.y, 0);

      (this._nodesInstancedGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
    }
  }

  public testNode(position): boolean {
    if (this._pickingTexture) {
      this._graph._renderer.setRenderTarget(this._pickingTexture);
      this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
      this._graph._renderer.setRenderTarget(null);
      const pixelBuffer = new Uint8Array(4);
      this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
      /* tslint:disable-next-line */
      const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
      if (id) {
        const node = this._graph._indexedNodes[this._colorToNodeID[id]];
        if (this.hoveredNode !== node) {
          if (this.hoveredNode !== null) {
            this.setNodeColor(this.hoveredNode.color);
          }

          this.hoveredNode = this._graph._indexedNodes[this._colorToNodeID[id]];
          this.setNodeColor(0xff0000);

          const coordinates = this._graph._translateCoordinates(this.hoveredNode.x, this.hoveredNode.y);
          this._graph.onEvent.emit('nodeHover', { node: this.hoveredNode, ...coordinates, scale: this._graph._controls.scale });
          this._graph._render();
        }

        return true;
      } else {
        if (this.hoveredNode !== null) {
          this.setNodeColor(this.hoveredNode.color);
          this._graph.onEvent.emit('nodeUnhover', { node: this.hoveredNode });
          this.hoveredNode = null;
          this._graph._render();
        }

        return false;
      }
    }

    return false;
  }

  public recalculate(): void {
    const translateArray = new Float32Array(this._graph._nodes.length * 3);
    for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._graph._nodes[i].x;
      translateArray[ i3 + 1 ] = this._graph._nodes[i].y;
      translateArray[ i3 + 2 ] = 0;

      this._graph._nodes[i].__positionIndex = i;

      if (this._graph._labelsLayer) {
        this._graph._labelsLayer.setLabelPosition(this._graph._nodes[i].__labelIndex, { x: this._graph._nodes[i].x, y: this._graph._nodes[i].y, z: 0}, false);
      }
    }

    if (this._nodesInstancedGeometry) {
      (this._nodesInstancedGeometry.attributes.translation as InstancedBufferAttribute).setArray(translateArray);
      (this._nodesInstancedGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
    }
  }

  public recalculatePicking(): void {
    const translateArray = new Float32Array(this._graph._nodes.length * 3);

    for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._graph._nodes[i].x;
      translateArray[ i3 + 1 ] = this._graph._nodes[i].y;
      translateArray[ i3 + 2 ] = 0;
    }

    if (this._nodesPickingGeometry) {
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).setArray(translateArray);
      (this._nodesPickingGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
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
  }

}
