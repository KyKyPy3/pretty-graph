import { CanvasTexture, EventDispatcher } from 'three';

export class ImageCanvas extends EventDispatcher {

  public canvas: HTMLCanvasElement;

  public textureMap: CanvasTexture;

  public textureWidth: number = 0;

  public textureHeight: number = 0;

  public canvasHeight: number = 4096;

  public canvasWidth: number = 4096;

  private _ctx: CanvasRenderingContext2D | null;

  private _nodeImageToIndex: { [id: string]: number; } = {};

  private _textureIndex: number = 0;

  constructor() {
    super();

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.textureWidth = this.canvasWidth / 32;
    this.textureHeight = this.canvasHeight / 32;

    this._ctx = this.canvas.getContext('2d');
    if (this._ctx) {
      this._ctx.fillStyle = 'white';
      this._ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.textureMap = new CanvasTexture(this.canvas);
    this.textureMap.flipY = false;
  }

  public dispose(): void {
    this.textureMap.dispose();
  }

  public loadImage(imageUrl: string): number {
    if (this._nodeImageToIndex[imageUrl] !== undefined) {
      return this._nodeImageToIndex[imageUrl];
    }

    if (this._ctx) {
      const index = this._textureIndex;
      this._textureIndex += 1;
      this._nodeImageToIndex[imageUrl] = index;

      const img = new Image();
      img.onload = () => {
        const x = (index * this.textureWidth) % this.canvasWidth;
        const y = Math.floor((index * this.textureWidth) / this.canvasWidth) * this.textureHeight;

        if (this._ctx) {
          this._ctx.drawImage(
            img,
            0, 0,
            img.width, img.height,
            x + 10, y + 10,
            this.textureWidth - 20, this.textureHeight - 20
          );
        }

        this.textureMap.needsUpdate = true;
        this.dispatchEvent({
          index,
          type: 'imageLoaded'
        });
      };

      img.src = imageUrl;

      return index;
    }

    return -1;
  }
}
