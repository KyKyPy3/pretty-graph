export declare class LabelsLayer {
    private _graph;
    private _labels;
    private _isHidden;
    private _textCanvas;
    private _textContext;
    constructor(graph: any);
    onResize(): void;
    clear(): void;
    addLabel(text: string, x: number, y: number, nodeSize: number): number;
    show(): void;
    hide(): void;
    setLabelPosition(index: number, position: {
        x: number;
        y: number;
        z: number;
    }): void;
    draw(canvasCtx?: CanvasRenderingContext2D): void;
    recalculate(): void;
    dispose(): void;
    private _clearTextLayer;
    private _drawText;
}
