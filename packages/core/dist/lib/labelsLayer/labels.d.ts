export declare class LabelsLayer {
    private readonly _graph;
    private _labels;
    private _isHidden;
    private _textCanvas;
    private readonly _textContext;
    constructor(graph: any);
    onResize(): void;
    clear(): void;
    addLabel(text: string, x: number, y: number, nodeSize: number): number;
    show(): void;
    isHidden(): boolean;
    hide(): void;
    toggleLabels(): void;
    setLabelsPositionForNodes(nodes: any[], offset: {
        x: number;
        y: number;
    }): void;
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
