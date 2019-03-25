import { CanvasTexture, EventDispatcher } from 'three';

export class TextCanvas extends EventDispatcher {

  public canvas: HTMLCanvasElement | null;

  public textureMap: CanvasTexture;

  public textureWidth: number = 0;

  public textureHeight: number = 0;

  public canvasHeight: number = 4096;

  public canvasWidth: number = 4096;

  private _ctx: CanvasRenderingContext2D | null;

  private _textOptionsToIndex: { [id: string]: number; } = {};

  private _textureIndex: number = 0;

  constructor() {
    super();

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.textureWidth = this.canvasWidth / 8;
    this.textureHeight = 30;

    this._ctx = this.canvas.getContext('2d');
    if (this._ctx) {
      this._ctx.fillStyle = 'white';
      this._ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    this.textureMap = new CanvasTexture(this.canvas);
    this.textureMap.flipY = false;
  }

  public dispose(): void {
    this._textOptionsToIndex = {};
    this.textureMap.dispose();
    if (this._ctx) {
      this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    this.canvas = null;
  }

  public drawText(text: string, options: any): number {
    const uid = text;

    if (this._textOptionsToIndex[uid] !== undefined) {
      return this._textOptionsToIndex[uid];
    }

    if (this._ctx) {
      const index = this._textureIndex;
      this._textureIndex += 1;
      this._textOptionsToIndex[uid] = index;

      const ratio = 18 / this.textureWidth;
      const fontSize = Math.round(ratio * this.textureWidth);

      const x = (index * this.textureWidth) % this.canvasWidth;
      const y = Math.floor((index * this.textureWidth) / this.canvasWidth) * this.textureHeight;

      this._ctx.beginPath();
      this._ctx.fillStyle = 'white';
      this._ctx.clearRect(x, y, this.textureWidth, this.textureHeight);

      this._ctx.beginPath();
      this._ctx.fillStyle = options.color;
      this._ctx.font = '' + (fontSize) + 'px ' + options.font;
      this._ctx.textAlign = 'start';
      this._ctx.textBaseline = 'middle';
      this._ctx.fillText(text, x + 5, y + 0.5 * this.textureHeight);

      this.textureMap.needsUpdate = true;
      return index;
    }

    return -1;
  }
}
