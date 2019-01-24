export declare class NodesLayer {
    hoveredNode: any;
    private _color;
    private _colorToNodeID;
    private _graph;
    private _nodesGeometry;
    private _nodesMaterial;
    private _pickingNodesScene;
    private _nodeMesh;
    private _nodesPickingMaterial;
    private _nodesPickingGeometry;
    private _nodesPickingsMesh;
    private _imageCanvas;
    private _nodeTranslateAttribute;
    private _nodeColorAttribute;
    private _pickingTexture;
    private _imageLoaded;
    constructor(graph: any);
    draw(): void;
    setNodeColor(nodeColor: any): void;
    setNodePosition(newPos: any): void;
    testNode(position: any): boolean;
    recalculate(): void;
    recalculatePicking(): void;
    onScale(scale: number): void;
    onResize(): void;
    dispose(): void;
}