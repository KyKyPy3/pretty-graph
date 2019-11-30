import {
  BufferGeometry,
  EventDispatcher,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Scene,
  Vector2,
} from 'three';

import { fragmentShader, vertexShader } from './shaders';
import { TextCanvas } from './textCanvas';

export class LabelsLayer extends EventDispatcher {

  private _textCanvas: TextCanvas;

  private _labelsBufferGeometry!: BufferGeometry;

  private _labelsInstancedGeometry!: InstancedBufferGeometry;

  private _labelsTranslateAttribute!: InstancedBufferAttribute;

  private _labelsMesh!: Mesh;

  private _labelsMaterial!: RawShaderMaterial;

  private _scene: Scene;

  private _labels: any[] = [];

  private _nodeScalingFactor: number = 1.0;

  constructor(scene: Scene, nodeScalingFactor: number) {
    super();

    this._scene = scene;
    this._nodeScalingFactor = nodeScalingFactor;
    this._textCanvas = new TextCanvas();
  }

  public addLabel(text: string, x: number, y: number, nodeSize: number): number {
    const index = this._labels.length;

    this._labels.push({
      nodeSize,
      text,
      x,
      y
    });

    return index;
  }

  public show(): void {
    this._labelsMesh.visible = true;
  }

  public hide(): void {
    this._labelsMesh.visible = false;
  }

  public setLabelPosition(index: number, position: { x: number, y: number, z: number }, update: boolean = true): void {
    this._labels[index].x = position.x;
    this._labels[index].y = position.y;

    if (update) {
      this._labelsInstancedGeometry.attributes.translation.setXYZ(index, position.x + this._textCanvas.textureWidth / 2, position.y, 0);
      (this._labelsInstancedGeometry.attributes.translation as InstancedBufferAttribute).needsUpdate = true;
    }
  }

  public draw(): void {
    const translateArray = new Float32Array(this._labels.length * 3);
    const images = new Float32Array(this._labels.length);
    const sizes = new Float32Array(this._labels.length);

    for (let i = 0, i3 = 0, l = this._labels.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._labels[i].x + this._textCanvas.textureWidth / 2;
      translateArray[ i3 + 1 ] = this._labels[i].y;
      translateArray[ i3 + 2 ] = 0;

      sizes[i] = this._labels[i].nodeSize;

      const labelIndex = this._textCanvas.drawText(this._labels[i].text, {
        color: 'black',
        font: 'Arial'
      });
      this._labels[i]._labelIndex = labelIndex;
      images[i] = labelIndex;
    }

    this._labelsBufferGeometry = new PlaneBufferGeometry(this._textCanvas.textureWidth, this._textCanvas.textureHeight);
    this._labelsInstancedGeometry = new InstancedBufferGeometry();
    this._labelsInstancedGeometry.index = this._labelsBufferGeometry.index;
    this._labelsInstancedGeometry.attributes = this._labelsBufferGeometry.attributes;

    this._labelsTranslateAttribute = new InstancedBufferAttribute(translateArray, 3);

    this._labelsInstancedGeometry.setAttribute('translation', this._labelsTranslateAttribute);
    this._labelsInstancedGeometry.setAttribute('size', new InstancedBufferAttribute(sizes, 1));
    this._labelsInstancedGeometry.setAttribute('image', new InstancedBufferAttribute(images, 1));

    this._labelsMaterial = new RawShaderMaterial({
      depthTest: false,
      depthWrite: false,
      fog: false,
      fragmentShader,
      transparent: true,
      uniforms: {
        nodeScalingFactor: {
          type: 'f',
          value: this._nodeScalingFactor
        },
        spriteDim: {
          value: new Vector2(this._textCanvas.textureWidth, this._textCanvas.textureHeight)
        },
        textureDim: {
          value: new Vector2(this._textCanvas.canvasWidth, this._textCanvas.canvasHeight)
        },
        textureMap: {
          type: 't',
          value: this._textCanvas.textureMap
        }
      },
      vertexShader
    });

    this._labelsMesh = new Mesh(this._labelsInstancedGeometry, this._labelsMaterial);
    this._labelsMesh.frustumCulled = false;
    this._labelsMesh.name = 'Labels';
    this._scene.add(this._labelsMesh);
  }

  public recalculate(): void {
    const translateArray = new Float32Array(this._labels.length * 3);

    for (let i = 0, i3 = 0, l = this._labels.length; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = this._labels[i].x + this._textCanvas.textureWidth / 2;
      translateArray[ i3 + 1 ] = this._labels[i].y;
      translateArray[ i3 + 2 ] = 0;
    }

    const newTranslation = new InstancedBufferAttribute(translateArray, 3);
    this._labelsInstancedGeometry.setAttribute('translation', newTranslation);
  }

  public dispose(): void {
    if (this._labelsMesh) {
      this._scene.remove(this._labelsMesh);
    }

    if (this._labelsMaterial) {
      this._labelsMaterial.dispose();
    }

    if (this._labelsInstancedGeometry) {
      this._labelsInstancedGeometry.dispose();
    }

    if (this._labelsBufferGeometry) {
      this._labelsBufferGeometry.dispose();
    }

    if (this._textCanvas) {
      this._textCanvas.dispose();
    }
  }

}
