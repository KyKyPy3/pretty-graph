import { EventDispatcher } from 'three';
export declare class EdgesLayer extends EventDispatcher {
    private _lineMaterial;
    private _linePickingMaterial;
    private _lineGeometry;
    private _linesPickingGeometry;
    private _graph;
    private _lineMesh;
    private _linePickingMesh;
    private _pickingLineScene;
    private _pickingTexture;
    private _hoveredEdge;
    private _hoveredEdgeID;
    constructor(graph: any);
    readonly hoveredEdge: any;
    onResize(): void;
    onScale(scale: number): void;
    draw(): void;
    _setEdgeColor(edgeColor: any): void;
    dispose(): void;
    _setEdgeSize(size: number): void;
    testEdge(position: any): void;
    recalculate(): void;
    recalculatePicking(): void;
    private _constructMesh;
    private _constructPickingMesh;
    private _constructLines;
}
