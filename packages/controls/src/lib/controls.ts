import { event, mouse, select } from 'd3-selection';
import {
  zoom,
  ZoomBehavior,
  zoomIdentity
} from 'd3-zoom';
import { PerspectiveCamera } from 'three';

import { EventEmitter } from './emitter';

export class PrettyGraphControls {

  public enabled: boolean = true;

  public scale: number = 1.0;

  public onChange: EventEmitter = new EventEmitter();

  private _camera!: PerspectiveCamera;

  private _zoom!: ZoomBehavior<Element, {}>;

  private _selection!: any;

  constructor(camera: PerspectiveCamera, container: HTMLElement) {
    this._camera = camera;

    this._selection = select(container);
  }

  public init(): void {
    this._zoom = zoom()
      .scaleExtent([this._getScaleFromZ(this._camera.far), this._getScaleFromZ(10)])
      .filter(() => this.enabled)
      .on('zoom', () => this._zoomHandler(event.transform));

    this._selection
      .on('contextmenu', this._onContextMenu.bind(this))
      .on('mousedown', this._onMouseDown.bind(this))
      .on('mousemove', this._onMouseMove.bind(this))
      .on('mouseup', this._onMouseUp.bind(this))
      .on('dblclick', this._onDblClick.bind(this))
      .call(this._zoom)
      .on('dblclick.zoom', null);

    this.scale = this._getScaleFromZ(1000);
    const dimensions = this._selection.node().getBoundingClientRect();
    const initialTransform = zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);

    // Set camera position
    this._camera.position.set(0, 1, 1000);
    this._camera.lookAt(0, 0, 0);
  }

  public setTransform(position: any): void {
    const dimensions = this._selection.node().getBoundingClientRect();
    const x = dimensions.width / 2 - this.scale * position.x;
    const y = this.scale * position.y + dimensions.height / 2;

    const initialTransform = zoomIdentity.translate(x, y).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);
  }

  private _onContextMenu(): void {
    event.preventDefault();
    event.stopPropagation();

    const [mouseX, mouseY] = mouse(this._selection.node());

    this.onChange.emit('contextmenu', { x: mouseX, y: mouseY });
  }

  private _onMouseMove(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.onChange.emit('mousemove', { x: mouseX, y: mouseY });
  }

  private _onMouseDown(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.onChange.emit('mousedown', { x: mouseX, y: mouseY });
  }

  private _onDblClick(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.onChange.emit('dblclick', { x: mouseX, y: mouseY });
  }

  private _onMouseUp(): void {
    this.onChange.emit('mouseup');
  }

  private _zoomHandler(transform: any): void {
    if (!this.enabled) {
      return;
    }

    const scale = transform.k;
    this.scale = scale;
    const dimensions = this._selection.node().getBoundingClientRect();

    const x = -(transform.x - dimensions.width / 2) / scale;
    const y = (transform.y - dimensions.height / 2) / scale;
    const z = this._getZFromScale(scale);

    this._camera.position.set(x, y, z);

    this.onChange.emit('scale', scale);
  }

  private _getScaleFromZ (z: number): number {
    const halfFov = this._camera.fov / 2;
    const halfFovRadians = this._toRadians(halfFov);
    const halfFovHeight = Math.tan(halfFovRadians) * z;
    const fovHeight = halfFovHeight * 2;

    const dimensions = this._selection.node().getBoundingClientRect();

    return dimensions.height / fovHeight; // Divide visualization height by height derived from field of view;
  }

  private _getZFromScale(scale: number): number {
    const dimensions = this._selection.node().getBoundingClientRect();
    const halfFov = this._camera.fov / 2;
    const halfFovRadians = this._toRadians(halfFov);
    const scaleHeight = dimensions.height / scale;

    return scaleHeight / (2 * Math.tan(halfFovRadians));
  }

  private _toRadians(angle: number): number {
    return angle * (Math.PI / 180);
  }
}
