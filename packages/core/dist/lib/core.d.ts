import { EventEmitter } from './emitter';
import { GraphOptions } from './options';
export declare class PretyGraph {
    onEvent: EventEmitter;
    nodeScalingFactor: number;
    private _camera;
    private _scene;
    private _options;
    private _renderer;
    private _container;
    private _fov;
    private _far;
    private _nodes;
    private _edges;
    private _nodesMaterial;
    private _nodesGeometry;
    private _animationFrameRequestId;
    private _nodeTranslateAttribute;
    private _nodeColorAttribute;
    private _center;
    private _controls;
    private _pickingNodesScene;
    private _pickingTexture;
    private _nodesPickingMaterial;
    private _nodesPickingGeometry;
    private _nodeMesh;
    private _nodesPickingsMesh;
    private _hoveredNode;
    private _hoveredEdge;
    private _hoveredEdgeID;
    private _dragInProgress;
    private _dragging;
    private _plane;
    private _raycaster;
    private _intersection;
    private _offset;
    private _lineGeometry;
    private _lineMaterial;
    private _pickingLineScene;
    private _linesPickingGeometry;
    private _lineMesh;
    private _linePickingMesh;
    private _imageCanvas;
    private _imageLoaded;
    private _textCanvas;
    private _labelsGeometry;
    private _labelsTranslateAttribute;
    private _labelsMesh;
    private _labelsMaterial;
    private _arrowGeometry;
    private _arrowMesh;
    private _arrowMaterial;
    private _indexedNodes;
    private _colorToNodeID;
    constructor(options: GraphOptions);
    options: GraphOptions;
    setData(data: any, options?: {
        animate: boolean;
    }): void;
    stopRenderLoop(): void;
    resumeRenderLoop(): void;
    getNodeByID(nodeID: string): any;
    destroy(): void;
    private _onMouseMove;
    private _onMouseUp;
    private _onMouseDown;
    private _onClick;
    private _onDblClick;
    private _onContextMenu;
    private _onScale;
    private _disposeMesh;
    private _disposeGeometries;
    private _disposeRenderer;
    private _disposeMaterials;
    private _disposeTextures;
    private _testNode;
    private _testEdge;
    private _setEdgeSize;
    private _setEdgeColor;
    private _setNodeColor;
    private _translateCoordinates;
    private _drawNodes;
    private _drawEdges;
    private _drawArrows;
    private _drawLabels;
    private _setupScene;
    private _setupPickingScene;
    private _setupCamera;
    private _setupRenderer;
    private _render;
    private _constructLines;
    private _calculateArrowVertices;
    private _calculateNormals;
    private _calculateArrowData;
    private _indexingNodes;
    private _moveNodes;
    private _getRandomFromRange;
    private _animate;
}
