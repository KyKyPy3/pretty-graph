import {
  Color,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

import { EventEmitter } from './emitter';
import { GraphOptions } from './options';

import { ArrowsLayer } from './arrows/arrows';
import { EdgesLayer } from './edges/edges';
import { LabelsLayer } from './labelsLayer/labels';
import { NodesLayer } from './nodes/nodes';

export class PretyGraph {

  public onEvent: EventEmitter = new EventEmitter();

  public nodeScalingFactor: number = 5.0;

  public animationTime: number = 500;

  public neighbourhoodNodes: { [id: string]: any; } = {};

  public neighbourhoodEdges: { [id: string]: any; } = {};

  private _camera!: PerspectiveCamera | null;

  private _scene!: Scene | null;

  private _options: GraphOptions = {};

  private _renderer!: WebGLRenderer | null;

  private _container: HTMLElement = document.body;

  private _fov: number = 75;

  private _far: number = 10000;

  private _nodes: any[] = [];

  private _edges: any[] = [];

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

  private _arrowsLayer: ArrowsLayer | null = null;

  private _edgesLayer: EdgesLayer | null = null;

  private _nodesLayer: NodesLayer | null = null;

  private _resizeHandler: any;

  private _selectBox: HTMLElement;

  private _startPoint = new Vector2();

  private _pointTopLeft = new Vector2();

  private _pointBottomRight = new Vector2();

  private _iframe: HTMLIFrameElement;

  private _resizeTimeout: number = 0;

  private _labelHidedOnMove: boolean = false;

  private _selectMode: boolean = false;

  private _skip: boolean = false;

  // Listeners

  private _onScaleListener: any;

  private _onPanListener: any;

  private _onMouseMoveListener: any;

  private _onContextMenuListener: any;

  private _onDblClickListener: any;

  private _onClickListener: any;

  private _onMouseDownListener: any;

  private _onMouseUpListener: any;

  private _onRotateListener: any;

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

    this._controls = new options.controls(this._camera, this._container, this._renderer);
    this._controls.init();

    this._addControlsListeners();

    this._render();

    if (!this.options.disableLabels) {
      this._labelsLayer = new LabelsLayer(this);
      if (!this.options.showLabels) {
        this._labelsLayer.hide();
      }
    }
    this._arrowsLayer = new ArrowsLayer(this);
    this._edgesLayer = new EdgesLayer(this);
    this._nodesLayer = new NodesLayer(this);

    this._resizeHandler = () => {
      clearTimeout(this._resizeTimeout);
      this._resizeTimeout = setTimeout(() => {
        if (this._renderer && this._camera) {
          this._renderer.setSize(this._container.clientWidth, this._container.clientHeight, false);
          this._camera.aspect = this._container.clientWidth / this._container.clientHeight;
          this._camera.updateProjectionMatrix();
        }

        if (this._edgesLayer) {
          this._edgesLayer.onResize();
        }

        if (this._labelsLayer) {
          this._labelsLayer.onResize();
        }

        if (this._nodesLayer) {
          this._nodesLayer.onResize();
        }

        this._render();
      }, 20);
    };

    this._controls.setCameraPosition(1000);

    this._selectBox = document.createElement('div');
    this._selectBox.style.pointerEvents = 'none';
    this._selectBox.style.zIndex = '10001';
    this._selectBox.style.border = '1px solid red';
    this._selectBox.style.position = 'absolute';
    this._selectBox.style.backgroundColor = 'rgba(75, 160, 255, 0.3)';

    this._iframe = document.createElement('iframe');
    this._iframe.style.position = 'absolute';
    this._iframe.style.userSelect = 'none';
    this._iframe.style.top = '0';
    this._iframe.style.left = '0';
    this._iframe.style.height = '100%';
    this._iframe.style.width = '100%';
    this._iframe.style.zIndex = '-1';

    this._container.appendChild(this._iframe);

    if (this._iframe.contentWindow) {
      this._iframe.contentWindow.addEventListener('resize', this._resizeHandler, false);
    }
  }

  set options(options: GraphOptions) {
    // Добавить мердж с дефолтными опциями
    this._options = options;
  }

  get options(): GraphOptions {
    return this._options;
  }

  public zoomIn(): boolean {
    return this._controls.zoomIn();
  }

  public zoomOut(): boolean {
    return this._controls.zoomOut();
  }

  public showLabels(): void {
    if (this._labelsLayer) {
      this._labelsLayer.show();
    }
  }

  public hideLabels(): void {
    if (this._labelsLayer) {
      this._labelsLayer.hide();
    }
  }

  public activateSelectMode(): void {
    this._selectMode = true;
    this._controls.enabled = false;
    this.onEvent.emit('changeMode', { mode: 'select' });
  }

  public deactivateSelectMode(): void {
    this._selectMode = false;
    this._controls.enabled = true;
    this.onEvent.emit('changeMode', { mode: 'view' });
  }

  public toggleLabels(): void {
    if (this._labelsLayer) {
      this._labelsLayer.toggleLabels();
    }
  }

  public setData(data: any, options: any = { animate: false, locate: false }): void {
    this._nodes = data.nodes;
    this._edges = data.links;

    const lastIndexedNodes = JSON.parse(JSON.stringify(this._indexedNodes));
    this._indexingNodes();
    this._collectNeighbourhoods();

    if (data.center) {
      this._center = this._indexedNodes[data.center];
      if (this._center && options.locate && this._controls) {
        this._controls.setTransform(this._center);
      }
    }

    if (this._labelsLayer) {
      this._labelsLayer.clear();
    }

    if (this._renderer) {
      this._renderer.clear();
      this._renderer.renderLists.dispose();

      if (this._camera) {
        this._renderer.setSize(this._container.clientWidth, this._container.clientHeight, false);
        this._camera.aspect = this._container.clientWidth / this._container.clientHeight;
        this._camera.updateProjectionMatrix();
      }
    }

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

        if (this._edgesLayer) {
          this._edgesLayer.draw();
        }
        if (this._arrowsLayer) {
          this._arrowsLayer.draw();
        }
        if (this._nodesLayer) {
          this._nodesLayer.draw();
        }

        if (this._labelsLayer) {
          this._labelsLayer.draw();
        }

        this._render();

        requestAnimationFrame(this._animate.bind(this));
    } else {
      if (this._edgesLayer) {
        this._edgesLayer.draw();
      }
      if (this._arrowsLayer) {
        this._arrowsLayer.draw();
      }
      if (this._nodesLayer) {
        this._nodesLayer.draw();
      }

      if (this._labelsLayer) {
        this._labelsLayer.draw();
      }

      this._render();
    }

    if (this._camera && this._nodesLayer) {
      const size = this._nodesLayer.getSize();

      const maxDim = Math.max(size.y, size.x);

      if (maxDim) {
        this._camera.near = 150;
        this._camera.far = maxDim * 10;
      } else {
        this._camera.near = 150;
        this._camera.far = 1000;
      }

      this._camera.updateProjectionMatrix();

      // const fov = this._camera.fov / 2 * Math.PI / 180;

      // const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov) * (this._container.clientWidth / this._container.clientHeight)));

      // console.log("Camera z", this._camera.position.z);
      // console.log("New canera z", cameraZ);

      this._controls.setZoomExtent();
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

    if (this._scene && this._camera) {
      renderer.setSize(this._container.clientWidth, this._container.clientHeight);
      renderer.setPixelRatio(1);
      renderer.render(this._scene, this._camera);
    }

    const screenshotCanvas = document.createElement("canvas");
    screenshotCanvas.width = this._container.clientWidth;
    screenshotCanvas.height = this._container.clientHeight;
    const canvasCtx = screenshotCanvas.getContext('2d');

    if (canvasCtx) {
      canvasCtx.fillStyle = "white";
      canvasCtx.fillRect(0, 0, screenshotCanvas.width, screenshotCanvas.height);
      canvasCtx.drawImage(renderer.getContext().canvas, 0, 0);

      if (this._labelsLayer) {
        this._labelsLayer.draw(canvasCtx);
      }
    }

    const image = screenshotCanvas.toDataURL( 'image/png' );

    return image;
  }

  public destroy(): void {
    if (this._iframe && this._iframe.contentWindow) {
      this._iframe.contentWindow.removeEventListener('resize', this._resizeHandler);

      this._container.removeChild(this._iframe);
    }

    this._removeControlsListeners();

    if (this._labelsLayer) {
      this._labelsLayer.dispose();
      this._labelsLayer = null;
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.dispose();
      this._arrowsLayer = null;
    }

    if (this._edgesLayer) {
      this._edgesLayer.dispose();
      this._edgesLayer = null;
    }

    if (this._nodesLayer) {
      this._nodesLayer.dispose();
      this._nodesLayer = null;
    }

    if (this._scene) {
      (this._scene as any).dispose();
    }

    this._disposeRenderer();

    this._camera = null;

    if (this._controls) {
      this._controls.dispose();
      this._controls = null;
    }

    this._nodes = [];
    this._edges = [];
    this._center = null;
    this._indexedNodes = {};
    this._scene = null;
  }

  private _addControlsListeners(): void {
    this._onScaleListener = this._onScale.bind(this);
    this._controls.addEventListener('scale', this._onScaleListener);

    this._onPanListener = this._onPan.bind(this);
    this._controls.addEventListener('pan', this._onPanListener);

    this._onMouseMoveListener = this._onMouseMove.bind(this);
    this._controls.addEventListener('mousemove', this._onMouseMoveListener);

    this._onContextMenuListener = this._onContextMenu.bind(this);
    this._controls.addEventListener('contextmenu', this._onContextMenuListener);

    this._onDblClickListener = this._onDblClick.bind(this);
    this._controls.addEventListener('dblclick', this._onDblClickListener);

    this._onClickListener = this._onClick.bind(this);
    this._controls.addEventListener('click', this._onClickListener);

    this._onMouseDownListener = this._onMouseDown.bind(this);
    this._controls.addEventListener('mousedown', this._onMouseDownListener);

    this._onMouseUpListener = this._onMouseUp.bind(this);
    this._controls.addEventListener('mouseup', this._onMouseUpListener);

    this._onRotateListener = this._onRotate.bind(this);
    this._controls.addEventListener('rotate', this._onRotateListener);

    this.onEvent.on('nodeHover', this._onNodeHover.bind(this));
    this.onEvent.on('nodeUnhover', this._onNodeUnhover.bind(this));
    this.onEvent.on('workspaceClick', this._onWorkspaceClick.bind(this));
  }

  private _removeControlsListeners(): void {
    this._controls.removeEventListener('scale', this._onScaleListener);
    this._controls.removeEventListener('pan', this._onPanListener);
    this._controls.removeEventListener('mousemove', this._onMouseMoveListener);
    this._controls.removeEventListener('contextmenu', this._onContextMenuListener);
    this._controls.removeEventListener('dblclick', this._onDblClickListener);
    this._controls.removeEventListener('click', this._onClickListener);
    this._controls.removeEventListener('mousedown', this._onMouseDownListener);
    this._controls.removeEventListener('mouseup', this._onMouseUpListener);
    this._controls.removeEventListener('rotate', this._onRotateListener);

    this.onEvent.removeAllListeners();
  }

  private _onWorkspaceClick(): void {
    if (this._nodesLayer) {
      this._nodesLayer.clearActiveNodes();
    }

    if (this._edgesLayer) {
      this._edgesLayer.clearActiveEdges();
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.recalculate();
    }

    this._render();
  }

  private _onNodeHover(data): void {
    const node = data.node;

    const hoveredEdges = this.neighbourhoodEdges[node.id];
    if (this._edgesLayer) {
      this._edgesLayer.setHoveredEdges(hoveredEdges);
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.recalculate();
    }

    this._render();
  }

  private _onNodeUnhover(): void {
    if (this._edgesLayer) {
      this._edgesLayer.clearHoveredEdges();
    }

    if (this._arrowsLayer) {
      this._arrowsLayer.recalculate();
    }

    this._render();

  }

  private _onRotate({ delta }): void {
    if (this._scene) {
      this._scene.rotation.z += delta * 0.001;
    }

    this._render();
  }

  private _onMouseMove({ position }: any): void {
    if (this._dragging && this._camera) {
      if (this._labelsLayer && !this._labelsLayer.isHidden()) {
        this._labelHidedOnMove = true;
        this._labelsLayer.hide();
      }

      // dragging node
      const mouse = new Vector3();
      mouse.x = (position.x / this._container.clientWidth) * 2 - 1;
      mouse.y = -(position.y / this._container.clientHeight) * 2 + 1;
      let newPos = {
        x: 0,
        y: 0
      };

      if (this._nodesLayer) {
        newPos = {
          x: this._nodesLayer.hoveredNode ? this._nodesLayer.hoveredNode.x : 0,
          y: this._nodesLayer.hoveredNode ? this._nodesLayer.hoveredNode.y : 0
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
          const offset = { x: 0, y: 0};
          offset.x = this._nodesLayer.hoveredNode.x - newPos.x;
          offset.y = this._nodesLayer.hoveredNode.y - newPos.y;
          let nodes;
          if (this._nodesLayer && this._nodesLayer.activeNodes.length) {
            const hasHoveredNode = this._nodesLayer.activeNodes.find((n) => {
              if (this._nodesLayer) {
                return n.id === this._nodesLayer.hoveredNode.id
              }

              return false;
            });

            if (hasHoveredNode) {
              nodes = this._nodesLayer.activeNodes;
            } else {
              nodes = [this._nodesLayer.hoveredNode, ...this.neighbourhoodNodes[this._nodesLayer.hoveredNode.id]];
            }
          } else {
            nodes = [this._nodesLayer.hoveredNode];
          }
          this._nodesLayer.setNodePosition(nodes, offset);

          if (this._labelsLayer) {
            this._labelsLayer.setLabelsPositionForNodes(nodes, offset);
          }
        }

        const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
        this.onEvent.emit('nodeMoving', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
      }

      if (this._edgesLayer) {
        this._edgesLayer.recalculate();
        this._edgesLayer.recalculatePicking();
      }

      if (this._labelsLayer) {
        this._labelsLayer.recalculate();
      }

      if (this._arrowsLayer) {
        this._arrowsLayer.recalculate();
      }
    } else {
      if (this._selectMode) {
        this._pointBottomRight.x = Math.max( this._startPoint.x, position.x );
		    this._pointBottomRight.y = Math.max( this._startPoint.y, position.y );
		    this._pointTopLeft.x = Math.min( this._startPoint.x, position.x );
        this._pointTopLeft.y = Math.min( this._startPoint.y, position.y );

        this._selectBox.style.left = this._pointTopLeft.x + 'px';
		    this._selectBox.style.top = this._pointTopLeft.y + 'px';
		    this._selectBox.style.width = ( this._pointBottomRight.x - this._pointTopLeft.x ) + 'px';
		    this._selectBox.style.height = ( this._pointBottomRight.y - this._pointTopLeft.y ) + 'px';
      } else {
        if (this._nodesLayer && !this._nodesLayer.testNode(position)) {
          if (this._edgesLayer) {
            this._edgesLayer.testEdge(position);
          }
        } else {
          if (this._edgesLayer) {
            this._edgesLayer.resetHoverEdge();
          }
        }

        if (this._arrowsLayer) {
          this._arrowsLayer.recalculate();
        }
      }
    }

    this._render();
  }

  private _onMouseUp({ event }): void {
    if (this._selectMode) {
      this._selectMode = false;
      this._skip = true;
      this.onEvent.emit('changeMode', { mode: 'view' });

      if (this._selectBox && this._selectBox.parentElement) {
        this._selectBox.parentElement.removeChild(this._selectBox);
      }

      if (this._nodesLayer && this._camera) {
        const nodes = {};
        this._nodesLayer.refreshBuffer();
        for (let x = this._pointTopLeft.x; x < this._pointBottomRight.x; x++) {
          for (let y = this._pointTopLeft.y; y < this._pointBottomRight.y; y++) {
            const node = this._nodesLayer.pickNode({ x, y });
            if (node) {
              nodes[node.id] = node;
            }
          }
        }

        if (Object.values(nodes).length) {
          if (this._nodesLayer) {
            this._nodesLayer.setActiveNodes(Object.values(nodes));
          }

          this._render();
        }
      }
    } else {
      if (this._nodesLayer && !this._dragInProgress) {
        if (event.altKey) {
          this._nodesLayer.setActiveNodes([this._nodesLayer.hoveredNode, ...this._nodesLayer.activeNodes]);
        } else {
          const activeNodes = [this._nodesLayer.hoveredNode, ...this.neighbourhoodNodes[this._nodesLayer.hoveredNode.id]];
          this._nodesLayer.setActiveNodes(activeNodes);

          if (this._edgesLayer) {
            this._edgesLayer.clearActiveEdges();
            const activeEdges = this.neighbourhoodEdges[this._nodesLayer.hoveredNode.id];
            this._edgesLayer.setActiveEdges(activeEdges);
          }

          if (this._arrowsLayer) {
            this._arrowsLayer.recalculate();
          }
        }

        this._render();
      }
    }

    this._controls.enabled = true;
    this._dragging = false;
    this._dragInProgress = false;

    if (this._labelsLayer && this._labelHidedOnMove) {
      this._labelsLayer.show();
      this._labelHidedOnMove = false;
    }
  }

  private _onMouseDown({ event, position }): void {
    if (this._nodesLayer && this._nodesLayer.hoveredNode !== null && event.buttons === 1) {
      this._controls.enabled = false;
      this._dragging = true;
    } else {
      if (this._selectMode) {
        if (this._nodesLayer) {
          this._nodesLayer.clearActiveNodes();

          this._render();
        }

        if (this._renderer && this._renderer.domElement && this._renderer.domElement.parentElement) {
          this._renderer.domElement.parentElement.appendChild(this._selectBox);
        }

        this._selectBox.style.left = position.x + 'px';
        this._selectBox.style.top = position.y + 'px';
        this._selectBox.style.width = '0px';
        this._selectBox.style.height = '0px';

        this._startPoint = new Vector2();
        this._pointBottomRight = new Vector2();
        this._pointTopLeft = new Vector2();

        this._startPoint.x = position.x;
        this._startPoint.y = position.y;
      }
    }
  }

  private _onClick(): void {
    if (this._skip) {
      this._skip = false;
      return
    }
    if (this._nodesLayer && this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    }

    if (this._nodesLayer && !this._nodesLayer.hoveredNode && this._edgesLayer && !this._edgesLayer.hoveredEdge) {
      this.onEvent.emit('workspaceClick');
    }
  }

  private _onDblClick(): void {
    if (this._nodesLayer && this._nodesLayer.hoveredNode !== null) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeDblClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    }
  }

  private _onContextMenu(position: { x: number, y: number }): void {
    if (this._nodesLayer && this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeContextMenu', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
    } else if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
      this.onEvent.emit('edgeContextMenu', { edge: this._edgesLayer.hoveredEdge, coordinates: position, scale: this._controls.scale });
    }

  }

  private _onPan(): void {
    this._render();

    if (this._labelsLayer) {
      this._labelsLayer.recalculate();
    }

    if (this._nodesLayer && this._nodesLayer.hoveredNode) {
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

    if (this._labelsLayer) {
      this._labelsLayer.recalculate();
    }

    if (this._nodesLayer && this._nodesLayer.hoveredNode) {
      const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
      this.onEvent.emit('nodeScaling', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale, canZoom: event.canZoom, zoomDirection: event.zoomDirection });
    } else {
      this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale, canZoom: event.canZoom, zoomDirection: event.zoomDirection });
    }
  }

  private _disposeRenderer(): void {
    if (this._renderer) {
      // this._renderer.clear();
      this._renderer.renderLists.dispose();
      if (this._renderer.domElement) {
        this._container.removeChild(this._renderer.domElement);
      }
      this._renderer.dispose();
      this._renderer = null;
    }
  }

  private _translateCoordinates(x: number, y: number): any {
    const vector = new Vector3(x, y, 0);

    if (this._camera && this._renderer) {
      const widthHalf = 0.5 * this._renderer.getContext().canvas.width;
      const heightHalf = 0.5 * this._renderer.getContext().canvas.height;

      vector.project(this._camera);

      vector.x = ( vector.x * widthHalf ) + widthHalf;
      vector.y = - ( vector.y * heightHalf ) + heightHalf;
    }

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
    this._renderer.setPixelRatio(1);

    // Set canvas dimension
    this._renderer.setSize(this._container.clientWidth, this._container.clientHeight, false);

    this._renderer.domElement.style.position = 'absolute';

    // Add the canvas to the DOM
    this._container.appendChild(this._renderer.domElement);
  }

  private _render(): void {
    if (this._scene && this._camera && this._renderer) {
      this._renderer.render(this._scene, this._camera);
    }
  }

  private _collectNeighbourhoods(): void {
    this.neighbourhoodNodes = {};

    for (const edge of this._edges) {
      if (!this.neighbourhoodNodes[edge.source.id]) {
        this.neighbourhoodNodes[edge.source.id] = [];
      }

      if (!this.neighbourhoodNodes[edge.target.id]) {
        this.neighbourhoodNodes[edge.target.id] = [];
      }

      if (edge.source.id !== edge.target.id) {
        this.neighbourhoodNodes[edge.source.id].push(edge.target);
        this.neighbourhoodNodes[edge.target.id].push(edge.source);
      }

      if (!this.neighbourhoodEdges[edge.source.id]) {
        this.neighbourhoodEdges[edge.source.id] = [];
      }

      if (!this.neighbourhoodEdges[edge.target.id]) {
        this.neighbourhoodEdges[edge.target.id] = [];
      }

      this.neighbourhoodEdges[edge.source.id].push(edge);
      this.neighbourhoodEdges[edge.target.id].push(edge);
    }
  }

  private _indexingNodes(): void {
    this._indexedNodes = {};

    for (const node of this._nodes) {
      if (this._indexedNodes[node.id]) {
        /* tslint:disable-next-line no-console */
        console.error(`Node with id ${node.id} already exists`);
      }

      this._indexedNodes[node.id] = node;
    }
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

    if (this._arrowsLayer) {
      this._arrowsLayer.hide();
    }
    if (this._labelsLayer) {
      this._labelsLayer.hide();
    }
    if (this._nodesLayer) {
      this._nodesLayer.setSilent(true);
    }

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

        if (this._arrowsLayer) {
          this._arrowsLayer.show();
        }
        if (this._labelsLayer && this.options.showLabels) {
          this._labelsLayer.show();
        }
        if (this._nodesLayer) {
          this._nodesLayer.setSilent(false);
        }

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
