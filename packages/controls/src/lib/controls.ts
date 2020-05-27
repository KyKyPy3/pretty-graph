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

  private _renderer!: any;

  private _startPosition!: any;

  private _moved: boolean = false;

  private _wait: any = null;

  private _onResize!: (event: ThreeEvent) => void;

  constructor(camera: PerspectiveCamera, container: HTMLElement | HTMLDocument, renderer: any) {
    super();

    this._camera = camera;
    this._renderer = renderer;
    this._selection = select(container);
  }

  public init(): void {
    this._zoom = zoom()
      .filter(() => this.enabled && !event.ctrlKey)
      .on('end', this._onZoomEnd.bind(this))
      .on('zoom', () => this._zoomHandler(event.transform));

    this._selection
      .on('contextmenu', this._onContextMenu.bind(this))
      .on('mousedown', this._onMouseDown.bind(this))
      .on('mousemove', this._onMouseMove.bind(this))
      .on('mouseup', this._onMouseUp.bind(this))
      .call(this._zoom)
      .on('wheel', this._onRotate.bind(this))
      .on('dblclick.zoom', null);

    this._onResize = () => {
      this._zoomHandler(zoomTransform(this._selection.node()));
    }

    window.addEventListener('resize', this._onResize, false);
  }

  public zoomIn(): boolean {
    let canZoomIn: boolean = true;
    const currentTransform = zoomTransform(this._selection.node());
    const targetZoom = currentTransform.k * (1.2);
    let z = this._getZFromScale(targetZoom);

    if (z < this._camera.near + 1) {
      z = this._camera.near + 1;
      canZoomIn = false;
    }
    const scale = this._getScaleFromZ(z);

    if (this.scale !== scale) {
      const initialTransform = zoomIdentity.translate(currentTransform.x, currentTransform.y).scale(scale);
      this._zoom.transform(this._selection, initialTransform);
    }

    return canZoomIn;
  }

  public zoomOut(): boolean {
    let canZoomIn: boolean = true;
    const currentTransform = zoomTransform(this._selection.node());
    const targetZoom = currentTransform.k * (0.8);
    let z = this._getZFromScale(targetZoom);

    if (z > this._camera.far - 1) {
      z = this._camera.far - 1;
      canZoomIn = false;
    }
    const scale = this._getScaleFromZ(z);

    if (this.scale !== scale) {
      const initialTransform = zoomIdentity.translate(currentTransform.x, currentTransform.y).scale(scale);
      this._zoom.transform(this._selection, initialTransform);
    }

    return canZoomIn;
  }

  public setZoomExtent(): void {
    const start = this._camera.near + 1;
    const end = this._camera.far - 1;
    this._zoom.scaleExtent([this._getScaleFromZ(end), this._getScaleFromZ(start)]);

    if (this._camera.position.z > end) {
      this.setCameraPosition(end);
    }
  }

  public setCameraPosition(z: number): void {
    // Set camera position
    this._camera.position.set(0, 0, z);
    this._camera.lookAt(0, 0, 0);

    this.scale = this._getScaleFromZ(z);
    const dimensions = this._selection.node().getBoundingClientRect();
    const initialTransform = zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);
  }

  public setTransform(position: { x: number, y: number }): void {
    const dimensions = this._selection.node().getBoundingClientRect();
    const x = dimensions.width / 2 - this.scale * position.x;
    const y = this.scale * position.y + dimensions.height / 2;

    const initialTransform = zoomIdentity.translate(x, y).scale(this.scale);
    this._zoom.transform(this._selection, initialTransform);
  }

  public dispose(): void {
    window.removeEventListener('resize', this._onResize);

    this._selection
      .on('contextmenu', null)
      .on('mousedown', null)
      .on('mousemove', null)
      .on('mouseup', null)
      .on('dblclick', null)
      .on('click', null)
      .on('wheel', null)
      .on('.zoom', null)
      .on('end', null);
  }

  private _onZoomEnd(): void {
    if (event.sourceEvent?.type === 'mouseup' && event.sourceEvent?.which === 1) {
      this._onMouseUp();
    }
  }

  private _onRotate(): void {
    // this.dispatchEvent({
    //   type: 'rotate'
    // });
  }

  private _onContextMenu(): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.enabled) {
      return;
    }

    const [mouseX, mouseY] = mouse(this._selection.node());

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'contextmenu'
    });
  }

  private _dist(a, b): number {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  private _onMouseMove(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    if (this._startPosition && this._dist(this._startPosition, mouse(this._selection.node())) > 5) {
      this._moved = true;
    }

    this.dispatchEvent({
      event,
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'mousemove'
    });
  }

  private _onMouseDown(): void {
    const [mouseX, mouseY] = mouse(this._selection.node());

    this._moved = false;
    window.clearTimeout(this._wait);
    this._startPosition = mouse(this._selection.node());

    if (!this._renderer.domElement.contains(event.target)) {
      return;
    }

    this.dispatchEvent({
      event,
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'mousedown'
    });
  }

  private _onMouseUp(): void {
    const target = event.sourceEvent?.target || event.target;

    if (!this._renderer.domElement.contains(target)) {
      return;
    }

    this.dispatchEvent({ event, type: 'mouseup' });

    if (this.enabled && this._dist(mouse(this._selection.node()), this._startPosition) < 5) {
      if (this._moved) {
        this._moved = false;
        return;
      }

      const [mouseX, mouseY] = mouse(this._selection.node());

      if (this._wait) {
        window.clearTimeout(this._wait);
        this._wait = null;
        this.dispatchEvent({
          position: {
            x: mouseX,
            y: mouseY
          },
          type: 'dblclick'
        });
      } else {
        this._wait = window.setTimeout(() => {
          this._wait = null;
          this.dispatchEvent({
            event,
            position: {
              x: mouseX,
              y: mouseY
            },
            type: 'click'
          });
        }, 250);
      }
    }

  }

  private _zoomHandler(transform: any): void {
    if (!this.enabled) {
      return;
    }

    let canZoom: boolean = true;
    let zoomDirection: string = '';
    const dimensions = this._selection.node().getBoundingClientRect();
    let ctrlKey = false;

    if (event && event.sourceEvent && event.sourceEvent.ctrlKey) {
      ctrlKey = true
    };

    let z = this._getZFromScale(transform.k);
    if (z >= this._camera.far - 1) {
      z = this._camera.far - 1;
      canZoom = false;
    }

    if (z <= this._camera.near + 1) {
      z = this._camera.near + 1;
      canZoom = false;
    }
    const scale = this._getScaleFromZ(z);

    if (scale !== this.scale) {
      if (scale > this.scale) {
        zoomDirection = 'in';
      } else {
        zoomDirection = 'out';
      }

      if (!ctrlKey) {
        this.scale = scale;
        const x = -(transform.x - dimensions.width / 2) / scale;
        const y = (transform.y - dimensions.height / 2) / scale;

        this._camera.position.set(x, y, z);

        this.dispatchEvent({
          canZoom,
          scale,
          type: 'scale',
          zoomDirection
        });
      } else {
        this.dispatchEvent({
          delta: event.sourceEvent.deltaY,
          type: 'rotate'
        });
      }
    } else {
      const x = -(transform.x - dimensions.width / 2) / this.scale;
      const y = (transform.y - dimensions.height / 2) / this.scale;

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
