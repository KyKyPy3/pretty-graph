import { EventDispatcher, Scene } from 'three';
export declare class LabelsLayer extends EventDispatcher {
    private _textCanvas;
    private _labelsBufferGeometry;
    private _labelsInstancedGeometry;
    private _labelsTranslateAttribute;
    private _labelsMesh;
    private _labelsMaterial;
    private _scene;
    private _labels;
    private _nodeScalingFactor;
    constructor(scene: Scene, nodeScalingFactor: number);
    addLabel(text: string, x: number, y: number, nodeSize: number): number;
    show(): void;
    hide(): void;
    setLabelPosition(index: number, position: {
        x: number;
        y: number;
        z: number;
    }, update?: boolean): void;
    draw(): void;
    recalculate(): void;
    dispose(): void;
}
