export class LabelsLayer {

  private _graph: any;

  private _labels: any[] = [];

  private _isHidden: boolean = false;

  private _textCanvas: any;

  private _textContext: any;

  constructor(graph) {
    this._graph = graph;

    this._textCanvas = document.createElement("canvas");
    this._textCanvas.setAttribute("style", "position: absolute;left: 0px;top: 0px;z-index:10;");
    this._textCanvas.width = this._graph._renderer.domElement.width;
    this._textCanvas.height = this._graph._renderer.domElement.height;
    this._textCanvas.style.userSelect = 'none';

    this._textContext = this._textCanvas.getContext("2d");
    this._graph._container.appendChild(this._textCanvas);

    this._textContext.font = "12px Roboto";

    (CanvasRenderingContext2D.prototype as any).roundRect = function (x, y, w, h, r) {
      if (w < 2 * r) r = w / 2;
      if (h < 2 * r) r = h / 2;
      this.beginPath();
      this.moveTo(x+r, y);
      this.arcTo(x+w, y,   x+w, y+h, r);
      this.arcTo(x+w, y+h, x,   y+h, r);
      this.arcTo(x,   y+h, x,   y,   r);
      this.arcTo(x,   y,   x+w, y,   r);
      this.closePath();
      return this;
    }
  }

  public onResize(): void {
    this._clearTextLayer();

    if (this._graph._renderer) {
      this._textCanvas.width = this._graph._renderer.domElement.width;
      this._textCanvas.height = this._graph._renderer.domElement.height;
    }

    this.recalculate();
  }

  public clear(): void {
    this._labels = [];
    this._clearTextLayer();
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
    this._isHidden = false;
    this.recalculate();
  }

  public isHidden(): boolean {
    return this._isHidden;
  }

  public hide(): void {
    this._clearTextLayer();
    this._isHidden = true;
  }

  public toggleLabels(): void {
    if (this._isHidden) {
      this.show()
    } else {
      this.hide();
    }
  }

  public setLabelPosition(index: number, position: { x: number, y: number, z: number }): void {
    this._labels[index].x = position.x;
    this._labels[index].y = position.y;
  }

  public draw(canvasCtx?: CanvasRenderingContext2D): void {
    if (this._isHidden) {
      return;
    }

    if (!canvasCtx) {
      this._clearTextLayer();
    }
    const bounds = this._graph._container.getBoundingClientRect();

    for (let i = 0; i < this._labels.length; i++) {
      const coords = this._graph._translateCoordinates(this._labels[i].x, this._labels[i].y);
      if (coords.x > 0 && coords.x < bounds.width && coords.y > 0 && coords.y < bounds.height && this._labels[i].nodeSize * 7 * this._graph._controls.scale > 45) {
        this._drawText(this._labels[i].text, coords, this._labels[i].nodeSize, canvasCtx);
      }
    }
  }

  public recalculate(): void {
    if (this._isHidden) {
      return;
    }

    this._clearTextLayer();
    const bounds = this._graph._container.getBoundingClientRect();

    for (let i = 0; i < this._labels.length; i++) {
      const coords = this._graph._translateCoordinates(this._labels[i].x, this._labels[i].y);
      if (coords.x > 0 && coords.x < bounds.width && coords.y > 0 && coords.y < bounds.height && this._labels[i].nodeSize * 7 * this._graph._controls.scale > 45) {
        this._drawText(this._labels[i].text, coords, this._labels[i].nodeSize);
      }
    }
  }

  public dispose(): void {
    this._graph._container.removeChild(this._textCanvas);
    this._labels = [];
  }

  private _clearTextLayer(): void {
    this._textContext.clearRect(0, 0, this._textContext.canvas.width, this._textContext.canvas.height);
  }

  private _drawText(text: string, coords: { x: number, y: number}, nodeSize: number, canvasCtx?: CanvasRenderingContext2D): void {
    let ctx: CanvasRenderingContext2D;

    if (canvasCtx) {
      ctx = canvasCtx;
    } else {
      ctx = this._textContext;
    }

    // Get text height = font size * 1.286
    const textHeight = 12 * 1.286;

    // Calculate text width
    ctx.font = "12px Roboto";
    const textWidth = ctx.measureText(text).width;

    const textOffset = (nodeSize / 2) * this._graph.nodeScalingFactor * this._graph._controls.scale;

    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 3;
    // ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    (ctx as any).roundRect(textOffset + coords.x + 1, coords.y - textHeight / 2 - 2, textWidth + 10, textHeight + 6, 2);

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.stroke();
    ctx.fillStyle = "white";
    ctx.fill();

    ctx.shadowColor = '';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = "black";
    ctx.fillText(text, textOffset + 6 + coords.x, coords.y + 5);
  }

}
