import { event, mouse, select } from 'd3-selection';
import {
  zoom,
  ZoomBehavior,
  zoomIdentity,
  zoomTransform
} from 'd3-zoom';
import { Event as ThreeEvent, EventDispatcher, PerspectiveCamera } from 'three';

export class PrettyGraphControls extends EventDispatcher {

  public enabled: boolean = true;

  public scale: number = 1.0;

  private _camera!: PerspectiveCamera;

  private _zoom!: ZoomBehavior<Element, {}>;

  private _selection!: any;

  private _onResize!: (event: ThreeEvent) => void;

  constructor(camera: PerspectiveCamera, container: HTMLElement | HTMLDocument) {
    super();

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
      .on('click', this._onClick.bind(this))
      .call(this._zoom)
      .on('dblclick.zoom', null);

    this.scale = this._getScaleFromZ(1000);
    const dimensions = this._selection.node().getBoundingClientRect();
    const initialTransform = zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);

    // Set camera position
    this._camera.position.set(0, 1, 1000);
    this._camera.lookAt(0, 0, 0);

    this._onResize = () => {
      this._zoomHandler(zoomTransform(this._selection.node()));
    }

    window.addEventListener('resize', this._onResize, false);
  }

  public setTransform(position: { x: number, y: number }): void {
    const dimensions = this._selection.node().getBoundingClientRect();
    const x = dimensions.width / 2 - this.scale * position.x;
    const y = this.scale * position.y + dimensions.height / 2;

    const initialTransform = zoomIdentity.translate(x, y).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);
  }

  public dispose(): void {
    this.removeEventListener('resize', this._onResize);

    this._selection
      .on('contextmenu', null)
      .on('mousedown', null)
      .on('mousemove', null)
      .on('mouseup', null)
      .on('dblclick', null)
      .on('click', null)
      .on('.zoom', null);
  }

  private _onContextMenu(): void {
    event.preventDefault();
    event.stopPropagation();

    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'contextmenu'
    });
  }

  private _onMouseMove(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'mousemove'
    });
  }

  private _onMouseDown(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      event,
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'mousedown'
    });
  }

  private _onDblClick(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'dblclick'
    });
  }

  private _onClick(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'click'
    });
  }

  private _onMouseUp(): void {
    this.dispatchEvent({ type: 'mouseup' });
  }

  private _zoomHandler(transform: any): void {
    if (!this.enabled) {
      return;
    }
    const dimensions = this._selection.node().getBoundingClientRect();

    if (transform.k !== this.scale) {
      this.scale = transform.k;
      const x = -(transform.x - dimensions.width / 2) / this.scale;
      const y = (transform.y - dimensions.height / 2) / this.scale;
      const z = this._getZFromScale(this.scale);

      this._camera.position.set(x, y, z);

      this.dispatchEvent({
        scale: this.scale,
        type: 'scale'
      });
    } else {
      const x = -(transform.x - dimensions.width / 2) / this.scale;
      const y = (transform.y - dimensions.height / 2) / this.scale;
      const z = this._getZFromScale(this.scale);

      this._camera.position.set(x, y, z);

      this.dispatchEvent({
        scale: this.scale,
        type: 'pan'
      });
    }
  }

  private _getScaleFromZ (z: number): number {
    const dimensions = this._selection.node().getBoundingClientRect();
    const halfFov = this._camera.fov / 2;
    const halfFovRadians = this._toRadians(halfFov);
    const halfFovHeight = Math.tan(halfFovRadians) * z;
    const fovHeight = halfFovHeight * 2;

    return dimensions.height / fovHeight;
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
