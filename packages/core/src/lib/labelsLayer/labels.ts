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

    this._textContext = this._textCanvas.getContext("2d");
    this._graph._container.appendChild(this._textCanvas);

    this._textContext.font = "12px Roboto";
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

  public hide(): void {
    this._clearTextLayer();
    this._isHidden = true;
  }

  public setLabelPosition(index: number, position: { x: number, y: number, z: number }): void {
    this._labels[index].x = position.x;
    this._labels[index].y = position.y;
  }

  public draw(): void {
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

  private _drawText(text: string, coords: { x: number, y: number}, nodeSize: number): void {
    // Get text height = font size * 1.286
    const textHeight = 12 * 1.286;

    // Calculate text width
    this._textContext.font = "12px Roboto";
    const textWidth = this._textContext.measureText(text).width;

    const textOffset = (nodeSize / 2) * this._graph.nodeScalingFactor * this._graph._controls.scale;

    this._textContext.fillStyle = "white";
    this._textContext.fillRect(textOffset + coords.x, coords.y - textHeight / 2 + 1, textWidth + 4, textHeight);

    this._textContext.fillStyle = "black";
    this._textContext.fillText(text, textOffset + 2 + coords.x, coords.y + 5);
  }

}
