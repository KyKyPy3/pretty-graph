(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("three"));
	else if(typeof define === 'function' && define.amd)
		define("prettyGraphCore", ["three"], factory);
	else if(typeof exports === 'object')
		exports["prettyGraphCore"] = factory(require("three"));
	else
		root["prettyGraphCore"] = factory(root["three"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_three__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/lib/arrows/arrows.ts":
/*!**********************************!*\
  !*** ./src/lib/arrows/arrows.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ArrowsLayer": () => (/* binding */ ArrowsLayer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders */ "./src/lib/arrows/shaders.ts");


class ArrowsLayer extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor(graph) {
        super();
        this._activeEdges = [];
        this._graph = graph;
    }
    hide() {
        if (this._arrowMesh) {
            this._arrowMesh.visible = false;
        }
    }
    show() {
        if (this._arrowMesh) {
            this._arrowMesh.visible = true;
        }
    }
    recalculate() {
        if (!this._arrowGeometry) {
            return;
        }
        const { vertices } = this._calculateArrowData();
        this._arrowGeometry.boundingSphere = this._computeBoundingSphere(vertices);
        const newPosition = new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(vertices, this._arrowGeometry.attributes.position.itemSize, this._arrowGeometry.attributes.position.normalized);
        this._arrowGeometry.setAttribute('position', newPosition);
    }
    draw() {
        var _a;
        this._clearInternalState();
        this._arrowGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const { vertices, colors } = this._calculateArrowData();
        this._arrowGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(vertices, 2)
            .setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage));
        this._arrowGeometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(colors, 3)
            .setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage));
        this._arrowGeometry.computeVertexNormals();
        this._arrowGeometry.boundingSphere = this._computeBoundingSphere(vertices);
        this._arrowMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({
            depthTest: false,
            fragmentShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.fragmentShader,
            side: three__WEBPACK_IMPORTED_MODULE_0__.BackSide,
            transparent: false,
            vertexColors: true,
            vertexShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.vertexShader,
        });
        this._arrowMaterial.name = 'ArrowMaterial';
        this._arrowMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(this._arrowGeometry, this._arrowMaterial);
        (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.add(this._arrowMesh);
    }
    dispose() {
        this._clearInternalState();
    }
    clearActiveArrowOfEdges() {
        this.setArrowsColor(this._activeEdges);
    }
    setActiveArrowByEdges(edges) {
        this._activeEdges = edges;
        this.setArrowsColor(this._activeEdges, this._graph.dataConfig.colorsEvents.selectEdge);
    }
    setDeactivatedArrowByEdges(edges) {
        edges.map(x => this._activeEdges.indexOf(x))
            .forEach(index => {
            this._activeEdges.splice(index, 1);
        });
        this.setArrowsColor(edges);
    }
    setArrowsColor(edges, newColor) {
        var _a, _b, _c;
        if (!edges.length) {
            return;
        }
        const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        for (const edge of edges) {
            if (newColor) {
                color.setStyle(newColor);
            }
            else {
                color.setStyle(edge.color);
            }
            const index = edge.__arrowIndex / 3;
            (_a = this._arrowGeometry) === null || _a === void 0 ? void 0 : _a.attributes.color.setXYZ(index, color.r, color.g, color.b);
            (_b = this._arrowGeometry) === null || _b === void 0 ? void 0 : _b.attributes.color.setXYZ(index + 1, color.r, color.g, color.b);
            (_c = this._arrowGeometry) === null || _c === void 0 ? void 0 : _c.attributes.color.setXYZ(index + 2, color.r, color.g, color.b);
        }
        if (this._arrowGeometry) {
            this._arrowGeometry.attributes.color.needsUpdate = true;
        }
    }
    _clearInternalState() {
        var _a;
        if (this._arrowMesh) {
            (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.remove(this._arrowMesh);
            this._arrowMesh = null;
        }
        if (this._arrowMaterial) {
            this._arrowMaterial.dispose();
            this._arrowMaterial = null;
        }
        if (this._arrowGeometry) {
            this._arrowGeometry.dispose();
            this._arrowGeometry = null;
        }
    }
    _calculateArrowData() {
        const edges = this._graph._edges;
        const vertices = new Float32Array(edges.length * 6);
        const colors = new Float32Array(edges.length * 9);
        const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        for (let i = 0, i2 = 0, c3 = 0, l = edges.length; i < l; i++, i2 += 6, c3 += 9) {
            if (edges[i].arrow === 'none') {
                continue;
            }
            let source;
            let target;
            if (!edges[i].arrow || edges[i].arrow === 'target') {
                source = edges[i].source;
                target = edges[i].target;
            }
            else {
                source = edges[i].target;
                target = edges[i].source;
            }
            edges[i].__arrowIndex = c3;
            color.setStyle(edges[i].color);
            const arrowVertices = this._calculateArrowVertices(edges[i].size, source, target);
            // Add vertices
            vertices[i2 + 0] = arrowVertices.pointBelow[0] || 0;
            vertices[i2 + 1] = arrowVertices.pointBelow[1] || 0;
            vertices[i2 + 2] = arrowVertices.pointOnLine[0] || 0;
            vertices[i2 + 3] = arrowVertices.pointOnLine[1] || 0;
            vertices[i2 + 4] = arrowVertices.pointAbove[0] || 0;
            vertices[i2 + 5] = arrowVertices.pointAbove[1] || 0;
            // colors
            colors[c3 + 0] = color.r;
            colors[c3 + 1] = color.g;
            colors[c3 + 2] = color.b;
            colors[c3 + 3] = color.r;
            colors[c3 + 4] = color.g;
            colors[c3 + 5] = color.b;
            colors[c3 + 6] = color.r;
            colors[c3 + 7] = color.g;
            colors[c3 + 8] = color.b;
        }
        return {
            colors,
            vertices,
        };
    }
    _calculateArrowVertices(size, sourcePoint, targetPoint) {
        const radius = (targetPoint.size / 2) * this._graph.nodeScalingFactor - 0.4;
        const dx = sourcePoint.x - targetPoint.x;
        const dy = sourcePoint.y - targetPoint.y;
        const angle = Math.atan2(dy, dx);
        const vNorm = Math.sqrt(dx * dx + dy * dy);
        const sourceX = targetPoint.x + radius * Math.cos(angle);
        const sourceY = targetPoint.y + radius * Math.sin(angle);
        const scalingCornerFactor = size < 6 ? 6 : size;
        const scalingOnLineFactor = size < 6 ? 12 : 1.5 * size;
        // point on line at distance
        const pointOnLine = [sourceX + scalingOnLineFactor * dx / vNorm, sourceY + scalingOnLineFactor * dy / vNorm];
        // endpoints of arrows at length above point (the distance from the original line
        const pointBelow = [pointOnLine[0] - scalingCornerFactor * -dy / vNorm, pointOnLine[1] - scalingCornerFactor * dx / vNorm];
        const pointAbove = [pointOnLine[0] + scalingCornerFactor * -dy / vNorm, pointOnLine[1] + scalingCornerFactor * dx / vNorm];
        return {
            pointAbove,
            pointBelow,
            pointOnLine: [sourceX, sourceY],
        };
    }
    _computeBoundingSphere(positions) {
        const boundingSphere = new three__WEBPACK_IMPORTED_MODULE_0__.Sphere();
        if (positions) {
            const vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
            const center = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(boundingSphere.center.x, boundingSphere.center.y);
            let maxRadiusSq = 0;
            for (let i = 0, il = positions.length; i < il; i += 2) {
                vector.fromArray(positions, i);
                maxRadiusSq = Math.max(maxRadiusSq, center.distanceToSquared(vector));
            }
            boundingSphere.radius = Math.sqrt(maxRadiusSq);
            if (isNaN(boundingSphere.radius)) {
                /* tslint:disable-next-line no-console */
                console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
            }
        }
        return boundingSphere;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hcnJvd3MvYXJyb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsSUFBSSxFQUNKLGNBQWMsRUFDZCxNQUFNLEVBQ04sT0FBTyxHQUNSLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHekQsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0lBVzlDLFlBQVksS0FBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUxGLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBTy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNqQztJQUNILENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLElB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LFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEQsU0FBUztZQUNULE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVc7UUFDNUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO1FBRTVFLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdB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

/***/ }),

/***/ "./src/lib/arrows/shaders.ts":
/*!***********************************!*\
  !*** ./src/lib/arrows/shaders.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vertexShader": () => (/* binding */ vertexShader),
/* harmony export */   "fragmentShader": () => (/* binding */ fragmentShader)
/* harmony export */ });
const vertexShader = `
  precision mediump float;

  attribute vec3 translation;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;
const fragmentShader = `
  precision highp float;

  varying vec3 vColor;

  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvYXJyb3dzL3NoYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFXOzs7Ozs7Ozs7Ozs7O0NBYW5DLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQVc7Ozs7Ozs7O0NBUXJDLENBQUMifQ==

/***/ }),

/***/ "./src/lib/core.ts":
/*!*************************!*\
  !*** ./src/lib/core.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PretyGraph": () => (/* binding */ PretyGraph)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ "./src/lib/emitter.ts");
/* harmony import */ var _arrows_arrows__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./arrows/arrows */ "./src/lib/arrows/arrows.ts");
/* harmony import */ var _edges_edges__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edges/edges */ "./src/lib/edges/edges.ts");
/* harmony import */ var _labelsLayer_labels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./labelsLayer/labels */ "./src/lib/labelsLayer/labels.ts");
/* harmony import */ var _nodes_nodes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./nodes/nodes */ "./src/lib/nodes/nodes.ts");
/* harmony import */ var _models__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models */ "./src/lib/models/index.ts");
/* harmony import */ var three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! three/examples/jsm/postprocessing/EffectComposer */ "../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js");
/* harmony import */ var three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! three/examples/jsm/postprocessing/RenderPass */ "../../node_modules/three/examples/jsm/postprocessing/RenderPass.js");









class PretyGraph {
    constructor(options) {
        this.onEvent = new _emitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.nodeScalingFactor = 5.0;
        this.animationTime = 500;
        this.neighbourhoodNodes = {};
        this.neighbourhoodEdges = {};
        this.dataConfig = {
            showLabels: true,
            animate: false,
            locate: false,
            colorsEvents: {
                hoverEdge: '#547DE4',
                selectEdge: '#547DE4',
                hoverNode: '#547DE4',
                selectNode: '#547DE4',
            },
        };
        this._container = document.body;
        this._labelsLayer = null;
        this._nodes = [];
        this._edges = [];
        this._indexedNodes = {};
        this._options = {};
        this._fov = 75;
        this._far = 10000;
        this._center = null;
        this._dragInProgress = false;
        this._dragging = false;
        this._plane = new three__WEBPACK_IMPORTED_MODULE_0__.Plane();
        this._raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster();
        this._intersection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this._offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this._arrowsLayer = null;
        this._edgesLayer = null;
        this._nodesLayer = null;
        this._startPoint = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._pointTopLeft = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._pointBottomRight = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._resizeTimeout = 0;
        this._labelHidedOnMove = false;
        this._selectMode = false;
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
        this.render();
        if (!this.options.disableLabels) {
            this._labelsLayer = new _labelsLayer_labels__WEBPACK_IMPORTED_MODULE_4__.LabelsLayer(this);
            if (!this.options.showLabels) {
                this._labelsLayer.hide();
            }
        }
        this._arrowsLayer = new _arrows_arrows__WEBPACK_IMPORTED_MODULE_2__.ArrowsLayer(this);
        this._edgesLayer = new _edges_edges__WEBPACK_IMPORTED_MODULE_3__.EdgesLayer(this);
        this._nodesLayer = new _nodes_nodes__WEBPACK_IMPORTED_MODULE_5__.NodesLayer(this);
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
                this.render();
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
        if (this._iframe.contentWindow) {
            this._iframe.contentWindow.addEventListener('resize', this._resizeHandler, false);
        }
    }
    set options(options) {
        // Добавить мердж с дефолтными опциями
        this._options = options;
    }
    get options() {
        return this._options;
    }
    resize() {
        this._resizeHandler();
    }
    zoomIn() {
        return this._controls.zoomIn();
    }
    zoomOut() {
        return this._controls.zoomOut();
    }
    showLabels() {
        if (this._labelsLayer) {
            this._labelsLayer.show();
        }
    }
    hideLabels() {
        if (this._labelsLayer) {
            this._labelsLayer.hide();
        }
    }
    render() {
        this._composer.render();
    }
    activateSelectMode() {
        this._selectMode = true;
        this._controls.enabled = false;
        this.onEvent.emit('changeMode', { mode: 'select' });
    }
    deactivateSelectMode() {
        this._selectMode = false;
        this._controls.enabled = true;
        this.onEvent.emit('changeMode', { mode: 'view' });
    }
    clearSelectedEdges() {
        var _a, _b, _c;
        (_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.clearActiveEdges();
        (_b = this._arrowsLayer) === null || _b === void 0 ? void 0 : _b.clearActiveArrowOfEdges();
        (_c = this._nodesLayer) === null || _c === void 0 ? void 0 : _c.clearHoveredNodes();
        this.render();
    }
    toggleLabels() {
        if (this._labelsLayer) {
            this._labelsLayer.toggleLabels();
        }
    }
    setData(data, options = this.dataConfig) {
        this.dataConfig = options;
        // Клонируем переданные узлы
        this._nodes = JSON.parse(JSON.stringify(data.nodes));
        const lastIndexedNodes = JSON.parse(JSON.stringify(this._indexedNodes));
        this._indexingNodes();
        // rkjybhetv ht,hf
        this._edges = JSON.parse(JSON.stringify(data.links));
        // Мапим ребра на склонированные узлы
        this._edges.forEach(edge => {
            if (edge.target) {
                edge.target = this._indexedNodes[edge.target.id];
            }
            if (edge.source) {
                edge.source = this._indexedNodes[edge.source.id];
            }
        });
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
                }
                else {
                    this._indexedNodes[k].toX = this._indexedNodes[k].x;
                    this._indexedNodes[k].toY = this._indexedNodes[k].y;
                    if (this._center && this._indexedNodes[k].id === this._center.id) {
                        this._indexedNodes[k].fromX = this._center.x;
                        this._indexedNodes[k].fromY = this._center.y;
                        this._indexedNodes[k].x = this._center.x;
                        this._indexedNodes[k].y = this._center.y;
                    }
                    else {
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
            this.render();
            requestAnimationFrame(this._animate.bind(this));
        }
        else {
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
            this.render();
        }
        if (this._camera && this._nodesLayer) {
            const size = this._nodesLayer.getSize();
            const maxDim = Math.max(size.y, size.x);
            if (maxDim) {
                this._camera.near = 150;
                this._camera.far = maxDim * 10;
            }
            else {
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
    getActiveNodes() {
        if (this._nodesLayer) {
            return this._nodesLayer.activeNodes;
        }
        return [];
    }
    getNodes() {
        if (this._nodes) {
            return JSON.parse(JSON.stringify(this._nodes));
        }
        return [];
    }
    getNodeByID(nodeID) {
        const node = this._indexedNodes[nodeID];
        const coordinates = this.translateCoordinates(node.x, node.y);
        return {
            node,
            ...coordinates,
            scale: this._controls.scale,
        };
    }
    getScreenshot() {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({
            premultipliedAlpha: false,
            preserveDrawingBuffer: true,
            antialias: true,
            alpha: true,
        });
        if (this._scene && this._camera) {
            renderer.setSize(this._container.clientWidth, this._container.clientHeight);
            renderer.setPixelRatio(1);
            renderer.render(this._scene, this._camera);
        }
        const screenshotCanvas = document.createElement('canvas');
        screenshotCanvas.width = this._container.clientWidth;
        screenshotCanvas.height = this._container.clientHeight;
        const canvasCtx = screenshotCanvas.getContext('2d');
        if (canvasCtx) {
            canvasCtx.fillStyle = 'white';
            canvasCtx.fillRect(0, 0, screenshotCanvas.width, screenshotCanvas.height);
            canvasCtx.drawImage(renderer.getContext().canvas, 0, 0);
            if (this._labelsLayer) {
                this._labelsLayer.draw(canvasCtx);
            }
        }
        const image = screenshotCanvas.toDataURL('image/png');
        return image;
    }
    destroy() {
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
    translateCoordinates(x, y) {
        const vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, 0);
        if (this._camera && this._renderer) {
            const widthHalf = 0.5 * this._renderer.getContext().canvas.width;
            const heightHalf = 0.5 * this._renderer.getContext().canvas.height;
            vector.project(this._camera);
            vector.x = (vector.x * widthHalf) + widthHalf;
            vector.y = -(vector.y * heightHalf) + heightHalf;
        }
        return {
            x: vector.x,
            y: vector.y,
        };
    }
    translateCoordinatesFromCamera(x, y) {
        const vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, 0);
        return {
            x: vector.x,
            y: -vector.y,
        };
    }
    _addControlsListeners() {
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
        this._onBlurListener = this._onBlur.bind(this);
        this._controls.addEventListener('blur', this._onBlurListener);
        this.onEvent.on('nodeHover', this._onNodeHover.bind(this));
        this.onEvent.on('nodeUnhover', this._onNodeUnhover.bind(this));
        this.onEvent.on('workspaceClick', this._onWorkspaceClick.bind(this));
    }
    _removeControlsListeners() {
        this._controls.removeEventListener('scale', this._onScaleListener);
        this._controls.removeEventListener('pan', this._onPanListener);
        this._controls.removeEventListener('mousemove', this._onMouseMoveListener);
        this._controls.removeEventListener('contextmenu', this._onContextMenuListener);
        this._controls.removeEventListener('dblclick', this._onDblClickListener);
        this._controls.removeEventListener('click', this._onClickListener);
        this._controls.removeEventListener('mousedown', this._onMouseDownListener);
        this._controls.removeEventListener('mouseup', this._onMouseUpListener);
        this._controls.removeEventListener('rotate', this._onRotateListener);
        this._controls.removeEventListener('blur', this._onBlurListener);
        this.onEvent.removeAllListeners();
    }
    _onWorkspaceClick() {
        if (this._nodesLayer) {
            this._nodesLayer.clearActiveNodes();
        }
        if (this._edgesLayer) {
            this._edgesLayer.clearHoveredEdges();
        }
        if (this._arrowsLayer) {
            this._arrowsLayer.recalculate();
        }
        this.render();
    }
    _onNodeHover(data) {
        const { node } = data;
        const hoveredEdges = this.neighbourhoodEdges[node.id];
        if (this._edgesLayer) {
            this._edgesLayer.setHoveredEdges(hoveredEdges);
        }
        if (this._arrowsLayer) {
            this._arrowsLayer.recalculate();
        }
        this.render();
    }
    _onNodeUnhover() {
        if (this._edgesLayer) {
            this._edgesLayer.clearHoveredEdges();
        }
        if (this._arrowsLayer) {
            this._arrowsLayer.recalculate();
        }
        this.render();
    }
    _onRotate({ delta }) {
        if (this._scene) {
            this._scene.rotation.z += delta * 0.001;
        }
        this.render();
    }
    _onMouseMove({ position, event }) {
        var _a;
        if (this._dragging && this._camera) {
            // dragging node
            const mouse = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
            mouse.x = (position.x / this._container.clientWidth) * 2 - 1;
            mouse.y = -(position.y / this._container.clientHeight) * 2 + 1;
            let newPos = {
                x: 0,
                y: 0,
            };
            if (this._nodesLayer && this._nodesLayer.hoveredNode) {
                if (this._labelsLayer && !this._labelsLayer.isHidden()) {
                    this._labelHidedOnMove = true;
                    this._labelsLayer.hide();
                }
                newPos = {
                    x: this._nodesLayer.hoveredNode ? this._nodesLayer.hoveredNode.x : 0,
                    y: this._nodesLayer.hoveredNode ? this._nodesLayer.hoveredNode.y : 0,
                };
                if (!this._dragInProgress) {
                    const worldVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
                    this._camera.getWorldDirection(worldVector);
                    this._plane.setFromNormalAndCoplanarPoint(worldVector, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
                    this._raycaster.setFromCamera(mouse, this._camera);
                    this._raycaster.ray.intersectPlane(this._plane, this._intersection);
                    this._offset.copy(this._intersection)
                        .sub(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
                    newPos = this._intersection.sub(this._offset)
                        .clone();
                    this._dragInProgress = true;
                }
                else {
                    this._raycaster.setFromCamera(mouse, this._camera);
                    this._raycaster.ray.intersectPlane(this._plane, this._intersection);
                    newPos = this._intersection.sub(this._offset)
                        .clone();
                }
                if (this._nodesLayer.hoveredNode !== null) {
                    const offset = { x: 0, y: 0 };
                    offset.x = this._nodesLayer.hoveredNode.x - newPos.x;
                    offset.y = this._nodesLayer.hoveredNode.y - newPos.y;
                    let nodes;
                    if (this._nodesLayer && this._nodesLayer.activeNodes.length) {
                        const hasHoveredNode = this._nodesLayer.activeNodes.find(n => {
                            if (this._nodesLayer && this._nodesLayer.hoveredNode) {
                                return n.id === this._nodesLayer.hoveredNode.id;
                            }
                            return false;
                        });
                        if (hasHoveredNode) {
                            nodes = this._nodesLayer.activeNodes;
                        }
                        else {
                            nodes = [this._nodesLayer.hoveredNode, ...this.neighbourhoodNodes[this._nodesLayer.hoveredNode.id]];
                        }
                    }
                    else {
                        nodes = [this._nodesLayer.hoveredNode];
                    }
                    this._nodesLayer.setNodePosition(nodes, offset);
                    if (this._labelsLayer) {
                        this._labelsLayer.setLabelsPositionForNodes(nodes, offset);
                    }
                }
                const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
                this.onEvent.emit('nodeMoving', {
                    node: this._nodesLayer.hoveredNode,
                    activeNodes: this._nodesLayer.activeNodes,
                    ...coordinates,
                    scale: this._controls.scale,
                });
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
        }
        else {
            if (this._renderer && !this._renderer.domElement.contains(event.target)) {
                return;
            }
            if (this._selectMode) {
                this._pointBottomRight.x = Math.max(this._startPoint.x, position.x);
                this._pointBottomRight.y = Math.max(this._startPoint.y, position.y);
                this._pointTopLeft.x = Math.min(this._startPoint.x, position.x);
                this._pointTopLeft.y = Math.min(this._startPoint.y, position.y);
                this._selectBox.style.left = `${this._pointTopLeft.x}px`;
                this._selectBox.style.top = `${this._pointTopLeft.y}px`;
                this._selectBox.style.width = `${this._pointBottomRight.x - this._pointTopLeft.x}px`;
                this._selectBox.style.height = `${this._pointBottomRight.y - this._pointTopLeft.y}px`;
            }
            else {
                if (this._nodesLayer && !this._nodesLayer.testNode(position)) {
                    (_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.testEdge(position);
                }
                else if (this._edgesLayer) {
                    this._edgesLayer.resetHoverEdge();
                }
                if (this._arrowsLayer) {
                    this._arrowsLayer.recalculate();
                }
            }
        }
        this.render();
    }
    _onMouseUp({ event, subData }) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        if (this._selectMode) {
            this._selectMode = false;
            this.onEvent.emit('changeMode', { mode: 'view' });
            if (this._selectBox && this._selectBox.parentElement) {
                this._selectBox.parentElement.removeChild(this._selectBox);
            }
            if (this._nodesLayer && this._camera) {
                const nodes = {};
                this._nodesLayer.refreshBuffer();
                for (let { x } = this._pointTopLeft; x < this._pointBottomRight.x; x++) {
                    for (let { y } = this._pointTopLeft; y < this._pointBottomRight.y; y++) {
                        const node = this._nodesLayer.pickNode({ x, y });
                        if (node) {
                            nodes[node.id] = node;
                        }
                    }
                }
                if (Object.values(nodes).length) {
                    if (this._nodesLayer) {
                        this._nodesLayer.setActiveNodes(Object.values(nodes), _models__WEBPACK_IMPORTED_MODULE_6__.pgActivateNodeMode.ByGroup);
                    }
                    this.render();
                }
            }
        }
        else {
            if (this._nodesLayer && !this._dragInProgress) {
                if (this._nodesLayer.hoveredNode) {
                    if (event.ctrlKey) {
                        this._nodesLayer.setActiveNodes([this._nodesLayer.hoveredNode, ...this._nodesLayer.activeNodes], _models__WEBPACK_IMPORTED_MODULE_6__.pgActivateNodeMode.BySteps);
                    }
                    else {
                        const activeNodes = [this._nodesLayer.hoveredNode, ...this.neighbourhoodNodes[this._nodesLayer.hoveredNode.id]];
                        this._nodesLayer.setActiveNodes(activeNodes, _models__WEBPACK_IMPORTED_MODULE_6__.pgActivateNodeMode.Single);
                        if (this._edgesLayer) {
                            this._edgesLayer.clearHoveredEdges();
                            const hoveredEdges = this.neighbourhoodEdges[this._nodesLayer.hoveredNode.id];
                            this._edgesLayer.setHoveredEdges(hoveredEdges);
                        }
                        if (this._arrowsLayer) {
                            this._arrowsLayer.recalculate();
                        }
                    }
                }
                this.render();
            }
            if (((_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.hoveredEdge)
                && ((_b = event.sourceEvent) === null || _b === void 0 ? void 0 : _b.button) === 0
                && !subData.cameraMoved) {
                const { hoveredEdge } = this._edgesLayer;
                this._edgesLayer.clearActiveEdges();
                (_c = this._arrowsLayer) === null || _c === void 0 ? void 0 : _c.clearActiveArrowOfEdges();
                if (hoveredEdge.__active) {
                    (_d = this._edgesLayer) === null || _d === void 0 ? void 0 : _d.setDeactivatedEdges([hoveredEdge]);
                    (_e = this._arrowsLayer) === null || _e === void 0 ? void 0 : _e.setDeactivatedArrowByEdges([hoveredEdge]);
                    // Деактивируем ноды ребра
                    (_f = this._nodesLayer) === null || _f === void 0 ? void 0 : _f.clearHoveredNodes();
                    this.onEvent.emit('selectEdge', { selectedEdge: undefined });
                }
                else {
                    (_g = this._nodesLayer) === null || _g === void 0 ? void 0 : _g.clearActiveNodes();
                    (_h = this._edgesLayer) === null || _h === void 0 ? void 0 : _h.setActiveEdges([hoveredEdge]);
                    (_j = this._arrowsLayer) === null || _j === void 0 ? void 0 : _j.setActiveArrowByEdges([hoveredEdge]);
                    (_k = this._nodesLayer) === null || _k === void 0 ? void 0 : _k.setHoveredNodes([hoveredEdge.source, hoveredEdge.target]);
                    this.onEvent.emit('selectEdge', { selectedEdge: hoveredEdge });
                }
                if (this._arrowsLayer) {
                    this._arrowsLayer.recalculate();
                }
                this.render();
            }
            if (this._nodesLayer && !this._nodesLayer.hoveredNode && this._edgesLayer && !this._edgesLayer.hoveredEdge) {
                this.onEvent.emit('workspaceClick');
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
    _onMouseDown({ event, position }) {
        if (this._nodesLayer && this._nodesLayer.hoveredNode !== null && event.buttons === 1) {
            this._controls.enabled = false;
            this._dragging = true;
        }
        else if (this._edgesLayer && this._edgesLayer.hoveredEdge !== null && event.buttons === 1) {
            this._controls.enabled = true;
        }
        else if (this._selectMode || event.shiftKey) {
            if (!this._selectMode) {
                this.activateSelectMode();
            }
            if (this._nodesLayer) {
                this._nodesLayer.clearActiveNodes();
                this.render();
            }
            if (this._renderer && this._renderer.domElement && this._renderer.domElement.parentElement) {
                this._renderer.domElement.parentElement.appendChild(this._selectBox);
            }
            this._selectBox.style.left = `${position.x}px`;
            this._selectBox.style.top = `${position.y}px`;
            this._selectBox.style.width = '0px';
            this._selectBox.style.height = '0px';
            this._selectBox.style.zIndex = '10001';
            this._selectBox.style.backgroundColor = 'rgba(75, 160, 255, 0.3)';
            this._selectBox.style.position = 'absolute';
            this._selectBox.style.border = '1px solid red';
            this._selectBox.style.pointerEvents = 'none';
            this._startPoint = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
            this._pointBottomRight = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
            this._pointTopLeft = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
            this._startPoint.x = position.x;
            this._startPoint.y = position.y;
        }
    }
    _onClick(e) {
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeClick', {
                node: this._nodesLayer.hoveredNode,
                ...coordinates,
                scale: this._controls.scale,
                mouseEvent: e.event,
            });
        }
        if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('edgeClick', {
                edge: this._edgesLayer.hoveredEdge,
                scale: this._controls.scale,
            });
        }
    }
    _onDblClick() {
        if (this._nodesLayer && this._nodesLayer.hoveredNode !== null) {
            const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeDblClick', {
                node: this._nodesLayer.hoveredNode,
                ...coordinates,
                scale: this._controls.scale,
            });
        }
    }
    _onContextMenu(position) {
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeContextMenu', {
                node: this._nodesLayer.hoveredNode,
                ...coordinates,
                scale: this._controls.scale,
            });
        }
        else if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('edgeContextMenu', {
                edge: this._edgesLayer.hoveredEdge,
                coordinates: position,
                scale: this._controls.scale,
            });
        }
    }
    _onPan() {
        this.render();
        if (this._labelsLayer) {
            this._labelsLayer.recalculate();
        }
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeScaling', {
                node: this._nodesLayer.hoveredNode,
                ...coordinates,
                scale: this._controls.scale,
            });
        }
        else {
            this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale });
        }
    }
    _onBlur({ event }) {
        this._resetHoveredElements();
        this.onEvent.emit('blur', event);
    }
    _onScale(event) {
        if (this._nodesLayer) {
            this._nodesLayer.onScale(event.scale);
        }
        if (this._edgesLayer) {
            this._edgesLayer.onScale(event.scale);
        }
        this.render();
        if (this._labelsLayer) {
            this._labelsLayer.recalculate();
        }
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this.translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeScaling', {
                node: this._nodesLayer.hoveredNode,
                ...coordinates,
                scale: this._controls.scale,
                canZoom: event.canZoom,
                zoomDirection: event.zoomDirection,
            });
        }
        else {
            this.onEvent.emit('workspaceViewChanged', {
                scale: this._controls.scale,
                canZoom: event.canZoom,
                zoomDirection: event.zoomDirection,
            });
        }
    }
    _disposeRenderer() {
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
    _setupScene() {
        this._scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this._scene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(this.options.backgroundColor || 'white');
    }
    _setupCamera() {
        this._camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(this._fov, this._container.clientWidth / this._container.clientHeight, 0.1, this._far);
        this._camera.lookAt(0, 0, 0);
    }
    _setupRenderer() {
        this._renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        // Add support for retina displays
        this._renderer.setPixelRatio(1);
        // Set canvas dimension
        this._renderer.setSize(this._container.clientWidth, this._container.clientHeight, false);
        this._renderer.domElement.style.position = 'absolute';
        this._renderer.domElement.style.userSelect = 'none';
        // postprocessing
        this._composer = new three_examples_jsm_postprocessing_EffectComposer__WEBPACK_IMPORTED_MODULE_7__.EffectComposer(this._renderer);
        if (this._scene && this._camera) {
            const renderPass = new three_examples_jsm_postprocessing_RenderPass__WEBPACK_IMPORTED_MODULE_8__.RenderPass(this._scene, this._camera);
            this._composer.addPass(renderPass);
        }
        // Add the canvas to the DOM
        this._container.appendChild(this._renderer.domElement);
        // Add tabIndex for focusable canvas
        this._renderer.domElement.setAttribute('tabIndex', '0');
        this._renderer.domElement.style.outline = 'none';
    }
    _collectNeighbourhoods() {
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
    _indexingNodes() {
        this._indexedNodes = {};
        for (const node of this._nodes) {
            if (this._indexedNodes[node.id]) {
                /* tslint:disable-next-line no-console */
                console.error(`Node with id ${node.id} already exists`);
            }
            this._indexedNodes[node.id] = node;
        }
    }
    _moveNodes(last = false) {
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
    _getRandomFromRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    _interpolate(val) {
        let newValue = val;
        /* tslint:disable-next-line no-conditional-assignment */
        if ((newValue *= 2) < 1) {
            return 0.5 * newValue * newValue;
        }
        return -0.5 * (--newValue * (newValue - 2) - 1);
    }
    _animate() {
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
                this.render();
            }
            else {
                p = this._interpolate(p);
                for (const k in this._indexedNodes) {
                    if (this._indexedNodes[k]) {
                        this._indexedNodes[k].x = this._indexedNodes[k].toX * p + this._indexedNodes[k].fromX * (1 - p);
                        this._indexedNodes[k].y = this._indexedNodes[k].toY * p + this._indexedNodes[k].fromY * (1 - p);
                    }
                }
                // ADD change node positions
                this._moveNodes();
                this.render();
                requestAnimationFrame(step);
            }
        };
        step();
    }
    _resetHoveredElements() {
        var _a;
        (_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.resetHoverEdge();
        if (this._nodesLayer) {
            this._nodesLayer.hoveredNode = null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLGFBQWEsR0FDZCxNQUFNLE9BQU8sQ0FBQztBQUVmLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUNMLGtCQUFrQixHQUNuQixNQUFNLFVBQVUsQ0FBQztBQUNsQixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDbEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBRTFFLE1BQU0sT0FBTyxVQUFVO0lBOEdyQixZQUFZLE9BQXFCO1FBNUcxQixZQUFPLEdBQWlCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFM0Msc0JBQWlCLEdBQVcsR0FBRyxDQUFDO1FBRWhDLGtCQUFhLEdBQVcsR0FBRyxDQUFDO1FBRTVCLHVCQUFrQixHQUEyQixFQUFFLENBQUM7UUFFaEQsdUJBQWtCLEdBQTJCLEVBQUUsQ0FBQztRQUVoRCxlQUFVLEdBQXFCO1lBQ3BDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFLEtBQUs7WUFDYixZQUFZLEVBQUU7Z0JBQ1osU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLFVBQVUsRUFBRSxTQUFTO2dCQUNyQixTQUFTLEVBQUUs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

/***/ }),

/***/ "./src/lib/edges/edges.ts":
/*!********************************!*\
  !*** ./src/lib/edges/edges.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EdgesLayer": () => (/* binding */ EdgesLayer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _externals_lines_Line2_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../externals/lines/Line2.js */ "./externals/lines/Line2.js");
/* harmony import */ var _externals_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../externals/lines/LineMaterial.js */ "./externals/lines/LineMaterial.js");
/* harmony import */ var _externals_lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../externals/lines/LineSegmentsGeometry.js */ "./externals/lines/LineSegmentsGeometry.js");




class EdgesLayer extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor(graph) {
        super();
        this._hoveredEdge = null;
        this._hoveredEdgeID = -1;
        this._hoveredEdges = [];
        this._activeEdges = [];
        this._graph = graph;
        this._pickingTexture = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget(this._graph._container.clientWidth, this._graph._container.clientHeight);
        this._pickingTexture.texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter;
        this._pickingLineScene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this._pickingLineScene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000);
    }
    get hoveredEdge() {
        return this._hoveredEdge;
    }
    onResize() {
        if (this._lineMaterial) {
            this._lineMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);
            this._lineMaterial.needsUpdate = true;
        }
        if (this._pickingTexture) {
            this._pickingTexture.setSize(this._graph._container.clientWidth, this._graph._container.clientHeight);
        }
    }
    onScale(scale) {
        if (this._lineMaterial) {
            this._lineMaterial.uniforms.scale.value = scale;
            this._lineMaterial.needsUpdate = true;
        }
        if (this._linePickingMaterial) {
            this._linePickingMaterial.uniforms.scale.value = scale;
            this._linePickingMaterial.needsUpdate = true;
        }
    }
    draw() {
        this._disposeInternal();
        const linesData = this._constructLines(this._graph._edges);
        this._constructMesh(linesData);
        this._constructPickingMesh(linesData);
    }
    dispose() {
        this._disposeInternal();
        if (this._pickingLineScene) {
            this._pickingLineScene = null;
        }
        if (this._pickingTexture) {
            this._pickingTexture.dispose();
            this._pickingTexture = null;
        }
    }
    setHoveredEdges(edges) {
        this._hoveredEdges = edges.filter(edge => !edge.__hovered);
        this._hoveredEdges.forEach(edge => edge.__hovered = true);
        this._setEdgesSize(this._hoveredEdges, 1.3, 1);
    }
    clearHoveredEdges() {
        const unhoveringEdges = this._hoveredEdges.filter(edge => edge.__hovered);
        this._setEdgesSize(unhoveringEdges, 1, 1.3);
        this._hoveredEdges.forEach(edge => edge.__hovered = false);
        this._hoveredEdges = [];
    }
    setActiveEdges(edges) {
        this._activeEdges = edges.filter(edge => !edge.__active);
        this._activeEdges.forEach(edge => edge.__active = true);
        this._setEdgesColor(this._activeEdges, this._graph.dataConfig.colorsEvents.selectEdge);
    }
    setDeactivatedEdges(edges) {
        const deactivateEdges = edges.filter(edges => edges.__active);
        deactivateEdges.forEach(edge => edge.__active = false);
        this._setEdgesColor(deactivateEdges);
        this._activeEdges = this._activeEdges.filter(el => edges.some(el) === false);
    }
    clearActiveEdges() {
        const deactivatingEdges = this._activeEdges.filter(edge => edge.__active === true && edge !== this.hoveredEdge);
        this._setEdgesSize(deactivatingEdges, 1, 1.3);
        this._setEdgesColor(deactivatingEdges);
        deactivatingEdges.forEach(edge => edge.__active = false);
        this._activeEdges = [];
        this.recalculate();
        this.recalculatePicking();
    }
    _setEdgesSize(edges, sizeMul, sizeDiv) {
        if (!edges.length) {
            return;
        }
        for (const edge of edges) {
            if (edge._lineSizeRange) {
                const count = edge._lineSizeRange[1] - edge._lineSizeRange[0];
                edge.size = (edge.size * sizeMul) / sizeDiv;
                if (count > 1) {
                    for (let i = edge._lineSizeRange[0]; i < edge._lineSizeRange[1]; i++) {
                        this._lineGeometry.attributes.linewidth.setX(i, edge.size);
                    }
                }
                else {
                    this._lineGeometry.attributes.linewidth.setX(edge._lineSizeRange[0], edge.size);
                }
                // this._lineGeometry.attributes.linewidth.updateRange = { offset: edge._lineSizeRange[0], count };
            }
        }
        this._setPickingLineSize(edges);
        this._lineGeometry.attributes.linewidth.needsUpdate = true;
    }
    resetHoverEdge() {
        if (this._hoveredEdge) {
            this._hoveredEdge.__hovered = false;
            if (this._hoveredEdge.__active === undefined || this._hoveredEdge.__active === false) {
                this._setEdgesSize([this._hoveredEdge], 1, 1.3);
            }
            this._graph.onEvent.emit('edgeUnhover', { edge: this._hoveredEdge });
            this._hoveredEdge = null;
            this._hoveredEdgeID = -1;
            this.recalculate();
        }
    }
    testEdge(position) {
        if (this._pickingTexture && this._graph._renderer && this._pickingLineScene && this._graph._camera) {
            this._graph._renderer.setRenderTarget(this._pickingTexture);
            this._graph._renderer.render(this._pickingLineScene, this._graph._camera);
            this._graph._renderer.setRenderTarget(null);
            const pixelBuffer = new Uint8Array(4);
            this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
            /* tslint:disable-next-line */
            const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
            if (id) {
                if (this._hoveredEdgeID !== id - 1) {
                    this.resetHoverEdge();
                    this._hoveredEdge = this._graph._edges[id - 1];
                    this._hoveredEdge.__hovered = true;
                    this._hoveredEdgeID = id - 1;
                    if (this._hoveredEdge.__active === undefined || this._hoveredEdge.__active === false) {
                        this._setEdgesSize([this._hoveredEdge], 1.3, 1);
                    }
                    // ToDo: отсылать надо центр ребра?
                    this._graph.onEvent.emit('edgeHover', { edge: this._hoveredEdge, ...position });
                }
            }
            else {
                this.resetHoverEdge();
            }
        }
    }
    recalculate() {
        if (this._lineGeometry) {
            const linesData = this._constructLines(this._graph._edges);
            this._lineGeometry.setPositions(linesData.positions);
        }
    }
    recalculatePicking() {
        const linesData = this._constructLines(this._graph._edges);
        this._linesPickingGeometry.setPositions(linesData.positions);
    }
    _setEdgesColor(edges, newColor) {
        if (!edges.length) {
            return;
        }
        const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        for (const edge of edges) {
            if (newColor) {
                color.setStyle(newColor);
            }
            else {
                color.setStyle(edge.color);
            }
            for (let i = edge._lineSizeRange[0]; i < edge._lineSizeRange[1]; i++) {
                this._lineGeometry.attributes.instanceColorStart.setXYZ(i, color.r, color.g, color.b);
                this._lineGeometry.attributes.instanceColorEnd.setXYZ(i, color.r, color.g, color.b);
            }
        }
        this._lineGeometry.attributes.instanceColorStart.needsUpdate = true;
        this._lineGeometry.attributes.instanceColorEnd.needsUpdate = true;
    }
    _setPickingLineSize(edges) {
        if (!edges.length) {
            return;
        }
        for (const edge of edges) {
            if (edge._lineSizeRange) {
                const count = edge._lineSizeRange[1] - edge._lineSizeRange[0];
                if (count > 1) {
                    for (let i = edge._lineSizeRange[0]; i < edge._lineSizeRange[1]; i++) {
                        this._linesPickingGeometry.attributes.linewidth.setX(i, edge.size);
                    }
                }
                else {
                    this._linesPickingGeometry.attributes.linewidth.setX(edge._lineSizeRange[0], edge.size);
                }
                this._linesPickingGeometry.attributes.linewidth.updateRange = { offset: edge._lineSizeRange[0], count };
            }
        }
        this._linesPickingGeometry.attributes.linewidth.needsUpdate = true;
    }
    _constructMesh(linesData) {
        var _a;
        this._lineGeometry = new _externals_lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_3__.LineSegmentsGeometry();
        this._lineGeometry.setPositions(linesData.positions);
        this._lineGeometry.setColors(linesData.colors);
        const lineWidthAttr = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(new Float32Array(linesData.sizes), 1);
        lineWidthAttr.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        const dashedAttr = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1);
        dashedAttr.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        this._lineGeometry.setAttribute('linewidth', lineWidthAttr);
        this._lineGeometry.setAttribute('dashed', dashedAttr);
        this._lineGeometry.attributes.instanceStart.data.usage = three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage;
        this._lineGeometry.attributes.instanceEnd.data.usage = three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage;
        this._lineMaterial = new _externals_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__.LineMaterial({
            dashScale: 0.1,
            dashSize: 2,
            depthTest: false,
            gapSize: 1,
            scale: this._graph._controls ? this._graph._controls.scale : 1.0,
            vertexColors: true,
        });
        this._lineMaterial.useColor = 1.0;
        this._lineMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);
        this._lineMesh = new _externals_lines_Line2_js__WEBPACK_IMPORTED_MODULE_1__.Line2(this._lineGeometry, this._lineMaterial);
        this._lineMesh.computeLineDistances();
        (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.add(this._lineMesh);
    }
    _constructPickingMesh(linesData) {
        this._linesPickingGeometry = new _externals_lines_LineSegmentsGeometry_js__WEBPACK_IMPORTED_MODULE_3__.LineSegmentsGeometry();
        this._linesPickingGeometry.setPositions(linesData.positions);
        this._linesPickingGeometry.setColors(linesData.pickingColors);
        const lineWidthAttr = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(new Float32Array(linesData.sizes), 1);
        lineWidthAttr.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        const dashedAttr = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1);
        dashedAttr.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        this._linesPickingGeometry.setAttribute('linewidth', lineWidthAttr);
        this._linesPickingGeometry.setAttribute('dashed', dashedAttr);
        this._linesPickingGeometry.attributes.instanceStart.data.usage = three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage;
        this._linesPickingGeometry.attributes.instanceEnd.data.usage = three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage;
        this._linePickingMaterial = new _externals_lines_LineMaterial_js__WEBPACK_IMPORTED_MODULE_2__.LineMaterial({
            dashScale: 0.1,
            dashSize: 2,
            depthTest: false,
            gapSize: 1,
            scale: this._graph._controls ? this._graph._controls.scale : 1.0,
            vertexColors: true,
        });
        this._linePickingMaterial.useColor = 1.0;
        this._linePickingMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);
        this._linePickingMesh = new _externals_lines_Line2_js__WEBPACK_IMPORTED_MODULE_1__.Line2(this._linesPickingGeometry, this._linePickingMaterial);
        this._linePickingMesh.computeLineDistances();
        if (this._pickingLineScene) {
            this._pickingLineScene.add(this._linePickingMesh);
            this._pickingLineScene.updateMatrixWorld(true);
        }
    }
    _disposeInternal() {
        var _a;
        if (this._lineGeometry) {
            this._lineGeometry.dispose();
            this._lineGeometry = null;
        }
        if (this._linesPickingGeometry) {
            this._linesPickingGeometry.dispose();
            this._linesPickingGeometry = null;
        }
        if (this._linePickingMaterial) {
            this._linePickingMaterial.dispose();
            this._linePickingMaterial = null;
        }
        if (this._lineMaterial) {
            this._lineMaterial.dispose();
            this._lineMaterial = null;
        }
        if (this._linePickingMesh && this._pickingLineScene) {
            this._pickingLineScene.remove(this._linePickingMesh);
            this._linePickingMesh = null;
        }
        if (this._lineMesh && this._graph) {
            (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.remove(this._lineMesh);
            this._lineMesh = null;
        }
        this._hoveredEdge = null;
        this._hoveredEdgeID = -1;
        this._hoveredEdges = [];
        this._activeEdges = [];
    }
    _constructLines(links) {
        const positions = [];
        const colors = [];
        const sizes = [];
        const isDashed = [];
        const pickingColors = [];
        const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        const pickingColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        links.forEach((link, index) => {
            const angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);
            let sourceX;
            let sourceY;
            if (link.arrow && link.arrow === 'source') {
                sourceX = link.source.x + ((link.source.size / 2) * this._graph.nodeScalingFactor + link.size * 1.5) * Math.cos(angle);
                sourceY = link.source.y + ((link.source.size / 2) * this._graph.nodeScalingFactor + link.size * 1.5) * Math.sin(angle);
            }
            else {
                sourceX = link.source.x + ((link.source.size / 2) * this._graph.nodeScalingFactor) * Math.cos(angle);
                sourceY = link.source.y + ((link.source.size / 2) * this._graph.nodeScalingFactor) * Math.sin(angle);
            }
            let targetX;
            let targetY;
            if (link.arrow === 'none' || link.arrow === 'source') {
                targetX = link.target.x - ((link.target.size / 2) * this._graph.nodeScalingFactor) * Math.cos(angle);
                targetY = link.target.y - ((link.target.size / 2) * this._graph.nodeScalingFactor) * Math.sin(angle);
            }
            else {
                targetX = link.target.x - (((link.target.size / 2) * this._graph.nodeScalingFactor) + link.size * 1.5) * Math.cos(angle);
                targetY = link.target.y - (((link.target.size / 2) * this._graph.nodeScalingFactor) + link.size * 1.5) * Math.sin(angle);
            }
            color.setStyle(link.color);
            pickingColor.setHex(index + 1);
            if (link.source.x === link.target.x && link.source.y === link.target.y) {
                const vStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.source.x, link.source.y || 0, 0);
                const vEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.target.x, link.target.y || 0, 0);
                const d = 15 * link.source.size;
                const endAngle = -0; // Rotate clockwise (from Z angle perspective)
                const startAngle = endAngle + Math.PI / 2;
                const curve = new three__WEBPACK_IMPORTED_MODULE_0__.CubicBezierCurve3(vStart, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0)
                    .add(vStart), new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0)
                    .add(vStart), vEnd);
                const points = curve.getPoints(50);
                link._lineSizeRange = [sizes.length, sizes.length + points.length - 2];
                let lastPoint;
                for (let i = 0; i < points.length - 1; i += 2) {
                    if (lastPoint) {
                        positions.push(lastPoint.x, lastPoint.y, 0, points[i].x, points[i].y, 0, points[i].x, points[i].y, 0, points[i + 1].x, points[i + 1].y, 0);
                        sizes.push(link.size, link.size);
                        if (link.type === 'dashed') {
                            isDashed.push(1.0, 1.0);
                        }
                        else {
                            isDashed.push(0.0, 0.0);
                        }
                        colors.push(color.r, color.g, color.b, // color start
                        color.r, color.g, color.b, // color end
                        color.r, color.g, color.b, // color start
                        color.r, color.g, color.b);
                        pickingColors.push(pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b);
                    }
                    else {
                        positions.push(points[i].x, points[i].y, 0, points[i + 1].x, points[i + 1].y, 0);
                        sizes.push(link.size);
                        if (link.type === 'dashed') {
                            isDashed.push(1.0);
                        }
                        else {
                            isDashed.push(0.0);
                        }
                        colors.push(color.r, color.g, color.b, // color start
                        color.r, color.g, color.b);
                        pickingColors.push(pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b);
                    }
                    lastPoint = points[i + 1];
                }
            }
            else {
                positions.push(sourceX, sourceY, 0, // start point
                targetX, targetY, 0);
                link._lineSizeRange = [sizes.length, sizes.length + 1];
                sizes.push(link.size);
                if (link.type === 'dashed') {
                    isDashed.push(1.0);
                }
                else {
                    isDashed.push(0.0);
                }
                colors.push(color.r, color.g, color.b, // color start
                color.r, color.g, color.b);
                pickingColors.push(pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b);
            }
        });
        return {
            colors,
            isDashed,
            pickingColors,
            positions,
            sizes,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VkZ2VzL2VkZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBQ0wsT0FBTyxFQUNQLGlCQUFpQixHQUNsQixNQUFNLE9BQU8sQ0FBQztBQUVmLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFHeEYsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBMkI3QyxZQUFZLEtBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFURixpQkFBWSxHQUFRLElBQUksQ0FBQztRQUV6QixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTVCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBSy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUV0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFE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

/***/ }),

/***/ "./src/lib/emitter.ts":
/*!****************************!*\
  !*** ./src/lib/emitter.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventEmitter": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, listener) {
        if (typeof this.events[event] !== "object") {
            this.events[event] = [];
        }
        this.events[event].push(listener);
        return () => this.removeListener(event, listener);
    }
    removeListener(event, listener) {
        if (typeof this.events[event] !== "object") {
            return;
        }
        const idx = this.events[event].indexOf(listener);
        if (idx > -1) {
            this.events[event].splice(idx, 1);
        }
    }
    removeAllListeners() {
        Object.keys(this.events).forEach((event) => this.events[event].splice(0, this.events[event].length));
    }
    emit(event, ...args) {
        if (typeof this.events[event] !== "object") {
            return;
        }
        [...this.events[event]].forEach((listener) => listener.apply(this, args));
    }
    once(event, listener) {
        const remove = this.on(event, (...args) => {
            remove();
            listener.apply(this, args);
        });
        return remove;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1pdHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxNQUFNLE9BQU8sWUFBWTtJQUF6QjtRQUNtQixXQUFNLEdBQVcsRUFBRSxDQUFDO0lBNEN2QyxDQUFDO0lBMUNRLEVBQUUsQ0FBQyxLQUFhLEVBQUUsUUFBa0I7UUFDekMsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxFQUFFO1lBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUNyRCxJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLEVBQUU7WUFDMUMsT0FBTztTQUNSO1FBRUQsTUFBTSxHQUFHLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUN4RCxDQUFDO0lBQ0osQ0FBQztJQUVNLElBQUksQ0FBQyxLQUFhLEVBQUUsR0FBRyxJQUFXO1FBQ3ZDLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsRUFBRTtZQUMxQyxPQUFPO1NBQ1I7UUFFRCxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBRU0sSUFBSSxDQUFDLEtBQWEsRUFBRSxRQUFrQjtRQUMzQyxNQUFNLE1BQU0sR0FBaUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFO1lBQzdELE1BQU0sRUFBRSxDQUFDO1lBQ1QsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0YifQ==

/***/ }),

/***/ "./src/lib/labelsLayer/labels.ts":
/*!***************************************!*\
  !*** ./src/lib/labelsLayer/labels.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LabelsLayer": () => (/* binding */ LabelsLayer)
/* harmony export */ });
class LabelsLayer {
    constructor(graph) {
        var _a, _b;
        this._labels = [];
        this._isHidden = false;
        this._graph = graph;
        this._textCanvas = document.createElement('canvas');
        this._textCanvas.setAttribute('style', 'position: absolute;left: 0px;top: 0px;z-index:10;');
        this._textCanvas.width = (_a = this._graph._renderer) === null || _a === void 0 ? void 0 : _a.domElement.width;
        this._textCanvas.height = (_b = this._graph._renderer) === null || _b === void 0 ? void 0 : _b.domElement.height;
        this._textCanvas.style.userSelect = 'none';
        this._textCanvas.style.pointerEvents = 'none';
        this._textContext = this._textCanvas.getContext('2d');
        this._graph._container.appendChild(this._textCanvas);
        this._textContext.font = '12px Roboto';
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            let newR;
            if (w < 2 * r) {
                newR = w / 2;
            }
            if (h < 2 * r) {
                newR = h / 2;
            }
            this.beginPath();
            this.moveTo(x + newR, y);
            this.arcTo(x + w, y, x + w, y + h, newR);
            this.arcTo(x + w, y + h, x, y + h, newR);
            this.arcTo(x, y + h, x, y, newR);
            this.arcTo(x, y, x + w, y, newR);
            this.closePath();
            return this;
        };
    }
    onResize() {
        this._clearTextLayer();
        if (this._graph._renderer) {
            this._textCanvas.width = this._graph._renderer.domElement.width;
            this._textCanvas.height = this._graph._renderer.domElement.height;
        }
        this.recalculate();
    }
    clear() {
        this._labels = [];
        this._clearTextLayer();
    }
    addLabel(text, x, y, nodeSize) {
        const index = this._labels.length;
        this._labels.push({
            nodeSize,
            text,
            x,
            y,
        });
        return index;
    }
    show() {
        this._isHidden = false;
        this.recalculate();
    }
    isHidden() {
        return this._isHidden;
    }
    hide() {
        this._clearTextLayer();
        this._isHidden = true;
    }
    toggleLabels() {
        if (this._isHidden) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    setLabelsPositionForNodes(nodes, offset) {
        for (const node of nodes) {
            if (node.__labelIndex !== undefined) {
                this._labels[node.__labelIndex].x = this._labels[node.__labelIndex].x - offset.x;
                this._labels[node.__labelIndex].y = this._labels[node.__labelIndex].y - offset.y;
            }
        }
    }
    setLabelPosition(index, position) {
        if (this._labels[index]) {
            this._labels[index].x = position.x;
            this._labels[index].y = position.y;
        }
    }
    draw(canvasCtx) {
        if (this._isHidden) {
            return;
        }
        if (!canvasCtx) {
            this._clearTextLayer();
        }
        const bounds = this._graph._container.getBoundingClientRect();
        for (const label of this._labels) {
            const coords = this._graph.translateCoordinates(label.x, label.y);
            if (coords.x > 0 && coords.x < bounds.width && coords.y > 0 && coords.y < bounds.height && label.nodeSize * 7 * this._graph._controls.scale > 45) {
                this._drawText(label.text, coords, label.nodeSize, canvasCtx);
            }
        }
    }
    recalculate() {
        if (this._isHidden) {
            return;
        }
        this._clearTextLayer();
        const bounds = this._graph._container.getBoundingClientRect();
        for (const label of this._labels) {
            const coords = this._graph.translateCoordinates(label.x, label.y);
            if (coords.x > 0 && coords.x < bounds.width && coords.y > 0 && coords.y < bounds.height && label.nodeSize * 7 * this._graph._controls.scale > 45) {
                this._drawText(label.text, coords, label.nodeSize);
            }
        }
    }
    dispose() {
        this._graph._container.removeChild(this._textCanvas);
        this._labels = [];
    }
    _clearTextLayer() {
        this._textContext.clearRect(0, 0, this._textContext.canvas.width, this._textContext.canvas.height);
    }
    _drawText(text, coords, nodeSize, canvasCtx) {
        let ctx;
        if (canvasCtx) {
            ctx = canvasCtx;
        }
        else {
            ctx = this._textContext;
        }
        // Get text height = font size * 1.286
        const textHeight = 12 * 1.286;
        // Calculate text width
        ctx.font = '12px Roboto';
        const textWidth = ctx.measureText(text).width;
        const textOffset = (nodeSize / 2) * this._graph.nodeScalingFactor * this._graph._controls.scale;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 3;
        // ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.roundRect(textOffset + coords.x + 1, coords.y - textHeight / 2 - 2, textWidth + 10, textHeight + 6, 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.stroke();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = 'black';
        ctx.fillText(text, textOffset + 6 + coords.x, coords.y + 5);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sYWJlbHNMYXllci9sYWJlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxPQUFPLFdBQVc7SUFXdEIsWUFBWSxLQUFLOztRQVJULFlBQU8sR0FBVSxFQUFFLENBQUM7UUFFcEIsY0FBUyxHQUFZLEtBQUssQ0FBQztRQU9qQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLG1EQUFtRCxDQUFDLENBQUM7UUFDNUYsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBQSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsMENBQUUsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUNqRSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sR0FBRyxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUywwQ0FBRSxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ25FLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUU5QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFckQsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBRXRDLHdCQUF3QixDQUFDLFNBQWlCLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7WUFDN0UsSUFBSSxJQUFJLENBQUM7WUFFVCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7WUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNiLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7WUFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWpCLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRTtZQUN6QixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7U0FDbkU7UUFFRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLFFBQVEsQ0FBQyxJQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVMsRUFBRSxRQUFnQjtRQUNsRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUVsQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUNoQixRQUFRO1lBQ1IsSUFBSTtZQUNKLENBQUM7WUFDRCxDQUFDO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztJQUN4QixDQUFDO0lBRU0sWUFBWTtRQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2I7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVNLHlCQUF5QixDQUFDLEtBQVksRUFBRSxNQUFnQztRQUM3RSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtZQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssU0FBUyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pGLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNGO0lBQ0gsQ0FBQztJQUVNLGdCQUFnQixDQUFDLEtBQWEsRUFBRSxRQUE2QztRQUNsRixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQztJQUVNLElBQUksQ0FBQyxTQUFvQztRQUM5QyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztTQUN4QjtRQUNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFFOUQsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUU7Z0JBQ2hKLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMvRDtTQUNGO0lBQ0gsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLE9BQU87U0FDUjtRQUVELElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTlELEtBQUssTUFBTSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNoQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFO2dCQUNoSixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNwRDtTQUNGO0lBQ0gsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyxlQUFlO1FBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFTyxTQUFTLENBQUMsSUFBWSxFQUFFLE1BQWdDLEVBQUUsUUFBZ0IsRUFBRSxTQUFvQztRQUN0SCxJQUFJLEdBQTZCLENBQUM7UUFFbEMsSUFBSSxTQUFTLEVBQUU7WUFDYixHQUFHLEdBQUcsU0FBUyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUN6QjtRQUVELHNDQUFzQztRQUN0QyxNQUFNLFVBQVUsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBRTlCLHVCQUF1QjtRQUN2QixHQUFHLENBQUMsSUFBSSxHQUFHLGFBQWEsQ0FBQztRQUN6QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUU5QyxNQUFNLFVBQVUsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUVoRyxHQUFHLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLHlCQUF5QjtRQUN6QixHQUFHLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQztRQUVyQixHQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxFQUFFLEVBQUUsVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUVwSCxHQUFHLENBQUMsV0FBVyxHQUFHLG9CQUFvQixDQUFDO1FBQ3ZDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUVYLEdBQUcsQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlELENBQUM7Q0FDRiJ9

/***/ }),

/***/ "./src/lib/models/events.ts":
/*!**********************************!*\
  !*** ./src/lib/models/events.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pgActivateNodeMode": () => (/* binding */ pgActivateNodeMode)
/* harmony export */ });
const pgActivateNodeMode = {
    Single: 'single',
    ByGroup: 'byGroup',
    BySteps: 'bySteps',
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tb2RlbHMvZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHO0lBQ2hDLE1BQU0sRUFBQyxRQUFRO0lBQ2YsT0FBTyxFQUFDLFNBQVM7SUFDakIsT0FBTyxFQUFDLFNBQVM7Q0FDbEIsQ0FBQSJ9

/***/ }),

/***/ "./src/lib/models/index.ts":
/*!*********************************!*\
  !*** ./src/lib/models/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pgActivateNodeMode": () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_0__.pgActivateNodeMode)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/lib/models/events.ts");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL21vZGVscy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjLFVBQVUsQ0FBQSJ9

/***/ }),

/***/ "./src/lib/nodes/imageCanvas.ts":
/*!**************************************!*\
  !*** ./src/lib/nodes/imageCanvas.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ImageCanvas": () => (/* binding */ ImageCanvas)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);

class ImageCanvas extends three__WEBPACK_IMPORTED_MODULE_0__.EventDispatcher {
    constructor() {
        super();
        this.textureWidth = 0;
        this.textureHeight = 0;
        this.canvasHeight = 4096;
        this.canvasWidth = 4096;
        this._nodeImageToIndex = {};
        this._textureIndex = 0;
        this._enabled = true;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.textureWidth = this.canvasWidth / 32;
        this.textureHeight = this.canvasHeight / 32;
        this._ctx = this.canvas.getContext('2d');
        if (this._ctx) {
            this._ctx.fillStyle = 'white';
            this._ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.textureMap = new three__WEBPACK_IMPORTED_MODULE_0__.CanvasTexture(this.canvas);
        this.textureMap.flipY = false;
    }
    disable() {
        this._enabled = false;
    }
    enable() {
        this._enabled = true;
    }
    dispose() {
        this._nodeImageToIndex = {};
        if (this.textureMap) {
            this.textureMap.dispose();
            this.textureMap = null;
        }
        if (this._ctx) {
            this._ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        }
        this.canvas = null;
    }
    loadImage(imageUrl) {
        if (this._nodeImageToIndex[imageUrl] !== undefined) {
            return this._nodeImageToIndex[imageUrl];
        }
        if (this._ctx) {
            const index = this._textureIndex;
            this._textureIndex += 1;
            this._nodeImageToIndex[imageUrl] = index;
            const img = new Image();
            img.onload = () => {
                const x = (index * this.textureWidth) % this.canvasWidth;
                const y = Math.floor((index * this.textureWidth) / this.canvasWidth) * this.textureHeight;
                if (this._ctx) {
                    this._ctx.drawImage(img, 0, 0, img.width, img.height, x + 10, y + 10, this.textureWidth - 20, this.textureHeight - 20);
                }
                if (this.textureMap) {
                    this.textureMap.needsUpdate = true;
                }
                if (this._enabled) {
                    this.dispatchEvent({
                        index,
                        type: 'imageLoaded'
                    });
                }
            };
            img.src = imageUrl;
            return index;
        }
        return -1;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2VDYW52YXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25vZGVzL2ltYWdlQ2FudmFzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxhQUFhLEVBQ2IsZUFBZSxFQUNoQixNQUFNLE9BQU8sQ0FBQztBQUVmLE1BQU0sT0FBTyxXQUFZLFNBQVEsZUFBZTtJQXNCOUM7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQWpCSCxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV6QixrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUU1QixnQkFBVyxHQUFXLElBQUksQ0FBQztRQUkxQixzQkFBaUIsR0FBOEIsRUFBRSxDQUFDO1FBRWxELGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1FBRTFCLGFBQVEsR0FBWSxJQUFJLENBQUM7UUFLL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztRQUN2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFFNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7WUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxF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

/***/ }),

/***/ "./src/lib/nodes/nodes.ts":
/*!********************************!*\
  !*** ./src/lib/nodes/nodes.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NodesLayer": () => (/* binding */ NodesLayer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _shaders__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shaders */ "./src/lib/nodes/shaders.ts");
/* harmony import */ var _imageCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./imageCanvas */ "./src/lib/nodes/imageCanvas.ts");



function throttle(func, wait, options = {}) {
    let args;
    let result;
    let timeout = null;
    let previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(null, args);
    }
    return (...data) => {
        const now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        args = data;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(null, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
class NodesLayer {
    constructor(graph) {
        this.hoveredNode = null;
        this._colorToNodeID = {};
        this._silent = false;
        this._size = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this._buffer = new Uint8Array();
        this._hoveredNodes = [];
        this._activeNodes = [];
        this._graph = graph;
        this._imageLoaded = throttle(() => {
            if (!this._silent) {
                this._graph.render();
            }
        }, 800, { trailing: true });
        this._imageCanvas = new _imageCanvas__WEBPACK_IMPORTED_MODULE_2__.ImageCanvas();
        this._imageCanvas.addEventListener('imageLoaded', this._imageLoaded);
        this._pickingTexture = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget(this._graph._container.clientWidth, this._graph._container.clientHeight);
        this._pickingTexture.texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter;
        this._pickingNodesScene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene();
        this._pickingNodesScene.background = new three__WEBPACK_IMPORTED_MODULE_0__.Color(0x000000);
        this._color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
    }
    get activeNodes() {
        return this._activeNodes;
    }
    setSilent(silent) {
        this._silent = silent;
    }
    draw() {
        var _a;
        this._disposeInternal();
        if (this._graph._labelsLayer) {
            this._graph._labelsLayer.clear();
        }
        const translateArray = new Float32Array(this._graph._nodes.length * 3);
        const colors = new Float32Array(this._graph._nodes.length * 3);
        const sizes = new Float32Array(this._graph._nodes.length);
        const images = new Float32Array(this._graph._nodes.length);
        const showDot = new Float32Array(this._graph._nodes.length);
        for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i++, i3 += 3) {
            translateArray[i3 + 0] = this._graph._nodes[i].x;
            translateArray[i3 + 1] = this._graph._nodes[i].y;
            translateArray[i3 + 2] = 0;
            if (this._color) {
                this._color.setStyle(this._graph._nodes[i].color);
                colors[i3 + 0] = this._color.r;
                colors[i3 + 1] = this._color.g;
                colors[i3 + 2] = this._color.b;
            }
            sizes[i] = this._graph._nodes[i].size;
            if (this._graph._nodes[i].img) {
                const imageIndex = this._imageCanvas.loadImage(this._graph._nodes[i].img);
                this._graph._nodes[i]._imageIndex = imageIndex;
                images[i] = imageIndex;
            }
            else {
                images[i] = -1;
            }
            this._graph._nodes[i].__positionIndex = i;
            const coordinates = this._graph.translateCoordinatesFromCamera(this._graph._nodes[i].x, this._graph._nodes[i].y);
            this._graph._nodes[i].coordinates = coordinates;
            if (this._graph._nodes[i].showDot) {
                showDot[i] = 1.0;
            }
            else {
                showDot[i] = 0.0;
            }
            if (this._graph._labelsLayer && this._graph._nodes[i].label) {
                this._graph._nodes[i].__labelIndex = this._graph._labelsLayer.addLabel(this._graph._nodes[i].label, this._graph._nodes[i].x, this._graph._nodes[i].y, this._graph._nodes[i].size);
            }
        }
        const boundingBox = new three__WEBPACK_IMPORTED_MODULE_0__.Box3();
        boundingBox.setFromArray(translateArray);
        boundingBox.getSize(this._size);
        this._nodesBufferGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        this._nodesInstancedGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferGeometry();
        this._nodesInstancedGeometry.index = this._nodesBufferGeometry.index;
        this._nodesInstancedGeometry.attributes = this._nodesBufferGeometry.attributes;
        this._nodesInstancedGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(new Float32Array([0, 0, 0]), 3));
        this._nodeTranslateAttribute = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(translateArray, 3);
        this._nodeTranslateAttribute.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        this._nodeColorAttribute = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(colors, 3);
        this._nodeColorAttribute.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);
        this._nodesInstancedGeometry.setAttribute('translation', this._nodeTranslateAttribute);
        this._nodesInstancedGeometry.setAttribute('color', this._nodeColorAttribute);
        this._nodesInstancedGeometry.setAttribute('size', new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(sizes, 1));
        this._nodesInstancedGeometry.setAttribute('image', new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(images, 1));
        this._nodesInstancedGeometry.setAttribute('showDot', new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(showDot, 1));
        this._nodesMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.RawShaderMaterial({
            depthTest: false,
            depthWrite: false,
            fragmentShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.fragmentShader,
            transparent: false,
            uniforms: {
                nodeScalingFactor: {
                    value: this._graph.nodeScalingFactor,
                },
                scale: {
                    value: this._graph._controls ? this._graph._controls.scale : 1.0,
                },
                spriteDim: {
                    value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this._imageCanvas.textureWidth, this._imageCanvas.textureHeight),
                },
                textureDim: {
                    value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this._imageCanvas.canvasWidth, this._imageCanvas.canvasHeight),
                },
                textureMap: {
                    value: this._imageCanvas.textureMap,
                },
            },
            vertexColors: true,
            vertexShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.vertexShader,
        });
        this._nodeMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Points(this._nodesInstancedGeometry, this._nodesMaterial);
        this._nodeMesh.frustumCulled = false;
        this._nodeMesh.renderOrder = 10;
        (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.add(this._nodeMesh);
        // Add duplicates for GPU picking
        const pickingColors = new Float32Array(this._graph._nodes.length * 3);
        for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i++, i3 += 3) {
            if (this._color) {
                this._color.setHex(i + 1);
                pickingColors[i3 + 0] = this._color.r;
                pickingColors[i3 + 1] = this._color.g;
                pickingColors[i3 + 2] = this._color.b;
            }
            this._colorToNodeID[i + 1] = this._graph._nodes[i].id;
        }
        this._nodesPickingMaterial = new three__WEBPACK_IMPORTED_MODULE_0__.RawShaderMaterial({
            fragmentShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.pickingFragmentShader,
            uniforms: {
                nodeScalingFactor: {
                    value: this._graph.nodeScalingFactor,
                },
                scale: {
                    value: this._graph._controls ? this._graph._controls.scale : 1.0,
                },
            },
            vertexShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.pickingVertexShader,
        });
        this._nodesPickingGeometry = this._nodeMesh.geometry.clone();
        this._nodesPickingGeometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(pickingColors, 3));
        this._nodesPickingsMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Points(this._nodesPickingGeometry, this._nodesPickingMaterial);
        this._nodesPickingsMesh.frustumCulled = false;
        if (this._pickingNodesScene) {
            this._pickingNodesScene.add(this._nodesPickingsMesh);
            this._pickingNodesScene.updateMatrixWorld(true);
        }
    }
    getSize() {
        return this._size;
    }
    setHoveredNodes(nodes) {
        this.clearHoveredNodes();
        this._hoveredNodes = nodes.filter(n => !n.__active);
        this._hoveredNodes.forEach(n => n.__hovered = true);
        this.setNodesColor(this._hoveredNodes, this._graph.dataConfig.colorsEvents.selectNode);
    }
    clearHoveredNodes() {
        const deactivatingNodes = this._hoveredNodes.filter(n => n.__hovered === true
            && !n.__active);
        this.setNodesColor(deactivatingNodes);
    }
    setActiveNodes(nodes, mode) {
        if (this._activeNodes.length && nodes[0].index === this._activeNodes[0].index) {
            this.clearActiveNodes();
            return;
        }
        this.clearActiveNodes();
        this._graph.onEvent.emit('activateNodes', { nodes, mode });
        this._activeNodes = nodes;
        this._activeNodes.forEach(n => n.__active = true);
        const activatingNodes = this._activeNodes.filter(n => n.__hovered === undefined || n.__hovered === false);
        this.setNodesColor(activatingNodes, this._graph.dataConfig.colorsEvents.selectNode);
    }
    clearActiveNodes() {
        this._activeNodes.forEach(n => n.__active = false);
        const deactivatingNodes = this._activeNodes.filter(n => n.__hovered === undefined || n.__hovered === false);
        this.setNodesColor(deactivatingNodes);
        this._activeNodes = [];
    }
    setNodesColor(nodes, newColor) {
        if (!nodes.length) {
            return;
        }
        const color = new three__WEBPACK_IMPORTED_MODULE_0__.Color();
        for (const node of nodes) {
            if (newColor) {
                color.setStyle(newColor);
            }
            else {
                color.setStyle(node.color);
            }
            this._nodeColorAttribute.setXYZ(node.__positionIndex, color.r, color.g, color.b);
        }
        this._nodeColorAttribute.needsUpdate = true;
    }
    setNodePosition(nodes, offset) {
        if (this._nodesInstancedGeometry && this._nodesPickingGeometry) {
            for (const node of nodes) {
                if (this._nodesInstancedGeometry && this._nodesPickingGeometry) {
                    node.x -= offset.x;
                    node.y -= offset.y;
                    const coordinates = this._graph.translateCoordinates(node.x, node.y);
                    node.coordinates = coordinates;
                    this._nodesInstancedGeometry.attributes.translation.setXYZ(node.__positionIndex, node.x, node.y, 0);
                    this._nodesPickingGeometry.attributes.translation.setXYZ(node.__positionIndex, node.x, node.y, 0);
                }
            }
            this._nodesInstancedGeometry.attributes.translation.needsUpdate = true;
            this._nodesPickingGeometry.attributes.translation.needsUpdate = true;
        }
    }
    testNode(position) {
        if (this._pickingTexture && this._graph._renderer) {
            this._graph._renderer.setRenderTarget(this._pickingTexture);
            if (this._pickingNodesScene && this._graph._camera) {
                this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
            }
            this._graph._renderer.setRenderTarget(null);
            const pixelBuffer = new Uint8Array(4);
            this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
            /* tslint:disable-next-line */
            const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
            if (id) {
                const node = this._graph._indexedNodes[this._colorToNodeID[id]];
                if (this.hoveredNode !== node) {
                    // clear last nodes
                    const unhoveringNodes = this._hoveredNodes.filter(n => n.__active === undefined || n.__active === false);
                    this.setNodesColor(unhoveringNodes);
                    this._hoveredNodes.forEach(n => n.__hovered = false);
                    this.hoveredNode = node;
                    this._hoveredNodes = [node, ...this._graph.neighbourhoodNodes[node.id]];
                    this._hoveredNodes.forEach(n => n.__hovered = true);
                    const hoveringNodes = this._hoveredNodes.filter(n => n.__active === undefined || n.__active === false);
                    this.setNodesColor(hoveringNodes, this._graph.dataConfig.colorsEvents.hoverNode);
                    const coordinates = this._graph.translateCoordinates(this.hoveredNode.x, this.hoveredNode.y);
                    this._graph.onEvent.emit('nodeHover', {
                        node: this.hoveredNode,
                        ...coordinates,
                        scale: this._graph._controls.scale,
                    });
                    this._graph.render();
                }
                return this.hoveredNode;
            }
            if (this.hoveredNode !== null) {
                const unhoveringNodes = this._hoveredNodes.filter(n => n.__active === undefined || n.__active === false);
                this.setNodesColor(unhoveringNodes);
                this._hoveredNodes.forEach(n => n.__hovered = false);
                this._hoveredNodes = [];
                this._graph.onEvent.emit('nodeUnhover', { node: this.hoveredNode });
                this.hoveredNode = null;
                this._graph.render();
            }
            return undefined;
        }
        return undefined;
    }
    pickNode(position) {
        if (this._pickingTexture && this._buffer.length) {
            const index = position.x + (this._pickingTexture.height - position.y) * this._pickingTexture.width;
            const pixel = this._buffer.slice(index * 4, index * 4 + 4);
            /* tslint:disable-next-line */
            const id = (pixel[0] << 16) | (pixel[1] << 8) | (pixel[2]);
            if (id) {
                return this._graph._indexedNodes[this._colorToNodeID[id]];
            }
        }
        return null;
    }
    recalculate() {
        const translateArray = new Float32Array(this._graph._nodes.length * 3);
        for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i++, i3 += 3) {
            translateArray[i3 + 0] = this._graph._nodes[i].x;
            translateArray[i3 + 1] = this._graph._nodes[i].y;
            translateArray[i3 + 2] = 0;
            this._graph._nodes[i].__positionIndex = i;
            const coordinates = this._graph.translateCoordinatesFromCamera(this._graph._nodes[i].x, this._graph._nodes[i].y);
            this._graph._nodes[i].coordinates = coordinates;
            if (this._graph._labelsLayer && this._graph._nodes[i].__labelIndex !== undefined) {
                this._graph._labelsLayer.setLabelPosition(this._graph._nodes[i].__labelIndex, {
                    x: this._graph._nodes[i].x, y: this._graph._nodes[i].y, z: 0,
                });
            }
        }
        if (this._nodesInstancedGeometry) {
            const newTranslation = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(translateArray, 3);
            this._nodesInstancedGeometry.setAttribute('translation', newTranslation);
        }
    }
    recalculatePicking() {
        const translateArray = new Float32Array(this._graph._nodes.length * 3);
        for (let i = 0, i3 = 0, l = this._graph._nodes.length; i < l; i++, i3 += 3) {
            translateArray[i3 + 0] = this._graph._nodes[i].x;
            translateArray[i3 + 1] = this._graph._nodes[i].y;
            translateArray[i3 + 2] = 0;
        }
        if (this._nodesPickingGeometry) {
            const newTranslation = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferAttribute(translateArray, 3);
            this._nodesPickingGeometry.setAttribute('translation', newTranslation);
        }
    }
    onScale(scale) {
        if (this._nodesMaterial && this._nodesPickingMaterial) {
            this._nodesMaterial.uniforms.scale.value = scale;
            this._nodesMaterial.needsUpdate = true;
            this._nodesPickingMaterial.uniforms.scale.value = scale;
            this._nodesPickingMaterial.needsUpdate = true;
        }
    }
    onResize() {
        if (this._pickingTexture) {
            this._pickingTexture.setSize(this._graph._container.clientWidth, this._graph._container.clientHeight);
        }
    }
    dispose() {
        this._disposeInternal();
        if (this._imageCanvas) {
            this._imageCanvas.dispose();
        }
        if (this._pickingNodesScene) {
            this._pickingNodesScene = null;
        }
        this._imageCanvas.removeEventListener('imageLoaded', this._imageLoaded);
        if (this._pickingTexture) {
            this._pickingTexture.dispose();
            this._pickingTexture = null;
        }
        this.hoveredNode = null;
        this._color = null;
        this._colorToNodeID = {};
    }
    refreshBuffer() {
        if (this._pickingTexture && this._pickingNodesScene && this._graph._renderer && this._graph._camera) {
            this._graph._renderer.setRenderTarget(this._pickingTexture);
            this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
            this._graph._renderer.setRenderTarget(null);
            this._buffer = new Uint8Array(4 * this._pickingTexture.width * this._pickingTexture.height);
            this._graph._renderer.readRenderTargetPixels(this._pickingTexture, 0, 0, this._pickingTexture.width, this._pickingTexture.height, this._buffer);
        }
    }
    _disposeInternal() {
        var _a;
        if (this._nodesBufferGeometry) {
            this._nodesBufferGeometry.dispose();
            this._nodesBufferGeometry = null;
        }
        if (this._nodesInstancedGeometry) {
            this._nodesInstancedGeometry.dispose();
            this._nodesInstancedGeometry = null;
        }
        if (this._nodesMaterial) {
            this._nodesMaterial.dispose();
            this._nodesMaterial = null;
        }
        if (this._nodeMesh) {
            (_a = this._graph._scene) === null || _a === void 0 ? void 0 : _a.remove(this._nodeMesh);
            this._nodeMesh = null;
        }
        if (this._nodesPickingGeometry) {
            this._nodesPickingGeometry.dispose();
            this._nodesPickingGeometry = null;
        }
        if (this._nodesPickingMaterial) {
            this._nodesPickingMaterial.dispose();
            this._nodesPickingMaterial = null;
        }
        if (this._nodesPickingsMesh && this._pickingNodesScene) {
            this._pickingNodesScene.remove(this._nodesPickingsMesh);
            this._nodesPickingsMesh = null;
        }
        this._buffer = new Uint8Array();
        this._hoveredNodes = [];
        this.hoveredNode = null;
        this._activeNodes = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25vZGVzL25vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxJQUFJLEVBQ0osZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBRWhCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsaUJBQWlCLEdBQ2xCLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFlBQVksR0FDYixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTVDLFNBQVMsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsVUFBZSxFQUFFO0lBQzFELElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUM7SUFDeEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLFNBQVMsS0FBSztRQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsSUFBVyxFQUFPLEVBQUU7UUFDN0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFD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QUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMxRSxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxjQUFjLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUUzQixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWxELE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0s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

/***/ }),

/***/ "./src/lib/nodes/shaders.ts":
/*!**********************************!*\
  !*** ./src/lib/nodes/shaders.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "vertexShader": () => (/* binding */ vertexShader),
/* harmony export */   "fragmentShader": () => (/* binding */ fragmentShader),
/* harmony export */   "pickingVertexShader": () => (/* binding */ pickingVertexShader),
/* harmony export */   "pickingFragmentShader": () => (/* binding */ pickingFragmentShader)
/* harmony export */ });
const vertexShader = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float scale;
  uniform float nodeScalingFactor;
  uniform vec2 spriteDim;
  uniform vec2 textureDim;

  attribute vec3 position;
  attribute vec3 color;
  attribute vec3 translation;
  attribute float size;
  attribute float image;
  attribute float showDot;

  varying vec3 vColor;
  varying float vScale;
  varying float vNodeScaleFactor;
  varying float vSize;
  varying float vImage;
  varying highp vec4 v_sprite;
  varying float vShowDot;

  void main() {
    vColor = color;
    vScale = scale;
    vSize = size;
    vImage = image;
    vShowDot = showDot;
    vNodeScaleFactor = nodeScalingFactor;

    highp vec2 sp = vec2(mod((image * spriteDim.x), textureDim.x), floor((image * spriteDim.x) / textureDim.y) * spriteDim.y);
    v_sprite = vec4(sp.x / textureDim.x, sp.y / textureDim.y, spriteDim.x / textureDim.x, spriteDim.y / textureDim.y);

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    if (size * scale * nodeScalingFactor > 5.0) {
      gl_PointSize = size * scale * nodeScalingFactor;
    } else {
      gl_PointSize = 5.0;
    }
  }
`;
const fragmentShader = `
  #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
  #endif

  precision highp float;

  uniform sampler2D textureMap;

  varying float vScale;
  varying float vNodeScaleFactor;
  varying float vSize;
  varying vec3 vColor;
  varying float vImage;
  varying float vShowDot;
  varying highp vec4 v_sprite;

  void main() {
    vec2 uv = vec2( gl_PointCoord.x, gl_PointCoord.y );
    float radius = 0.5;
    float border = 0.0;
    float distance = 0.0;

    vec2 m = uv - vec2(0.5, 0.5);
    float dist = radius - sqrt(dot(m, m));

    if (vSize * vNodeScaleFactor * vScale > 30.0) {
      distance = 0.025;
      if (0.08 - vSize * (vScale / 1000.0) > 0.04) {
        border = 0.08 - vSize * (vScale / 1000.0) / 2.0;
      } else {
        border = 0.06;
      }

      float sm = smoothstep(0.0, distance, dist);
      float sm2 = smoothstep(border, border - distance, dist);
      float alpha = sm*sm2;

      float tm = smoothstep(border, border + distance, dist);

      if (dist > border)
        if (vImage > -1.0) {
          gl_FragColor = vec4(texture2D(textureMap, vec2((v_sprite.s + v_sprite.p * uv.x), (v_sprite.t + v_sprite.q * uv.y))).rgb, tm);
        } else {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      else if (dist > 0.0)
        gl_FragColor = vec4(vColor, alpha);
      else discard;
    } else if (vSize * vNodeScaleFactor * vScale > 12.0) {
      distance = 0.1;
      border = 0.15;
      float l = vColor.r * 0.3 + vColor.g * 0.59 + vColor.b * 0.11;
      if (l > 0.5) {
        // gray
        if (vScale < 0.5) {
          distance = 0.1;
          border = 0.25;
        } else if (vScale > 10.0) {
          border = 0.05;
          distance = 0.016;
        } else {
          border = 0.2 - vScale / 50.0;
          distance = border / 2.5;
        }
      }

      float sm = smoothstep(0.0, distance, dist);
      float sm2 = smoothstep(border, border - distance, dist);
      float alpha = sm*sm2;

      if (dist > border + 0.02 && vShowDot > 0.0) {
        float r = 0.0, delta = 0.0, alpha2 = 1.0;
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        r = dot(cxy, cxy);
        #ifdef GL_OES_standard_derivatives
          delta = fwidth(r);
          alpha2 = 1.0 - smoothstep(0.2 - delta, 0.2 + delta, r);
        #endif

        gl_FragColor = vec4(vColor, alpha2);
      } else if (dist > 0.0) {
        gl_FragColor = vec4(vColor, alpha);
      } else discard;
    } else {
      float r = 0.0, delta = 0.0, alpha = 1.0;
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      r = dot(cxy, cxy);
      #ifdef GL_OES_standard_derivatives
        delta = fwidth(r);
        alpha = 1.0 - smoothstep(1.0 - delta, 1.0 + delta, r);
      #endif

      if (dist > 0.0)
        gl_FragColor = vec4(vColor, alpha);
      else discard;
    }
  }
`;
const pickingVertexShader = `
  precision mediump float;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float nodeScalingFactor;
  uniform float scale;

  attribute vec3 position;    // blueprint's vertex positions
  attribute vec3 color;       // only used for raycasting
  attribute vec3 translation; // x y translation offsets for an instance
  attribute float size;

  varying vec3 vColor;

  void main() {
    vColor = color;

    vec3 pos = position + translation;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

    gl_PointSize = size * scale * nodeScalingFactor;
  }
`;
const pickingFragmentShader = `
  #ifdef GL_OES_standard_derivatives
  #extension GL_OES_standard_derivatives : enable
  #endif

  precision highp float;

  varying vec3 vColor;

  void main() {
    float r = 0.0, delta = 0.0, alpha = 1.0;
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    r = dot(cxy, cxy);
    if (r > 1.0) {
      discard;
    }

    gl_FragColor = vec4(vColor, 1.0) * alpha;
  }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbm9kZXMvc2hhZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQVc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTZDbkMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FrR3JDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0F1QjFDLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBVzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQW1CNUMsQ0FBQyJ9

/***/ }),

/***/ "./externals/lines/Line2.js":
/*!**********************************!*\
  !*** ./externals/lines/Line2.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Line2": () => (/* binding */ Line2)
/* harmony export */ });
/* harmony import */ var _LineSegments2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineSegments2 */ "./externals/lines/LineSegments2.js");
/* harmony import */ var _LineMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LineMaterial */ "./externals/lines/LineMaterial.js");
/* harmony import */ var _LineGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LineGeometry */ "./externals/lines/LineGeometry.js");
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */







class Line2 extends _LineSegments2__WEBPACK_IMPORTED_MODULE_0__.LineSegments2 {
	constructor(
		geometry = new _LineGeometry__WEBPACK_IMPORTED_MODULE_2__.LineGeometry(),
		material = new _LineMaterial__WEBPACK_IMPORTED_MODULE_1__.LineMaterial({
			color: Math.random() * 0xffffff
		})
	) {
		super( geometry, material );
		this.type = 'Line2';
	}
}

Line2.prototype.isLine2 = true;




/***/ }),

/***/ "./externals/lines/LineGeometry.js":
/*!*****************************************!*\
  !*** ./externals/lines/LineGeometry.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineGeometry": () => (/* binding */ LineGeometry)
/* harmony export */ });
/* harmony import */ var _LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./LineSegmentsGeometry */ "./externals/lines/LineSegmentsGeometry.js");
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */



class LineGeometry extends _LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_0__.LineSegmentsGeometry {
	constructor() {

		super();
		this.type = 'LineGeometry';

	}

	setPositions( array ) {

        // converts [ x1, y1, z1,  x2, y2, z2, ... ] to pairs format
        var length = array.length - 3;
        var points = new Float32Array( 2 * length );

        for ( var i = 0; i < length; i += 3 ) {

            points[ 2 * i ] = array[ i ];
            points[ 2 * i + 1 ] = array[ i + 1 ];
            points[ 2 * i + 2 ] = array[ i + 2 ];
            points[ 2 * i + 3 ] = array[ i + 3 ];
            points[ 2 * i + 4 ] = array[ i + 4 ];
            points[ 2 * i + 5 ] = array[ i + 5 ];

        }

        super.setPositions( points );
        return this;

    }

	setColors( array ) {

        // converts [ r1, g1, b1,  r2, g2, b2, ... ] to pairs format
        var length = array.length - 3;
        var colors = new Float32Array( 2 * length );

        for ( var i = 0; i < length; i += 3 ) {

            colors[ 2 * i ] = array[ i ];
            colors[ 2 * i + 1 ] = array[ i + 1 ];
            colors[ 2 * i + 2 ] = array[ i + 2 ];
            colors[ 2 * i + 3 ] = array[ i + 3 ];
            colors[ 2 * i + 4 ] = array[ i + 4 ];
            colors[ 2 * i + 5 ] = array[ i + 5 ];

        }

        super.setColors( colors );
        return this;

    }

	fromLine( line ) {

        var geometry = line.geometry;

        if ( geometry.isGeometry ) {

            console.error( 'THREE.LineGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.' );
            return;

        } else if ( geometry.isBufferGeometry ) {

            this.setPositions( geometry.attributes.position.array ); // assumes non-indexed

        } // set colors, maybe


        return this;

    }

	copy( ) {

        // todo
        return this;

    }
}

LineGeometry.prototype.isLineGeometry = true;





/***/ }),

/***/ "./externals/lines/LineMaterial.js":
/*!*****************************************!*\
  !*** ./externals/lines/LineMaterial.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineMaterial": () => (/* binding */ LineMaterial)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 * parameters = {
 *  color: <hex>,
 *  linewidth: <float>,
 *  dashed: <boolean>,
 *  dashScale: <float>,
 *  dashSize: <float>,
 *  gapSize: <float>,
 *  resolution: <Vector2>, // to be set by renderer
 * }
 */



three__WEBPACK_IMPORTED_MODULE_0__.UniformsLib.line = {

	resolution: { value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2( 1, 1 ) },
	dashScale: { value: 1 },
	useColor: { value: 0 },
  	dashSize: { value: 1 },
  	scale: { value: 1 },
	gapSize: { value: 1 } // todo FIX - maybe change to totalSize

};

three__WEBPACK_IMPORTED_MODULE_0__.ShaderLib.line = {

	uniforms: three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.merge( [
		three__WEBPACK_IMPORTED_MODULE_0__.UniformsLib.common,
		three__WEBPACK_IMPORTED_MODULE_0__.UniformsLib.fog,
		three__WEBPACK_IMPORTED_MODULE_0__.UniformsLib.line
	] ),

	vertexShader:
		`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

    	uniform vec2 resolution;
    	uniform float scale;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;
    	attribute float linewidth;
    	attribute float dashed;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

    	varying vec2 vUv;
    	varying float vDashed;

		uniform float dashScale;
		attribute float instanceDistanceStart;
		attribute float instanceDistanceEnd;
		varying float vLineDistance;

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {
			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			if (dashed > 0.5) {

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;

      		}

			float aspect = resolution.x / resolution.y;

      		vUv = uv;
      		vDashed = dashed;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec2 ndcStart = clipStart.xy / clipStart.w;
			vec2 ndcEnd = clipEnd.xy / clipEnd.w;

			// direction
			vec2 dir = ndcEnd - ndcStart;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			// perpendicular to dir
			vec2 offset = vec2( dir.y, - dir.x );

			// undo aspect ratio adjustment
			dir.x /= aspect;
			offset.x /= aspect;

			// sign flip
			if ( position.x < 0.0 ) offset *= - 1.0;

			// endcaps
			if ( position.y < 0.0 ) {

				offset += - dir;

			} else if ( position.y > 1.0 ) {

				offset += dir;

			}

      		// adjust for linewidth
      		offset *= linewidth * scale;

			// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
			offset /= resolution.y;

			// select end
			vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

			// back to clip space
			offset *= clip.w;

			clip.xy += offset;

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,

	fragmentShader:
		`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float useColor;

    	uniform float dashSize;
    	uniform float gapSize;

		varying float vLineDistance;

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

    	varying vec2 vUv;
    	varying float vDashed;

		void main() {

			#include <clipping_planes_fragment>

			if (vDashed > 0.5) {

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

      		}

			if ( abs( vUv.y ) > 1.0 ) {

				float a = vUv.x;
				float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
				float len2 = a * a + b * b;

				if ( len2 > 1.0 ) discard;

			}

			vec4 diffuseColor = vec4( diffuse, opacity );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			if (useColor == 1.0) {
				gl_FragColor = vec4( vColor, 1.0 );
			} else {
				gl_FragColor = vec4( diffuseColor.rgb, diffuseColor.a );
			}

			#include <premultiplied_alpha_fragment>
			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>

		}
		`
};

class LineMaterial extends three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial {
	constructor( parameters ) {

        super( {
            type: 'LineMaterial',
            uniforms: three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( three__WEBPACK_IMPORTED_MODULE_0__.ShaderLib.line.uniforms ),
            vertexShader: three__WEBPACK_IMPORTED_MODULE_0__.ShaderLib.line.vertexShader,
            fragmentShader: three__WEBPACK_IMPORTED_MODULE_0__.ShaderLib.line.fragmentShader,
            clipping: true // required for clipping support
        } );

        this.dashed = false;
        Object.defineProperties( this, {
            color: {
                enumerable: true,
                get: function () {

                    return this.uniforms.diffuse.value;

                },
                set: function ( value ) {

                    this.uniforms.diffuse.value = value;

                }
            },
			useColor: {

				enumerable: true,

				get: function () {

					return this.uniforms.useColor.value;

				},

				set: function ( value ) {

					this.uniforms.useColor.value = value;

				}

			},
            dashScale: {
                enumerable: true,
                get: function () {

                    return this.uniforms.dashScale.value;

                },
                set: function ( value ) {

                    this.uniforms.dashScale.value = value;

                }
            },
            dashSize: {
                enumerable: true,
                get: function () {

                    return this.uniforms.dashSize.value;

                },
                set: function ( value ) {

                    this.uniforms.dashSize.value = value;

                }
            },
            gapSize: {
                enumerable: true,
                get: function () {

                    return this.uniforms.gapSize.value;

                },
                set: function ( value ) {

                    this.uniforms.gapSize.value = value;

                }
            },
			scale: {
				enumerable: true,
				get: function () {

					return this.uniforms.scale.value;

				},
				set: function ( value ) {

					this.uniforms.scale.value =  value;

				}
			},
            resolution: {
                enumerable: true,
                get: function () {

                    return this.uniforms.resolution.value;

                },
                set: function ( value ) {

                    this.uniforms.resolution.value.copy( value );

                }
            },
        } );
        this.setValues( parameters );
    }
}

LineMaterial.prototype.isLineMaterial = true;




/***/ }),

/***/ "./externals/lines/LineSegments2.js":
/*!******************************************!*\
  !*** ./externals/lines/LineSegments2.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineSegments2": () => (/* binding */ LineSegments2)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LineMaterial__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LineMaterial */ "./externals/lines/LineMaterial.js");
/* harmony import */ var _LineSegmentsGeometry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./LineSegmentsGeometry */ "./externals/lines/LineSegmentsGeometry.js");
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */








class LineSegments2 extends three__WEBPACK_IMPORTED_MODULE_0__.Mesh {


	constructor(
		geometry = new THREE.LineSegmentsGeometry(),
		material = new THREE.LineMaterial( {
			color: Math.random() * 0xffffff
		} )
	) {

		super( geometry, material );
		this.type = 'LineSegments2';

	} // for backwards-compatability, but could be a method of THREE.LineSegmentsGeometry...

	computeLineDistances = ( function () { // for backwards-compatability, but could be a method of LineSegmentsGeometry...

		var start = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		var end = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		return function computeLineDistances() {

			var geometry = this.geometry;

			var instanceStart = geometry.attributes.instanceStart;
			var instanceEnd = geometry.attributes.instanceEnd;
			var lineDistances = new Float32Array( 2 * instanceStart.data.count );

			for ( var i = 0, j = 0, l = instanceStart.data.count; i < l; i ++, j += 2 ) {

				start.fromBufferAttribute( instanceStart, i );
				end.fromBufferAttribute( instanceEnd, i );

				lineDistances[ j ] = ( j === 0 ) ? 0 : lineDistances[ j - 1 ];
				lineDistances[ j + 1 ] = lineDistances[ j ] + start.distanceTo( end );

			}

			var instanceDistanceBuffer = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedInterleavedBuffer( lineDistances, 2, 1 ); // d0, d1

			geometry.setAttribute( 'instanceDistanceStart', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 0 ) ); // d0
			geometry.setAttribute( 'instanceDistanceEnd', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceDistanceBuffer, 1, 1 ) ); // d1

			return this;

		};

	}() );

	raycast = ( function () {
		const sphere = new three__WEBPACK_IMPORTED_MODULE_0__.Sphere();
		const clipToWorldVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector4();
		const box = new three__WEBPACK_IMPORTED_MODULE_0__.Box3();
		const ssOrigin = new three__WEBPACK_IMPORTED_MODULE_0__.Vector4();
		const ssOrigin3 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
		const mvMatrix = new three__WEBPACK_IMPORTED_MODULE_0__.Matrix4();


		const start4 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector4();
		const end4 = new three__WEBPACK_IMPORTED_MODULE_0__.Vector4();
		const line = new three__WEBPACK_IMPORTED_MODULE_0__.Line3();
		const closestPoint = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		return function raycast(raycaster, intersects) {
			if ( raycaster.camera === null ) {
				console.error( 'LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2.' );
			}

			const threshold = raycaster.params.Line2 !== undefined ? raycaster.params.Line2.threshold || 0 : 0;
			const ray = raycaster.ray;
			const camera = raycaster.camera;
			const projectionMatrix = camera.projectionMatrix;
			const matrixWorld = this.matrixWorld;
			const geometry = this.geometry;
			const material = this.material;
			const resolution = material.resolution;
			const lineWidth = material.linewidth + threshold;
			const instanceStart = geometry.attributes.instanceStart;
			const instanceEnd = geometry.attributes.instanceEnd; // camera forward is negative

			const near = - camera.near; // clip space is [ - 1, 1 ] so multiply by two to get the full
			// width in clip space

			const ssMaxWidth = 2.0 * Math.max( lineWidth / resolution.width, lineWidth / resolution.height ); //
			// check if we intersect the sphere bounds

			if ( geometry.boundingSphere === null ) {

				geometry.computeBoundingSphere();

			}

			sphere.copy( geometry.boundingSphere ).applyMatrix4( matrixWorld );

			const distanceToSphere = Math.max( camera.near, sphere.distanceToPoint( ray.origin ) ); // get the w component to scale the world space line width

			clipToWorldVector.set( 0, 0, - distanceToSphere, 1.0 ).applyMatrix4( camera.projectionMatrix );

			clipToWorldVector.multiplyScalar( 1.0 / clipToWorldVector.w );

			clipToWorldVector.applyMatrix4( camera.projectionMatrixInverse ); // increase the sphere bounds by the worst case line screen space width


			const sphereMargin = Math.abs( ssMaxWidth / clipToWorldVector.w ) * 0.5;
			sphere.radius += sphereMargin;

			if ( raycaster.ray.intersectsSphere( sphere ) === false ) {

				return;

			} //
			// check if we intersect the box bounds


			if ( geometry.boundingBox === null ) {

				geometry.computeBoundingBox();

			}

			box.copy( geometry.boundingBox ).applyMatrix4( matrixWorld );

			const distanceToBox = Math.max( camera.near, box.distanceToPoint( ray.origin ) ); // get the w component to scale the world space line width

			clipToWorldVector.set( 0, 0, - distanceToBox, 1.0 ).applyMatrix4( camera.projectionMatrix );

			clipToWorldVector.multiplyScalar( 1.0 / clipToWorldVector.w );

			clipToWorldVector.applyMatrix4( camera.projectionMatrixInverse ); // increase the sphere bounds by the worst case line screen space width


			const boxMargin = Math.abs( ssMaxWidth / clipToWorldVector.w ) * 0.5;
			box.max.x += boxMargin;
			box.max.y += boxMargin;
			box.max.z += boxMargin;
			box.min.x -= boxMargin;
			box.min.y -= boxMargin;
			box.min.z -= boxMargin;

			if ( raycaster.ray.intersectsBox( box ) === false ) {

				return;

			} //
			// pick a point 1 unit out along the ray to avoid the ray origin
			// sitting at the camera origin which will cause "w" to be 0 when
			// applying the projection matrix.


			ray.at( 1, ssOrigin ); // ndc space [ - 1.0, 1.0 ]

			ssOrigin.w = 1;

			ssOrigin.applyMatrix4( camera.matrixWorldInverse );

			ssOrigin.applyMatrix4( projectionMatrix );

			ssOrigin.multiplyScalar( 1 / ssOrigin.w ); // screen space


			ssOrigin.x *= resolution.x / 2;
			ssOrigin.y *= resolution.y / 2;
			ssOrigin.z = 0;

			ssOrigin3.copy( ssOrigin );

			mvMatrix.multiplyMatrices( camera.matrixWorldInverse, matrixWorld );

			for ( let i = 0, l = instanceStart.count; i < l; i ++ ) {

				start4.fromBufferAttribute( instanceStart, i );

				end4.fromBufferAttribute( instanceEnd, i );

				start4.w = 1;
				end4.w = 1; // camera space

				start4.applyMatrix4( mvMatrix );

				end4.applyMatrix4( mvMatrix ); // skip the segment if it's entirely behind the camera


				var isBehindCameraNear = start4.z > near && end4.z > near;

				if ( isBehindCameraNear ) {

					continue;

				} // trim the segment if it extends behind camera near


				if ( start4.z > near ) {

					const deltaDist = start4.z - end4.z;
					const t = ( start4.z - near ) / deltaDist;

					start4.lerp( end4, t );

				} else if ( end4.z > near ) {

					const deltaDist = end4.z - start4.z;
					const t = ( end4.z - near ) / deltaDist;

					end4.lerp( start4, t );

				} // clip space


				start4.applyMatrix4( projectionMatrix );

				end4.applyMatrix4( projectionMatrix ); // ndc space [ - 1.0, 1.0 ]


				start4.multiplyScalar( 1 / start4.w );

				end4.multiplyScalar( 1 / end4.w ); // screen space


				start4.x *= resolution.x / 2;
				start4.y *= resolution.y / 2;
				end4.x *= resolution.x / 2;
				end4.y *= resolution.y / 2; // create 2d segment

				line.start.copy( start4 );

				line.start.z = 0;

				line.end.copy( end4 );

				line.end.z = 0; // get closest point on ray to segment

				const param = line.closestPointToPointParameter( ssOrigin3, true );

				line.at( param, closestPoint ); // check if the intersection point is within clip space


				const zPos = THREE.MathUtils.lerp( start4.z, end4.z, param );
				const isInClipSpace = zPos >= - 1 && zPos <= 1;
				const isInside = ssOrigin3.distanceTo( closestPoint ) < lineWidth * 0.5;

				if ( isInClipSpace && isInside ) {

					line.start.fromBufferAttribute( instanceStart, i );

					line.end.fromBufferAttribute( instanceEnd, i );

					line.start.applyMatrix4( matrixWorld );

					line.end.applyMatrix4( matrixWorld );

					const pointOnLine = new THREE.Vector3();
					const point = new THREE.Vector3();
					ray.distanceSqToSegment( line.start, line.end, point, pointOnLine );
					intersects.push( {
						point: point,
						pointOnLine: pointOnLine,
						distance: ray.origin.distanceTo( point ),
						object: this,
						face: null,
						faceIndex: i,
						uv: null,
						uv2: null
					} );
				}
			}
		}

	}() );
}

LineSegments2.prototype.LineSegments2 = true;




/***/ }),

/***/ "./externals/lines/LineSegmentsGeometry.js":
/*!*************************************************!*\
  !*** ./externals/lines/LineSegmentsGeometry.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LineSegmentsGeometry": () => (/* binding */ LineSegmentsGeometry)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */




class LineSegmentsGeometry  extends three__WEBPACK_IMPORTED_MODULE_0__.InstancedBufferGeometry {
	constructor() {

		super();
		this.type = 'LineSegmentsGeometry';
		const positions = [ - 1, 2, 0, 1, 2, 0, - 1, 1, 0, 1, 1, 0, - 1, 0, 0, 1, 0, 0, - 1, - 1, 0, 1, - 1, 0 ];
		const uvs = [ - 1, 2, 1, 2, - 1, 1, 1, 1, - 1, - 1, 1, - 1, - 1, - 2, 1, - 2 ];
		const index = [ 0, 2, 1, 2, 3, 1, 2, 4, 3, 4, 5, 3, 4, 6, 5, 6, 7, 5 ];
		this.setIndex( index );
		this.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( positions, 3 ) );
		this.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( uvs, 2 ) );

	}

	computeBoundingBox = function () {

		var box = new three__WEBPACK_IMPORTED_MODULE_0__.Box3();

		return function computeBoundingBox() {

			if ( this.boundingBox === null ) {

				this.boundingBox = new three__WEBPACK_IMPORTED_MODULE_0__.Box3();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				this.boundingBox.setFromBufferAttribute( start );

				box.setFromBufferAttribute( end );

				this.boundingBox.union( box );

			}

		};

	}();

	computeBoundingSphere = function () {

		var vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();

		return function computeBoundingSphere() {

			if ( this.boundingSphere === null ) {

				this.boundingSphere = new three__WEBPACK_IMPORTED_MODULE_0__.Sphere();

			}

			if ( this.boundingBox === null ) {

				this.computeBoundingBox();

			}

			var start = this.attributes.instanceStart;
			var end = this.attributes.instanceEnd;

			if ( start !== undefined && end !== undefined ) {

				var center = this.boundingSphere.center;

				this.boundingBox.getCenter( center );

				var maxRadiusSq = 0;

				for ( var i = 0, il = start.count; i < il; i ++ ) {

					vector.fromBufferAttribute( start, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

					vector.fromBufferAttribute( end, i );
					maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

				}

				this.boundingSphere.radius = Math.sqrt( maxRadiusSq );

				if ( isNaN( this.boundingSphere.radius ) ) {

					console.error( 'LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.', this );

				}

			}

		};

	}();

	applyMatrix4( matrix ) {

		const start = this.attributes.instanceStart;
		const end = this.attributes.instanceEnd;

		if ( start !== undefined ) {

			start.applyMatrix4( matrix );
			end.applyMatrix4( matrix );
			start.needsUpdate = true;

		}

		if ( this.boundingBox !== null ) {

			this.computeBoundingBox();

		}

		if ( this.boundingSphere !== null ) {

			this.computeBoundingSphere();

		}

		return this;

	}

	setPositions( array ) {

		let lineSegments;

		if ( array instanceof Float32Array ) {

			lineSegments = array;

		} else if ( Array.isArray( array ) ) {

			lineSegments = new Float32Array( array );

		}

		const instanceBuffer = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedInterleavedBuffer( lineSegments, 6, 1 ); // xyz, xyz

		this.setAttribute( 'instanceStart', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceBuffer, 3, 0 ) ); // xyz

		this.setAttribute( 'instanceEnd', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceBuffer, 3, 3 ) ); // xyz
		//

		this.computeBoundingBox();
		this.computeBoundingSphere();
		return this;

	}

	setColors( array ) {

		let colors;

		if ( array instanceof Float32Array ) {

			colors = array;

		} else if ( Array.isArray( array ) ) {

			colors = new Float32Array( array );

		}

		const instanceColorBuffer = new three__WEBPACK_IMPORTED_MODULE_0__.InstancedInterleavedBuffer( colors, 6, 1 ); // rgb, rgb
    instanceColorBuffer.setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage);

		this.setAttribute( 'instanceColorStart', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceColorBuffer, 3, 0 ) ); // rgb

		this.setAttribute( 'instanceColorEnd', new three__WEBPACK_IMPORTED_MODULE_0__.InterleavedBufferAttribute( instanceColorBuffer, 3, 3 ) ); // rgb

		return this;

	}

	fromWireframeGeometry( geometry ) {

		this.setPositions( geometry.attributes.position.array );
		return this;

	}

	fromEdgesGeometry( geometry ) {

		this.setPositions( geometry.attributes.position.array );
		return this;

	}

	fromMesh( mesh ) {

		this.fromWireframeGeometry( new three__WEBPACK_IMPORTED_MODULE_0__.WireframeGeometry( mesh.geometry ) ); // set colors, maybe

		return this;

	}

	fromLineSegments( lineSegments ) {

		const geometry = lineSegments.geometry;

		if ( geometry.isGeometry ) {

			console.error( 'THREE.LineSegmentsGeometry no longer supports Geometry. Use THREE.BufferGeometry instead.' );
			return;

		} else if ( geometry.isBufferGeometry ) {

			this.setPositions( geometry.attributes.position.array ); // assumes non-indexed

		} // set colors, maybe


		return this;

	}

	toJSON() { // todo
	}

	applyMatrix( matrix ) {

		console.warn( 'THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4().' );
		return this.applyMatrix4( matrix );

	}
}




/***/ }),

/***/ "three":
/*!************************!*\
  !*** external "three" ***!
  \************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_three__;

/***/ }),

/***/ "../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js":
/*!******************************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/postprocessing/EffectComposer.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EffectComposer": () => (/* binding */ EffectComposer),
/* harmony export */   "Pass": () => (/* binding */ Pass),
/* harmony export */   "FullScreenQuad": () => (/* binding */ FullScreenQuad)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/CopyShader.js */ "../../node_modules/three/examples/jsm/shaders/CopyShader.js");
/* harmony import */ var _ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ShaderPass.js */ "../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js");
/* harmony import */ var _MaskPass_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MaskPass.js */ "../../node_modules/three/examples/jsm/postprocessing/MaskPass.js");






class EffectComposer {

	constructor( renderer, renderTarget ) {

		this.renderer = renderer;

		if ( renderTarget === undefined ) {

			const parameters = {
				minFilter: three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,
				magFilter: three__WEBPACK_IMPORTED_MODULE_0__.LinearFilter,
				format: three__WEBPACK_IMPORTED_MODULE_0__.RGBAFormat
			};

			const size = renderer.getSize( new three__WEBPACK_IMPORTED_MODULE_0__.Vector2() );
			this._pixelRatio = renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;

			renderTarget = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderTarget( this._width * this._pixelRatio, this._height * this._pixelRatio, parameters );
			renderTarget.texture.name = 'EffectComposer.rt1';

		} else {

			this._pixelRatio = 1;
			this._width = renderTarget.width;
			this._height = renderTarget.height;

		}

		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();
		this.renderTarget2.texture.name = 'EffectComposer.rt2';

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

		this.renderToScreen = true;

		this.passes = [];

		// dependencies

		if ( _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.CopyShader === undefined ) {

			console.error( 'THREE.EffectComposer relies on CopyShader' );

		}

		if ( _ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.ShaderPass === undefined ) {

			console.error( 'THREE.EffectComposer relies on ShaderPass' );

		}

		this.copyPass = new _ShaderPass_js__WEBPACK_IMPORTED_MODULE_2__.ShaderPass( _shaders_CopyShader_js__WEBPACK_IMPORTED_MODULE_1__.CopyShader );

		this.clock = new three__WEBPACK_IMPORTED_MODULE_0__.Clock();

	}

	swapBuffers() {

		const tmp = this.readBuffer;
		this.readBuffer = this.writeBuffer;
		this.writeBuffer = tmp;

	}

	addPass( pass ) {

		this.passes.push( pass );
		pass.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );

	}

	insertPass( pass, index ) {

		this.passes.splice( index, 0, pass );
		pass.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );

	}

	removePass( pass ) {

		const index = this.passes.indexOf( pass );

		if ( index !== - 1 ) {

			this.passes.splice( index, 1 );

		}

	}

	isLastEnabledPass( passIndex ) {

		for ( let i = passIndex + 1; i < this.passes.length; i ++ ) {

			if ( this.passes[ i ].enabled ) {

				return false;

			}

		}

		return true;

	}

	render( deltaTime ) {

		// deltaTime value is in seconds

		if ( deltaTime === undefined ) {

			deltaTime = this.clock.getDelta();

		}

		const currentRenderTarget = this.renderer.getRenderTarget();

		let maskActive = false;

		for ( let i = 0, il = this.passes.length; i < il; i ++ ) {

			const pass = this.passes[ i ];

			if ( pass.enabled === false ) continue;

			pass.renderToScreen = ( this.renderToScreen && this.isLastEnabledPass( i ) );
			pass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime, maskActive );

			if ( pass.needsSwap ) {

				if ( maskActive ) {

					const context = this.renderer.getContext();
					const stencil = this.renderer.state.buffers.stencil;

					//context.stencilFunc( context.NOTEQUAL, 1, 0xffffffff );
					stencil.setFunc( context.NOTEQUAL, 1, 0xffffffff );

					this.copyPass.render( this.renderer, this.writeBuffer, this.readBuffer, deltaTime );

					//context.stencilFunc( context.EQUAL, 1, 0xffffffff );
					stencil.setFunc( context.EQUAL, 1, 0xffffffff );

				}

				this.swapBuffers();

			}

			if ( _MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.MaskPass !== undefined ) {

				if ( pass instanceof _MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.MaskPass ) {

					maskActive = true;

				} else if ( pass instanceof _MaskPass_js__WEBPACK_IMPORTED_MODULE_3__.ClearMaskPass ) {

					maskActive = false;

				}

			}

		}

		this.renderer.setRenderTarget( currentRenderTarget );

	}

	reset( renderTarget ) {

		if ( renderTarget === undefined ) {

			const size = this.renderer.getSize( new three__WEBPACK_IMPORTED_MODULE_0__.Vector2() );
			this._pixelRatio = this.renderer.getPixelRatio();
			this._width = size.width;
			this._height = size.height;

			renderTarget = this.renderTarget1.clone();
			renderTarget.setSize( this._width * this._pixelRatio, this._height * this._pixelRatio );

		}

		this.renderTarget1.dispose();
		this.renderTarget2.dispose();
		this.renderTarget1 = renderTarget;
		this.renderTarget2 = renderTarget.clone();

		this.writeBuffer = this.renderTarget1;
		this.readBuffer = this.renderTarget2;

	}

	setSize( width, height ) {

		this._width = width;
		this._height = height;

		const effectiveWidth = this._width * this._pixelRatio;
		const effectiveHeight = this._height * this._pixelRatio;

		this.renderTarget1.setSize( effectiveWidth, effectiveHeight );
		this.renderTarget2.setSize( effectiveWidth, effectiveHeight );

		for ( let i = 0; i < this.passes.length; i ++ ) {

			this.passes[ i ].setSize( effectiveWidth, effectiveHeight );

		}

	}

	setPixelRatio( pixelRatio ) {

		this._pixelRatio = pixelRatio;

		this.setSize( this._width, this._height );

	}

}


class Pass {

	constructor() {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
		this.renderToScreen = false;

	}

	setSize( /* width, height */ ) {}

	render( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

}

// Helper for passes that need to fill the viewport with a single quad.

const _camera = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

// https://github.com/mrdoob/three.js/pull/21358

const _geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
_geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ - 1, 3, 0, - 1, - 1, 0, 3, - 1, 0 ], 3 ) );
_geometry.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ 0, 2, 0, 0, 2, 0 ], 2 ) );

class FullScreenQuad {

	constructor( material ) {

		this._mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( _geometry, material );

	}

	dispose() {

		this._mesh.geometry.dispose();

	}

	render( renderer ) {

		renderer.render( this._mesh, _camera );

	}

	get material() {

		return this._mesh.material;

	}

	set material( value ) {

		this._mesh.material = value;

	}

}




/***/ }),

/***/ "../../node_modules/three/examples/jsm/postprocessing/MaskPass.js":
/*!************************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/postprocessing/MaskPass.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MaskPass": () => (/* binding */ MaskPass),
/* harmony export */   "ClearMaskPass": () => (/* binding */ ClearMaskPass)
/* harmony export */ });
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pass.js */ "../../node_modules/three/examples/jsm/postprocessing/Pass.js");


class MaskPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_0__.Pass {

	constructor( scene, camera ) {

		super();

		this.scene = scene;
		this.camera = camera;

		this.clear = true;
		this.needsSwap = false;

		this.inverse = false;

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		const context = renderer.getContext();
		const state = renderer.state;

		// don't update color or depth

		state.buffers.color.setMask( false );
		state.buffers.depth.setMask( false );

		// lock buffers

		state.buffers.color.setLocked( true );
		state.buffers.depth.setLocked( true );

		// set up stencil

		let writeValue, clearValue;

		if ( this.inverse ) {

			writeValue = 0;
			clearValue = 1;

		} else {

			writeValue = 1;
			clearValue = 0;

		}

		state.buffers.stencil.setTest( true );
		state.buffers.stencil.setOp( context.REPLACE, context.REPLACE, context.REPLACE );
		state.buffers.stencil.setFunc( context.ALWAYS, writeValue, 0xffffffff );
		state.buffers.stencil.setClear( clearValue );
		state.buffers.stencil.setLocked( true );

		// draw into the stencil buffer

		renderer.setRenderTarget( readBuffer );
		if ( this.clear ) renderer.clear();
		renderer.render( this.scene, this.camera );

		renderer.setRenderTarget( writeBuffer );
		if ( this.clear ) renderer.clear();
		renderer.render( this.scene, this.camera );

		// unlock color and depth buffer for subsequent rendering

		state.buffers.color.setLocked( false );
		state.buffers.depth.setLocked( false );

		// only render where stencil is set to 1

		state.buffers.stencil.setLocked( false );
		state.buffers.stencil.setFunc( context.EQUAL, 1, 0xffffffff ); // draw if == 1
		state.buffers.stencil.setOp( context.KEEP, context.KEEP, context.KEEP );
		state.buffers.stencil.setLocked( true );

	}

}

class ClearMaskPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_0__.Pass {

	constructor() {

		super();

		this.needsSwap = false;

	}

	render( renderer /*, writeBuffer, readBuffer, deltaTime, maskActive */ ) {

		renderer.state.buffers.stencil.setLocked( false );
		renderer.state.buffers.stencil.setTest( false );

	}

}




/***/ }),

/***/ "../../node_modules/three/examples/jsm/postprocessing/Pass.js":
/*!********************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/postprocessing/Pass.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Pass": () => (/* binding */ Pass),
/* harmony export */   "FullScreenQuad": () => (/* binding */ FullScreenQuad)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");


class Pass {

	constructor() {

		// if set to true, the pass is processed by the composer
		this.enabled = true;

		// if set to true, the pass indicates to swap read and write buffer after rendering
		this.needsSwap = true;

		// if set to true, the pass clears its buffer before rendering
		this.clear = false;

		// if set to true, the result of the pass is rendered to screen. This is set automatically by EffectComposer.
		this.renderToScreen = false;

	}

	setSize( /* width, height */ ) {}

	render( /* renderer, writeBuffer, readBuffer, deltaTime, maskActive */ ) {

		console.error( 'THREE.Pass: .render() must be implemented in derived pass.' );

	}

}

// Helper for passes that need to fill the viewport with a single quad.

const _camera = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

// https://github.com/mrdoob/three.js/pull/21358

const _geometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
_geometry.setAttribute( 'position', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ - 1, 3, 0, - 1, - 1, 0, 3, - 1, 0 ], 3 ) );
_geometry.setAttribute( 'uv', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute( [ 0, 2, 0, 0, 2, 0 ], 2 ) );

class FullScreenQuad {

	constructor( material ) {

		this._mesh = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh( _geometry, material );

	}

	dispose() {

		this._mesh.geometry.dispose();

	}

	render( renderer ) {

		renderer.render( this._mesh, _camera );

	}

	get material() {

		return this._mesh.material;

	}

	set material( value ) {

		this._mesh.material = value;

	}

}




/***/ }),

/***/ "../../node_modules/three/examples/jsm/postprocessing/RenderPass.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/postprocessing/RenderPass.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPass": () => (/* binding */ RenderPass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "../../node_modules/three/examples/jsm/postprocessing/Pass.js");



class RenderPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( scene, camera, overrideMaterial, clearColor, clearAlpha ) {

		super();

		this.scene = scene;
		this.camera = camera;

		this.overrideMaterial = overrideMaterial;

		this.clearColor = clearColor;
		this.clearAlpha = ( clearAlpha !== undefined ) ? clearAlpha : 0;

		this.clear = true;
		this.clearDepth = false;
		this.needsSwap = false;
		this._oldClearColor = new three__WEBPACK_IMPORTED_MODULE_0__.Color();

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		const oldAutoClear = renderer.autoClear;
		renderer.autoClear = false;

		let oldClearAlpha, oldOverrideMaterial;

		if ( this.overrideMaterial !== undefined ) {

			oldOverrideMaterial = this.scene.overrideMaterial;

			this.scene.overrideMaterial = this.overrideMaterial;

		}

		if ( this.clearColor ) {

			renderer.getClearColor( this._oldClearColor );
			oldClearAlpha = renderer.getClearAlpha();

			renderer.setClearColor( this.clearColor, this.clearAlpha );

		}

		if ( this.clearDepth ) {

			renderer.clearDepth();

		}

		renderer.setRenderTarget( this.renderToScreen ? null : readBuffer );

		// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
		if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
		renderer.render( this.scene, this.camera );

		if ( this.clearColor ) {

			renderer.setClearColor( this._oldClearColor, oldClearAlpha );

		}

		if ( this.overrideMaterial !== undefined ) {

			this.scene.overrideMaterial = oldOverrideMaterial;

		}

		renderer.autoClear = oldAutoClear;

	}

}




/***/ }),

/***/ "../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js":
/*!**************************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/postprocessing/ShaderPass.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShaderPass": () => (/* binding */ ShaderPass)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var _Pass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pass.js */ "../../node_modules/three/examples/jsm/postprocessing/Pass.js");



class ShaderPass extends _Pass_js__WEBPACK_IMPORTED_MODULE_1__.Pass {

	constructor( shader, textureID ) {

		super();

		this.textureID = ( textureID !== undefined ) ? textureID : 'tDiffuse';

		if ( shader instanceof three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial ) {

			this.uniforms = shader.uniforms;

			this.material = shader;

		} else if ( shader ) {

			this.uniforms = three__WEBPACK_IMPORTED_MODULE_0__.UniformsUtils.clone( shader.uniforms );

			this.material = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial( {

				defines: Object.assign( {}, shader.defines ),
				uniforms: this.uniforms,
				vertexShader: shader.vertexShader,
				fragmentShader: shader.fragmentShader

			} );

		}

		this.fsQuad = new _Pass_js__WEBPACK_IMPORTED_MODULE_1__.FullScreenQuad( this.material );

	}

	render( renderer, writeBuffer, readBuffer /*, deltaTime, maskActive */ ) {

		if ( this.uniforms[ this.textureID ] ) {

			this.uniforms[ this.textureID ].value = readBuffer.texture;

		}

		this.fsQuad.material = this.material;

		if ( this.renderToScreen ) {

			renderer.setRenderTarget( null );
			this.fsQuad.render( renderer );

		} else {

			renderer.setRenderTarget( writeBuffer );
			// TODO: Avoid using autoClear properties, see https://github.com/mrdoob/three.js/pull/15571#issuecomment-465669600
			if ( this.clear ) renderer.clear( renderer.autoClearColor, renderer.autoClearDepth, renderer.autoClearStencil );
			this.fsQuad.render( renderer );

		}

	}

}




/***/ }),

/***/ "../../node_modules/three/examples/jsm/shaders/CopyShader.js":
/*!*******************************************************************!*\
  !*** ../../node_modules/three/examples/jsm/shaders/CopyShader.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CopyShader": () => (/* binding */ CopyShader)
/* harmony export */ });
/**
 * Full-screen textured quad shader
 */

var CopyShader = {

	uniforms: {

		'tDiffuse': { value: null },
		'opacity': { value: 1.0 }

	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`

};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PretyGraph": () => (/* reexport safe */ _lib_core__WEBPACK_IMPORTED_MODULE_0__.PretyGraph)
/* harmony export */ });
/* harmony import */ var _lib_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/core */ "./src/lib/core.ts");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxZQUFZLENBQUMifQ==
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});