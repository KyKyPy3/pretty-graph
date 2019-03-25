import { EventDispatcher } from 'three';
export declare class ArrowsLayer extends EventDispatcher {
    private _arrowGeometry;
    private _arrowMesh;
    private _arrowMaterial;
    private _graph;
    constructor(graph: any);
    hide(): void;
    show(): void;
    recalculate(): void;
    draw(): void;
    dispose(): void;
    private _clearInternalState;
    private _calculateArrowData;
    private _calculateArrowVertices;
    private _computeBoundingSphere;
}
