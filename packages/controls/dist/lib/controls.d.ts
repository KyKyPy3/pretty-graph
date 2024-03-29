import { EventDispatcher, PerspectiveCamera, WebGLRenderer } from 'three';
export declare class PrettyGraphControls extends EventDispatcher {
    enabled: boolean;
    scale: number;
    private _camera;
    private _cameraMoved;
    private _zoom;
    private _selection;
    private _renderer;
    private _startPosition;
    private _moved;
    private _wait;
    private _onResize;
    constructor(camera: PerspectiveCamera, container: Element, renderer: WebGLRenderer);
    init(): void;
    zoomIn(): boolean;
    zoomOut(): boolean;
    setZoomExtent(): void;
    setCameraPosition(z: number): void;
    setTransform(position: {
        x: number;
        y: number;
    }): void;
    dispose(): void;
    private _onZoomEnd;
    private _onBlur;
    private _onRotate;
    private _onContextMenu;
    private _dist;
    private _onMouseMove;
    private _onMouseDown;
    private _onMouseUp;
    private _zoomHandler;
    private _getScaleFromZ;
    private _getZFromScale;
    private _toRadians;
}
