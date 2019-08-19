import { EventEmitter } from './emitter';
import { GraphOptions } from './options';
export declare class PretyGraph {
    onEvent: EventEmitter;
    nodeScalingFactor: number;
    animationTime: number;
    neighbourhoodNodes: {
        [id: string]: any;
    };
    neighbourhoodEdges: {
        [id: string]: any;
    };
    private _camera;
    private _scene;
    private _options;
    private _renderer;
    private _container;
    private _fov;
    private _far;
    private _nodes;
    private _edges;
    private _center;
    private _controls;
    private _dragInProgress;
    private _dragging;
    private _plane;
    private _raycaster;
    private _intersection;
    private _offset;
    private _indexedNodes;
    private _labelsLayer;
    private _arrowsLayer;
    private _edgesLayer;
    private _nodesLayer;
    private _resizeHandler;
    private _onScaleListener;
    private _onPanListener;
    private _onMouseMoveListener;
    private _onContextMenuListener;
    private _onDblClickListener;
    private _onClickListener;
    private _onMouseDownListener;
    private _onMouseUpListener;
    private _onRotateListener;
    private _activeNodes;
    private _hoveredNodes;
    private _activeNodesIds;
    private _activeEdges;
    private _hoveredEdges;
    private _activeEdgesIds;
    constructor(options: GraphOptions);
    options: GraphOptions;
    setData(data: any, options?: any): void;
    getNodeByID(nodeID: string): any;
    getScreenshot(): string;
    destroy(): void;
    private _addControlsListeners;
    private _removeControlsListeners;
    private _onNodeClick;
    private _onWorkspaceClick;
    private _onNodeHover;
    private _onNodeUnhover;
    private _onRotate;
    private _onMouseMove;
    private _onMouseUp;
    private _onMouseDown;
    private _onClick;
    private _onDblClick;
    private _onContextMenu;
    private _onPan;
    private _onScale;
    private _disposeRenderer;
    private _translateCoordinates;
    private _setupScene;
    private _setupCamera;
    private _setupRenderer;
    private _render;
    private _collectNeighbourhoods;
    private _indexingNodes;
    private _moveNodes;
    private _getRandomFromRange;
    private _interpolate;
    private _animate;
}
