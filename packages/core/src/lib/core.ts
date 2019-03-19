import {
  Color,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  Vector3,
  WebGLRenderer,
} from 'three';

import { EventEmitter } from './emitter';
import { GraphOptions } from './options';

import { ArrowsLayer } from './arrows/arrows';
import { EdgesLayer } from './edges/edges';
import { LabelsLayer } from './labels/labels';
import { NodesLayer } from './nodes/nodes';

export class PretyGraph {

  public onEvent: EventEmitter = new EventEmitter();

  public nodeScalingFactor: number = 5.0;

  public animationTime: number = 500;

  public edges: any[] = [];

  private _camera!: PerspectiveCamera;

  private _scene!: Scene;

  private _options: GraphOptions = {};

  private _renderer!: WebGLRenderer;

  private _container: HTMLElement = document.body;

  private _fov: number = 75;

  private _far: number = 10000;

  private _nodes: any[] = [];

  private _center: any = null;

  private _controls!: any;

  private _dragInProgress: boolean = false;

  private _dragging: boolean = false;

  private _plane = new Plane();

  private _raycaster = new Raycaster();

  private _intersection = new Vector3()

  private _offset = new Vector3();

  private _indexedNodes: { [id: string]: any; } = {};

  private _labelsLayer: LabelsLayer | null = null;

  private _arrowsLayer!: ArrowsLayer;

  private _edgesLayer!: EdgesLayer;

  private _nodesLayer!: NodesLayer;

  private _resizeHandler: any;

  constructor(options: GraphOptions) {
    this.options = options;

    if (this.options.container) {
      this._container = this.options.container;

      if (options.clearContainer) {
        // Wipe dom
        this._container.innerHTML = '';
      }
    }

    this._setupScene();
    this._setupCamera();
    this._setupRenderer();

    this._controls = new options.controls(this._camera, this._container);
    this._controls.init();

    this._controls.addEventListener('scale', this._onScale.bind(this));

    this._controls.addEventListener('pan', this._onPan.bind(this));

    this._controls.addEventListener('mousemove', this._onMouseMove.bind(this));

    this._controls.addEventListener('contextmenu', this._onContextMenu.bind(this));

    this._controls.addEventListener('dblclick', this._onDblClick.bind(this));

    this._controls.addEventListener('click', this._onClick.bind(this));

    this._controls.addEventListener('mousedown', this._onMouseDown.bind(this));

    this._controls.addEventListener('mouseup', this._onMouseUp.bind(this));

    this._render();

    if (this.options.showLabels) {
      this._labelsLayer = new LabelsLayer(this._scene, this.nodeScalingFactor);
    }
    this._arrowsLayer = new ArrowsLayer(this);
    this._edgesLayer = new EdgesLayer(this);
    this._nodesLayer = new NodesLayer(this);

    this._resizeHandler = () => {
      this._renderer.setSize(this._container.clientWidth, this._container.clientHeight);
      this._camera.aspect = this._container.clientWidth / this._container.clientHeight;
      this._camera.updateProjectionMatrix();

      if (this._edgesLayer) {
        this._edgesLayer.onResize();
      }

      if (this._edgesLayer) {
        this._edgesLayer.onResize();
      }

      if (this._nodesLayer) {
        this._nodesLayer.onResize();
      }

      this._render();
    };

    window.addEventListener('resize', this._resizeHandler);
  }

  set options(options: GraphOptions) {
    // Добавить мердж с дефолтными опциями
    this._options = options;
  }

  get options(): GraphOptions {
    return this._options;
  }

  public setData(data: any, options: any = { animate: false, locate: false }): void {
    this._nodes = data.nodes;
    this.edges = data.links;

    const lastIndexedNodes = JSON.parse(JSON.stringify(this._indexedNodes));
    this._indexingNodes();

    if (data.center) {
      this._center = this._indexedNodes[data.center];
      if (this._center && options.locate) {
        this._controls.setTransform(this._center);
      }
    }

    if (this._labelsLayer) {
      this._labelsLayer.dispose();
    }
    this._arrowsLayer.dispose();
    this._edgesLayer.dispose();
    this._nodesLayer.dispose();

    this._renderer.clear();
    this._renderer.renderLists.dispose();

    if (options.animate) {
        for (const k in this._indexedNodes) {
          if (lastIndexedNodes[k]) {
            this._indexedNodes[k].toX = this._indexedNodes[k].x;
            this._indexedNodes[k].toY = this._indexedNodes[k].y;
            this._indexedNodes[k].fromX = lastIndexedNodes[k].x;
            this._indexedNodes[k].fromY = lastIndexedNodes[k].y;
            this._indexedNodes[k].x = lastIndexedNodes[k].x;
            this._indexedNodes[k].y = lastIndexedNodes[k].y;
          } else {
            this._indexedNodes[k].toX = this._indexedNodes[k].x;
            this._indexedNodes[k].toY = this._indexedNodes[k].y;
            if (this._center && this._indexedNodes[k].id === this._center.id) {
              this._indexedNodes[k].fromX = this._center.x;
              this._indexedNodes[k].fromY = this._center.y;
              this._indexedNodes[k].x = this._center.x;
              this._indexedNodes[k].y = this._center.y;
            } else {
              this._indexedNodes[k].fromX = this._getRandomFromRange(-this._container.clientWidth, this._container.clientWidth);
              this._indexedNodes[k].fromY = this._getRandomFromRange(-this._container.clientHeight, this._container.clientHeight);
              this._indexedNodes[k].x = this._getRandomFromRange(-this._container.clientWidth, this._container.clientWidth);
              this._indexedNodes[k].y = this._getRandomFromRange(-this._container.clientHeight, this._container.clientHeight);
            }
          }
        }

        this._edgesLayer.draw();
        this._arrowsLayer.draw();
        this._nodesLayer.draw();

        if (this._labelsLayer) {
          this._labelsLayer.draw();
        }

        this._render();

        requestAnimationFrame(this._animate.bind(this));
    } else {
      this._edgesLayer.draw();
      this._arrowsLayer.draw();
      this._nodesLayer.draw();

      if (this._labelsLayer) {
        this._labelsLayer.draw();
      }

      this._render();
    }
  }

  public getNodeByID(nodeID: string): any {
    const node = this._indexedNodes[nodeID];

    const coordinates = this._translateCoordinates(node.x, node.y);

    return {
      node,
      ...coordinates,
      scale: this._controls.scale
    };
  }

  public getScreenshot(): string {
    const renderer = new WebGLRenderer({ premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: true, alpha: true });
    renderer.setSize(this._container.clientWidth, this._container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.render(this._scene, this._camera);

    return renderer.domElement.toDataURL( 'image/png' );
  }

  public destroy(): void {
    window.removeEventListener('resize', this._resizeHandler);

    if (this._labelsLayer) {
      this._labelsLayer.dispose();
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.dispose();
    }

    if (this._edgesLayer) {
      this._edgesLayer.dispose();
    }

    if (this._nodesLayer) {
      this._nodesLayer.dispose();
    }

    this._disposeRenderer();

    this._controls.dispose();

    this._nodes = [];
    this.edges = [];
    this._indexedNodes = {};
  }

  private _onMouseMove({ position }: any): void {
    if (this._dragging) {
      // dragging node
      const mouse = new Vector3();
      mouse.x = (position.x / this._container.clientWidth) * 2 - 1;
      mouse.y = -(position.y / this._container.clientHeight) * 2 + 1;

      let newPos = {
        x: this._nodesLayer.hoveredNode.x,
        y: this._nodesLayer.hoveredNode.y
      };

      if (!this._dragInProgress) {
        const worldVector = new Vector3();
        this._camera.getWorldDirection(worldVector);
        this._plane.setFromNormalAndCoplanarPoint(worldVector, new Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
        this._raycaster.setFromCamera(mouse, this._camera);
        this._raycaster.ray.intersectPlane(this._plane, this._intersection);
        this._offset.copy(this._intersection).sub(new Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
        newPos = this._intersection.sub(this._offset).clone();

        this._dragInProgress = true;
      } else {
        this._raycaster.setFromCamera(mouse, this._camera);
        this._raycaster.ray.intersectPlane(this._plane, this._intersection);
        newPos = this._intersection.sub(this._offset).clone();
      }

      if (this._nodesLayer.hoveredNode !== null) {
        this._nodesLayer.setNodePosition(newPos);

        if (this._labelsLayer && this._nodesLayer.hoveredNode.__labelIndex) {
          this._labelsLayer.setLabelPosition(this._nodesLayer.hoveredNode.__labelIndex, { x: newPos.x, y: newPos.y, z: 0 });
        }
      }

      this._nodesLayer.hoveredNode.x = newPos.x;
      this._nodesLayer.hoveredNode.y = newPos.y;

      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeMoving', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });

      this._edgesLayer.recalculate();
      this._edgesLayer.recalculatePicking();

      this._arrowsLayer.recalculate();
    } else {
      if (!this._nodesLayer.testNode(position)) {
        this._edgesLayer.testEdge(position);
      } else {
        this._edgesLayer.resetHoverEdge();
      }
    }

    this._render();
  }

  private _onMouseUp(): void {
    this._controls.enabled = true;
    this._dragging = false;
    this._dragInProgress = false;
  }

  private _onMouseDown({ event }): void {
    if (this._nodesLayer.hoveredNode !== null && event.buttons === 1) {
      this._controls.enabled = false;
      this._dragging = true;
    }
  }

  private _onClick(): void {
    if (this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    }

    if (!this._nodesLayer.hoveredNode && !this._edgesLayer.hoveredEdge) {
      this.onEvent.emit('workspaceClick');
    }
  }

  private _onDblClick(): void {
    if (this._nodesLayer.hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeDblClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    }
  }

  private _onContextMenu(position: { x: number, y: number }): void {
    if (this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeContextMenu', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    } else if (this._edgesLayer.hoveredEdge) {
      this.onEvent.emit('edgeContextMenu', { edge: this._edgesLayer.hoveredEdge, coordinates: position, scale: this._controls.scale });
    }

  }

  private _onPan(): void {
    this._render();

    if (this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeScaling', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    } else {
      this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale });
    }
  }

  private _onScale(event: any): void {
    if (this._nodesLayer) {
      this._nodesLayer.onScale(event.scale);
    }

    if (this._edgesLayer) {
      this._edgesLayer.onScale(event.scale);
    }

    this._render();

    if (this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeScaling', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    } else {
      this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale });
    }
  }

  private _disposeRenderer(): void {
    if (this._renderer) {
      this._renderer.clear();
      this._renderer.renderLists.dispose();
      this._container.removeChild(this._renderer.domElement);
      this._renderer.dispose();
    }
  }

  private _translateCoordinates(x: number, y: number): any {
    const vector = new Vector3(x, y, 0);

    const widthHalf = 0.5 * this._renderer.context.canvas.width;
    const heightHalf = 0.5 * this._renderer.context.canvas.height;

    vector.project(this._camera);

    vector.x = ( vector.x * widthHalf ) + widthHalf;
    vector.y = - ( vector.y * heightHalf ) + heightHalf;

    return {
      x: vector.x,
      y: vector.y
    };
  }

  private _setupScene(): void {
    this._scene = new Scene();
    this._scene.background = new Color(this.options.backgroundColor || 'white');
  }

  private _setupCamera(): void {
    this._camera = new PerspectiveCamera(this._fov, this._container.clientWidth / this._container.clientHeight, 0.1, this._far);
    this._camera.lookAt(0, 0, 0);
  }

  private _setupRenderer(): void {
    this._renderer = new WebGLRenderer({
      alpha: true,
      antialias: true
    });

    // Add support for retina displays
    this._renderer.setPixelRatio(window.devicePixelRatio);

    // Set canvas dimension
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight);

    // Add the canvas to the DOM
    this._container.appendChild(this._renderer.domElement);
  }

  private _render(): void {
    this._renderer.render(this._scene, this._camera);
  }

  private _indexingNodes(): void {
    this._indexedNodes = {};

    this._nodes.forEach((node) => {
      if (this._indexedNodes[node.id]) {
        /* tslint:disable-next-line no-console */
        console.error(`Node with id ${node.id} already exists`);
      }

      this._indexedNodes[node.id] = node;
    });
  }

  private _moveNodes(last: boolean = false): void {
    if (this._nodesLayer) {
      this._nodesLayer.recalculate();
    }

    if (this._labelsLayer) {
      this._labelsLayer.recalculate();
    }

    if (this._edgesLayer) {
      this._edgesLayer.recalculate();
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.recalculate();
    }

    if (last) {
      if (this._nodesLayer) {
        this._nodesLayer.recalculatePicking();
      }

      if (this._edgesLayer) {
        this._edgesLayer.recalculatePicking();
      }
    }
  }

  private _getRandomFromRange(min, max): number {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private _interpolate(val: number): number {
    let newValue = val;

    /* tslint:disable-next-line no-conditional-assignment */
    if ((newValue *= 2) < 1) {
      return 0.5 * newValue * newValue;
    }
    return - 0.5 * (--newValue * (newValue - 2) - 1);
  }

  private _animate(): void {
    const start = Date.now();

    this._arrowsLayer.hide();
    if (this._labelsLayer) {
      this._labelsLayer.hide();
    }
    this._nodesLayer.setSilent(true);

    const step = () => {
      let p = (Date.now() - start) / this.animationTime;

      if (p >= 1) {
        for (const k in this._indexedNodes) {
          if (this._indexedNodes[k]) {
            this._indexedNodes[k].x = this._indexedNodes[k].toX;
            this._indexedNodes[k].y = this._indexedNodes[k].toY;
          }
        }

        // ADD change node positions
        this._moveNodes(true);

        this._arrowsLayer.show();
        if (this._labelsLayer) {
          this._labelsLayer.show();
        }
        this._nodesLayer.setSilent(false);

        this._render();
      } else {
        p = this._interpolate(p);
        for (const k in this._indexedNodes) {
          if (this._indexedNodes[k]) {
            this._indexedNodes[k].x = this._indexedNodes[k].toX * p + this._indexedNodes[k].fromX * (1 - p);
            this._indexedNodes[k].y = this._indexedNodes[k].toY * p + this._indexedNodes[k].fromY * (1 - p);
          }
        }

        // ADD change node positions
        this._moveNodes();

        this._render();
        requestAnimationFrame(step);
      }
    };

    step();
  }
}
