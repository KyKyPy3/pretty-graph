import { EventDispatcher, Scene } from 'three';
export declare class ArrowsLayer extends EventDispatcher {
    private _scene;
    private _arrowGeometry;
    private _arrowMesh;
    private _arrowMaterial;
    private _nodeScalingFactor;
    private _arrows;
    constructor(scene: Scene, nodeScalingFactor: number);
    addArrow(source: any, target: any, size: number, color: any): void;
    hide(): void;
    show(): void;
    reset(): void;
    recalculate(): void;
    draw(): void;
    dispose(): void;
    private _calculateArrowData;
    private _calculateArrowVertices;
    private _calculateNormals;
}
