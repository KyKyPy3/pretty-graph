import { EventDispatcher } from 'three';
export declare class ArrowsLayer extends EventDispatcher {
    private _arrowGeometry;
    private _arrowMesh;
    private _arrowMaterial;
    private _activeEdges;
    private _graph;
    constructor(graph: any);
    hide(): void;
    show(): void;
    recalculate(): void;
    draw(): void;
    dispose(): void;
    clearActiveArrowOfEdges(): void;
    setActiveArrowByEdges(edges: any[]): void;
    setDeactivatedArrowByEdges(edges: any[]): void;
    setArrowsColor(edges: any[], newColor?: string): void;
    private _clearInternalState;
    private _calculateArrowData;
    private _calculateArrowVertices;
    private _computeBoundingSphere;
}
