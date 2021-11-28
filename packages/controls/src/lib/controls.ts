import {
  pointer,
  select,
  Selection,
} from 'd3-selection';
import {
  zoom,
  ZoomBehavior,
  zoomIdentity,
  zoomTransform
} from 'd3-zoom';
import {
  Event as ThreeEvent,
  EventDispatcher,
  PerspectiveCamera,
  WebGLRenderer,
} from 'three';

export class PrettyGraphControls extends EventDispatcher {

  public enabled: boolean = true;

  public scale: number = 1.0;

  private _camera!: PerspectiveCamera;

  private _zoom!: ZoomBehavior<Element, unknown>;

  private _selection!: Selection<Element, unknown, null, undefined>;

  private _renderer!: WebGLRenderer;

  private _startPosition!: [number, number];

  private _moved: boolean = false;

  private _wait: any = null;

  private _onResize!: (event: ThreeEvent) => void;

  constructor(camera: PerspectiveCamera, container: Element, renderer: WebGLRenderer) {
    super();

    this._camera = camera;
    this._renderer = renderer;
    this._selection = select(container);
  }

  public init() {
    this._zoom = zoom()
      .clickDistance(4)
      .filter(event => {
        if (
          !(event instanceof WheelEvent) &&
          event instanceof MouseEvent && event.which !== 1
        ) {
          return false;
        }

        return this.enabled && !event.ctrlKey;
      })
      .on('end', this._onZoomEnd.bind(this))
      .on('zoom', event => this._zoomHandler(event));

    this._selection
      .on('contextmenu', this._onContextMenu.bind(this) as OmitThisParameter<typeof this._onContextMenu>)
      .on('mousedown', this._onMouseDown.bind(this) as OmitThisParameter<typeof this._onMouseDown>)
      .on('mousemove', this._onMouseMove.bind(this) as OmitThisParameter<typeof this._onMouseMove>)
      .on('mouseup', this._onMouseUp.bind(this) as OmitThisParameter<typeof this._onMouseUp>)
      .call(this._zoom)
      .on('wheel', this._onRotate.bind(this))
      .on('dblclick.zoom', null);

    this._onResize = () => {
      const node = this._selection.node();
      if (node) {
        this._zoomHandler(node);
      }
    }

    window.addEventListener('resize', this._onResize, false);
  }

  public zoomIn() {
    let canZoomIn: boolean = true;
    const node = this._selection.node();

    if (node) {
      const currentTransform = zoomTransform(node);
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
    }

    return canZoomIn;
  }

  public zoomOut() {
    let canZoomIn: boolean = true;
    const node = this._selection.node();

    if (node) {
      const currentTransform = zoomTransform(node);
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
    }

    return canZoomIn;
  }

  public setZoomExtent() {
    const start = this._camera.near + 1;
    const end = this._camera.far - 1;
    this._zoom.scaleExtent([this._getScaleFromZ(end), this._getScaleFromZ(start)]);

    if (this._camera.position.z > end) {
      this.setCameraPosition(end);
    }
  }

  public setCameraPosition(z: number) {
    // Set camera position
    this._camera.position.set(0, 0, z);
    this._camera.lookAt(0, 0, 0);

    this.scale = this._getScaleFromZ(z);

    const node = this._selection.node();

    if (node) {
      const dimensions = node.getBoundingClientRect();
      const initialTransform = zoomIdentity.translate(dimensions.width / 2, dimensions.height / 2).scale(this.scale);
      this._zoom.transform(this._selection, initialTransform);
    }
  }

  public setTransform(position: { x: number, y: number }) {
    const node = this._selection.node();

    if (node) {
      const dimensions = node.getBoundingClientRect();
      const x = dimensions.width / 2 - this.scale * position.x;
      const y = this.scale * position.y + dimensions.height / 2;

      const initialTransform = zoomIdentity.translate(x, y).scale(this.scale);
      this._zoom.transform(this._selection, initialTransform);
    }
  }

  public dispose() {
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

  private _onZoomEnd(event) {
    if (event.sourceEvent?.type === 'mouseup' && event.sourceEvent?.which === 1) {
      this._onMouseUp(event);
    }
  }

  private _onRotate() {
    // this.dispatchEvent({
    //   type: 'rotate'
    // });
  }

  private _onContextMenu(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.enabled) {
      return;
    }

    const [mouseX, mouseY] = pointer(event);

    this.dispatchEvent({
      position: {
        x: mouseX,
        y: mouseY
      },
      type: 'contextmenu'
    });
  }

  private _dist(a, b) {
    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
  }

  private _onMouseMove(event) {
    const [mouseX, mouseY] = pointer(event);

    if (this._startPosition && this._dist(this._startPosition, [mouseX, mouseY]) > 5) {
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

  private _onMouseDown(event) {
    const [mouseX, mouseY] = pointer(event);

    this._moved = false;
    window.clearTimeout(this._wait);
    this._startPosition = [mouseX, mouseY];

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

  private _onMouseUp(event) {
    const target = event.sourceEvent?.target || event.target;
    const e = event.sourceEvent || event;

    this.dispatchEvent({ event, type: 'mouseup' });

    if (!this._renderer.domElement.contains(target) || e.which !== 1) {
      return;
    }

    if (this.enabled && this._dist(pointer(event), this._startPosition) < 5) {
      if (this._moved) {
        this._moved = false;
        return;
      }

      const [mouseX, mouseY] = pointer(event);

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

  private _zoomHandler(event) {
    if (!this.enabled) {
      return;
    }

    const transform = event.transform;
    let canZoom: boolean = true;
    let zoomDirection: string = '';
    const node = this._selection.node();

    if (node) {
      const dimensions = node.getBoundingClientRect();
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
  }

  private _getScaleFromZ (z: number) {
    const node = this._selection.node();

    if (node) {
      const dimensions = node.getBoundingClientRect();
      const halfFov = this._camera.fov / 2;
      const halfFovRadians = this._toRadians(halfFov);
      const halfFovHeight = Math.tan(halfFovRadians) * z;
      const fovHeight = halfFovHeight * 2;

      return dimensions.height / fovHeight;
    }

    return 0;
  }

  private _getZFromScale(scale: number) {
    const node = this._selection.node();
    if (node) {
      const dimensions = node.getBoundingClientRect();
      const scaleHeight = dimensions.height / scale;
      const halfFov = this._camera.fov / 2;
      const halfFovRadians = this._toRadians(halfFov);

      return scaleHeight / (2 * Math.tan(halfFovRadians));
    }

    return 0;
  }

  private _toRadians(angle: number) {
    return angle * (Math.PI / 180);
  }
}
