import { PerspectiveCamera } from 'three';
import { EventEmitter } from './emitter';
export declare class PrettyGraphControls {
    enabled: boolean;
    scale: number;
    onChange: EventEmitter;
    private _camera;
    private _zoom;
    private _selection;
    constructor(camera: PerspectiveCamera, container: HTMLElement);
    init(): void;
    private _onContextMenu;
    private _onMouseMove;
    private _onMouseDown;
    private _onMouseUp;
    private _zoomHandler;
    private _getScaleFromZ;
    private _getZFromScale;
    private _toRadians;
}
