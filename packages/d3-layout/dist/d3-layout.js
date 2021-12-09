(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("d3Layout", [], factory);
	else if(typeof exports === 'object')
		exports["d3Layout"] = factory();
	else
		root["d3Layout"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/lib/layout.ts":
/*!***************************!*\
  !*** ./src/lib/layout.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Layout": () => (/* binding */ Layout)
/* harmony export */ });
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/manyBody.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/link.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/simulation.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/center.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/x.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/y.js");
/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-force */ "./node_modules/d3-force/src/collide.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ "./src/lib/emitter.ts");


class Layout {
    constructor() {
        this.onEvent = new _emitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
        this._nodes = [];
        this._links = [];
        this._options = {};
    }
    init(options) {
        this._nodes = options.nodes;
        this._links = options.links;
        this._options = options.layoutOptions;
        let mainBody = (0,d3_force__WEBPACK_IMPORTED_MODULE_1__["default"])();
        let fLink = (0,d3_force__WEBPACK_IMPORTED_MODULE_2__["default"])(this._links).id((d) => d.id);
        if (this._options.mainBody.strength) {
            mainBody = mainBody.strength(this._options.mainBody.strength);
        }
        if (this._options.mainBody.distanceMin) {
            mainBody = mainBody.distanceMin(this._options.mainBody.distanceMin);
        }
        if (this._options.mainBody.distanceMax) {
            mainBody = mainBody.distanceMax(this._options.mainBody.distanceMax);
        }
        if (this._options.linkDistance) {
            fLink = fLink.distance(this._options.linkDistance);
        }
        this._simulation = (0,d3_force__WEBPACK_IMPORTED_MODULE_3__["default"])(this._nodes)
            .force('charge', mainBody)
            .force('link', fLink)
            .force('center', (0,d3_force__WEBPACK_IMPORTED_MODULE_4__["default"])())
            .force('x', (0,d3_force__WEBPACK_IMPORTED_MODULE_5__["default"])().strength(0.1))
            .force('y', (0,d3_force__WEBPACK_IMPORTED_MODULE_6__["default"])().strength(0.1))
            .force('collision', (0,d3_force__WEBPACK_IMPORTED_MODULE_7__["default"])().radius((d) => {
            return d.size;
        }).iterations(2))
            .velocityDecay(0.08)
            .stop();
    }
    calculate() {
        for (let i = 0, n = Math.ceil(Math.log(this._simulation.alphaMin()) / Math.log(1 - this._simulation.alphaDecay())); i < n; ++i) {
            this.onEvent.emit('tick', i / n);
            this._simulation.tick();
        }
        this.onEvent.emit('end', { nodes: this._nodes, links: this._links });
    }
    destroy() {
        this._simulation.stop();
        this._simulation = null;
        this._links = [];
        this._nodes = [];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUNULGFBQWEsRUFDYixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sR0FFUCxNQUFNLFVBQVUsQ0FBQztBQUVsQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXpDLE1BQU0sT0FBTyxNQUFNO0lBQW5CO1FBRVMsWUFBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTFDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUVuQixhQUFRLEdBQVEsRUFBRSxDQUFDO0lBc0Q3QixDQUFDO0lBcERRLElBQUksQ0FBQyxPQUFZO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRXRDLElBQUksUUFBUSxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFB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

/***/ }),

/***/ "./src/lib/options.ts":
/*!****************************!*\
  !*** ./src/lib/options.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultOptions": () => (/* binding */ defaultOptions)
/* harmony export */ });
const defaultOptions = {
    layoutOptions: {
        linkDistance: 300,
        mainBody: {
            distanceMin: 1,
            strength: -1000
        }
    },
    useWebworker: true
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZQSxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDNUIsYUFBYSxFQUFFO1FBQ2IsWUFBWSxFQUFFLEdBQUc7UUFDakIsUUFBUSxFQUFFO1lBQ1IsV0FBVyxFQUFFLENBQUM7WUFDZCxRQUFRLEVBQUUsQ0FBQyxJQUFJO1NBQ2hCO0tBQ0Y7SUFDRCxZQUFZLEVBQUUsSUFBSTtDQUNuQixDQUFBIn0=

/***/ }),

/***/ "./src/lib/supervisor.ts":
/*!*******************************!*\
  !*** ./src/lib/supervisor.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "D3Layout": () => (/* binding */ D3Layout)
/* harmony export */ });
/* harmony import */ var worker_loader_inline_no_fallback_d3_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! worker-loader?inline=no-fallback!./d3.worker */ "./node_modules/worker-loader/dist/cjs.js?inline=no-fallback!./src/lib/d3.worker.ts");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emitter */ "./src/lib/emitter.ts");
/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout */ "./src/lib/layout.ts");
/* harmony import */ var _options__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options */ "./src/lib/options.ts");
/* tslint:disable-next-line */




class D3Layout {
    constructor(options) {
        this.onEvent = new _emitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this._options = { ..._options__WEBPACK_IMPORTED_MODULE_3__.defaultOptions, ...options };
        if (this._options.useWorker) {
            this._worker = new worker_loader_inline_no_fallback_d3_worker__WEBPACK_IMPORTED_MODULE_0__["default"]();
        }
        else {
            this._layout = new _layout__WEBPACK_IMPORTED_MODULE_2__.Layout();
        }
    }
    init(data) {
        if (this._options.useWorker && this._worker) {
            this._worker.postMessage({
                height: data.height || 0,
                layoutOptions: this._options.layoutOptions,
                links: data.links || [],
                name: 'init',
                nodes: data.nodes || [],
                width: data.width || 0
            });
            this._worker.onmessage = (e) => {
                switch (e.data.type) {
                    case 'tick':
                        this.onEvent.emit('tick', e.data.progress);
                        break;
                    case 'end':
                        this.onEvent.emit('end', e.data.d);
                        break;
                }
            };
        }
        else {
            if (this._layout) {
                this._layout.init({
                    height: data.height || 0,
                    layoutOptions: this._options.layoutOptions,
                    links: data.links || [],
                    nodes: data.nodes || [],
                    width: data.width || 0,
                });
                this._layout.onEvent.on('tick', (percent) => {
                    this.onEvent.emit('tick', percent);
                });
                this._layout.onEvent.on('end', (d) => {
                    this.onEvent.emit('end', d);
                });
            }
        }
    }
    calculate() {
        if (this._options.useWorker && this._worker) {
            this._worker.postMessage({
                name: 'calculate'
            });
        }
        else {
            if (this._layout) {
                this._layout.calculate();
            }
        }
    }
    destroy() {
        if (this._options.useWorker && this._worker) {
            this._worker.postMessage({
                name: 'destroy'
            });
            this._worker.terminate();
            this._worker = null;
        }
        else {
            if (this._layout) {
                this._layout.onEvent.removeAllListeners();
                this._layout.destroy();
            }
            this._layout = null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwZXJ2aXNvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvc3VwZXJ2aXNvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4QkFBOEI7QUFDOUIsT0FBTyxNQUFNLE1BQU0sOENBQThDLENBQUM7QUFFbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sV0FBVyxDQUFDO0FBRTFELE1BQU0sT0FBTyxRQUFRO0lBVW5CLFlBQVksT0FBc0I7UUFSM0IsWUFBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBU2hELElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxHQUFHLGNBQWMsRUFBRSxHQUFHLE9BQU8sRUFBQyxDQUFDO1FBRWhELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1NBQzdCO2FBQU07WUFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7U0FDN0I7SUFDSCxDQUFDO0lBRU0sSUFBSSxDQUFDLElBQVM7UUFDbkIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO2dCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO2dCQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhO2dCQUMxQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN2QixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUN2QixL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

/***/ }),

/***/ "./node_modules/worker-loader/dist/cjs.js?inline=no-fallback!./src/lib/d3.worker.ts":
/*!******************************************************************************************!*\
  !*** ./node_modules/worker-loader/dist/cjs.js?inline=no-fallback!./src/lib/d3.worker.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Worker_fn)
/* harmony export */ });
/* harmony import */ var _node_modules_worker_loader_dist_runtime_inline_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !!../../node_modules/worker-loader/dist/runtime/inline.js */ "./node_modules/worker-loader/dist/runtime/inline.js");
/* harmony import */ var _node_modules_worker_loader_dist_runtime_inline_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_worker_loader_dist_runtime_inline_js__WEBPACK_IMPORTED_MODULE_0__);



function Worker_fn() {
  return _node_modules_worker_loader_dist_runtime_inline_js__WEBPACK_IMPORTED_MODULE_0___default()("/******/ (() => { // webpackBootstrap\n/******/ \t\"use strict\";\n/******/ \tvar __webpack_modules__ = ({\n\n/***/ \"./src/lib/emitter.ts\":\n/*!****************************!*\\\n  !*** ./src/lib/emitter.ts ***!\n  \\****************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventEmitter\": () => (/* binding */ EventEmitter)\n/* harmony export */ });\nclass EventEmitter {\n    constructor() {\n        this.events = {};\n    }\n    on(event, listener) {\n        if (typeof this.events[event] !== \"object\") {\n            this.events[event] = [];\n        }\n        this.events[event].push(listener);\n        return () => this.removeListener(event, listener);\n    }\n    removeListener(event, listener) {\n        if (typeof this.events[event] !== \"object\") {\n            return;\n        }\n        const idx = this.events[event].indexOf(listener);\n        if (idx > -1) {\n            this.events[event].splice(idx, 1);\n        }\n    }\n    removeAllListeners() {\n        Object.keys(this.events).forEach((event) => this.events[event].splice(0, this.events[event].length));\n    }\n    emit(event, ...args) {\n        if (typeof this.events[event] !== \"object\") {\n            return;\n        }\n        [...this.events[event]].forEach((listener) => listener.apply(this, args));\n    }\n    once(event, listener) {\n        const remove = this.on(event, (...args) => {\n            remove();\n            listener.apply(this, args);\n        });\n        return remove;\n    }\n}\n/***/ }),\n\n/***/ \"./src/lib/layout.ts\":\n/*!***************************!*\\\n  !*** ./src/lib/layout.ts ***!\n  \\***************************/\n/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layout\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/manyBody.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/link.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/simulation.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/center.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/x.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/y.js\");\n/* harmony import */ var d3_force__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-force */ \"./node_modules/d3-force/src/collide.js\");\n/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./emitter */ \"./src/lib/emitter.ts\");\n\n\nclass Layout {\n    constructor() {\n        this.onEvent = new _emitter__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();\n        this._nodes = [];\n        this._links = [];\n        this._options = {};\n    }\n    init(options) {\n        this._nodes = options.nodes;\n        this._links = options.links;\n        this._options = options.layoutOptions;\n        let mainBody = (0,d3_force__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n        let fLink = (0,d3_force__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(this._links).id((d) => d.id);\n        if (this._options.mainBody.strength) {\n            mainBody = mainBody.strength(this._options.mainBody.strength);\n        }\n        if (this._options.mainBody.distanceMin) {\n            mainBody = mainBody.distanceMin(this._options.mainBody.distanceMin);\n        }\n        if (this._options.mainBody.distanceMax) {\n            mainBody = mainBody.distanceMax(this._options.mainBody.distanceMax);\n        }\n        if (this._options.linkDistance) {\n            fLink = fLink.distance(this._options.linkDistance);\n        }\n        this._simulation = (0,d3_force__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(this._nodes)\n            .force('charge', mainBody)\n            .force('link', fLink)\n            .force('center', (0,d3_force__WEBPACK_IMPORTED_MODULE_4__[\"default\"])())\n            .force('x', (0,d3_force__WEBPACK_IMPORTED_MODULE_5__[\"default\"])().strength(0.1))\n            .force('y', (0,d3_force__WEBPACK_IMPORTED_MODULE_6__[\"default\"])().strength(0.1))\n            .force('collision', (0,d3_force__WEBPACK_IMPORTED_MODULE_7__[\"default\"])().radius((d) => {\n            return d.size;\n        }).iterations(2))\n            .velocityDecay(0.08)\n            .stop();\n    }\n    calculate() {\n        for (let i = 0, n = Math.ceil(Math.log(this._simulation.alphaMin()) / Math.log(1 - this._simulation.alphaDecay())); i < n; ++i) {\n            this.onEvent.emit('tick', i / n);\n            this._simulation.tick();\n        }\n        this.onEvent.emit('end', { nodes: this._nodes, links: this._links });\n    }\n    destroy() {\n        this._simulation.stop();\n        this._simulation = null;\n        this._links = [];\n        this._nodes = [];\n    }\n}\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9sYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFdBQVcsRUFDWCxZQUFZLEVBQ1osU0FBUyxFQUNULGFBQWEsRUFDYixlQUFlLEVBQ2YsTUFBTSxFQUNOLE1BQU0sR0FFUCxNQUFNLFVBQVUsQ0FBQztBQUVsQixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXpDLE1BQU0sT0FBTyxNQUFNO0lBQW5CO1FBRVMsWUFBTyxHQUFpQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTFDLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUVuQixhQUFRLEdBQVEsRUFBRSxDQUFDO0lBc0Q3QixDQUFDO0lBcERRLElBQUksQ0FBQyxPQUFZO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDO1FBRXRDLElBQUksUUFBUSxHQUFHLGFBQWEsRUFBRSxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFB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\n\n/***/ }),\n\n/***/ \"./node_modules/d3-dispatch/src/dispatch.js\":\n/*!**************************************************!*\\\n  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!\n  \\**************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar noop = {value: () => {}};\n\nfunction dispatch() {\n  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {\n    if (!(t = arguments[i] + \"\") || (t in _) || /[\\s.]/.test(t)) throw new Error(\"illegal type: \" + t);\n    _[t] = [];\n  }\n  return new Dispatch(_);\n}\n\nfunction Dispatch(_) {\n  this._ = _;\n}\n\nfunction parseTypenames(typenames, types) {\n  return typenames.trim().split(/^|\\s+/).map(function(t) {\n    var name = \"\", i = t.indexOf(\".\");\n    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);\n    if (t && !types.hasOwnProperty(t)) throw new Error(\"unknown type: \" + t);\n    return {type: t, name: name};\n  });\n}\n\nDispatch.prototype = dispatch.prototype = {\n  constructor: Dispatch,\n  on: function(typename, callback) {\n    var _ = this._,\n        T = parseTypenames(typename + \"\", _),\n        t,\n        i = -1,\n        n = T.length;\n\n    // If no callback was specified, return the callback of the given type and name.\n    if (arguments.length < 2) {\n      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;\n      return;\n    }\n\n    // If a type was specified, set the callback for the given type and name.\n    // Otherwise, if a null callback was specified, remove callbacks of the given name.\n    if (callback != null && typeof callback !== \"function\") throw new Error(\"invalid callback: \" + callback);\n    while (++i < n) {\n      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);\n      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);\n    }\n\n    return this;\n  },\n  copy: function() {\n    var copy = {}, _ = this._;\n    for (var t in _) copy[t] = _[t].slice();\n    return new Dispatch(copy);\n  },\n  call: function(type, that) {\n    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  },\n  apply: function(type, that, args) {\n    if (!this._.hasOwnProperty(type)) throw new Error(\"unknown type: \" + type);\n    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);\n  }\n};\n\nfunction get(type, name) {\n  for (var i = 0, n = type.length, c; i < n; ++i) {\n    if ((c = type[i]).name === name) {\n      return c.value;\n    }\n  }\n}\n\nfunction set(type, name, callback) {\n  for (var i = 0, n = type.length; i < n; ++i) {\n    if (type[i].name === name) {\n      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));\n      break;\n    }\n  }\n  if (callback != null) type.push({name: name, value: callback});\n  return type;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/center.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/d3-force/src/center.js ***!\n  \\*********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {\n  var nodes, strength = 1;\n\n  if (x == null) x = 0;\n  if (y == null) y = 0;\n\n  function force() {\n    var i,\n        n = nodes.length,\n        node,\n        sx = 0,\n        sy = 0;\n\n    for (i = 0; i < n; ++i) {\n      node = nodes[i], sx += node.x, sy += node.y;\n    }\n\n    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {\n      node = nodes[i], node.x -= sx, node.y -= sy;\n    }\n  }\n\n  force.initialize = function(_) {\n    nodes = _;\n  };\n\n  force.x = function(_) {\n    return arguments.length ? (x = +_, force) : x;\n  };\n\n  force.y = function(_) {\n    return arguments.length ? (y = +_, force) : y;\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = +_, force) : strength;\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/collide.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-force/src/collide.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-quadtree */ \"./node_modules/d3-quadtree/src/quadtree.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-force/src/constant.js\");\n/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jiggle.js */ \"./node_modules/d3-force/src/jiggle.js\");\n\n\n\n\nfunction x(d) {\n  return d.x + d.vx;\n}\n\nfunction y(d) {\n  return d.y + d.vy;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius) {\n  var nodes,\n      radii,\n      random,\n      strength = 1,\n      iterations = 1;\n\n  if (typeof radius !== \"function\") radius = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(radius == null ? 1 : +radius);\n\n  function force() {\n    var i, n = nodes.length,\n        tree,\n        node,\n        xi,\n        yi,\n        ri,\n        ri2;\n\n    for (var k = 0; k < iterations; ++k) {\n      tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(nodes, x, y).visitAfter(prepare);\n      for (i = 0; i < n; ++i) {\n        node = nodes[i];\n        ri = radii[node.index], ri2 = ri * ri;\n        xi = node.x + node.vx;\n        yi = node.y + node.vy;\n        tree.visit(apply);\n      }\n    }\n\n    function apply(quad, x0, y0, x1, y1) {\n      var data = quad.data, rj = quad.r, r = ri + rj;\n      if (data) {\n        if (data.index > node.index) {\n          var x = xi - data.x - data.vx,\n              y = yi - data.y - data.vy,\n              l = x * x + y * y;\n          if (l < r * r) {\n            if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(random), l += x * x;\n            if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(random), l += y * y;\n            l = (r - (l = Math.sqrt(l))) / l * strength;\n            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));\n            node.vy += (y *= l) * r;\n            data.vx -= x * (r = 1 - r);\n            data.vy -= y * r;\n          }\n        }\n        return;\n      }\n      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;\n    }\n  }\n\n  function prepare(quad) {\n    if (quad.data) return quad.r = radii[quad.data.index];\n    for (var i = quad.r = 0; i < 4; ++i) {\n      if (quad[i] && quad[i].r > quad.r) {\n        quad.r = quad[i].r;\n      }\n    }\n  }\n\n  function initialize() {\n    if (!nodes) return;\n    var i, n = nodes.length, node;\n    radii = new Array(n);\n    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);\n  }\n\n  force.initialize = function(_nodes, _random) {\n    nodes = _nodes;\n    random = _random;\n    initialize();\n  };\n\n  force.iterations = function(_) {\n    return arguments.length ? (iterations = +_, force) : iterations;\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = +_, force) : strength;\n  };\n\n  force.radius = function(_) {\n    return arguments.length ? (radius = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : radius;\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/constant.js\":\n/*!***********************************************!*\\\n  !*** ./node_modules/d3-force/src/constant.js ***!\n  \\***********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  return function() {\n    return x;\n  };\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/jiggle.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/d3-force/src/jiggle.js ***!\n  \\*********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(random) {\n  return (random() - 0.5) * 1e-6;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/lcg.js\":\n/*!******************************************!*\\\n  !*** ./node_modules/d3-force/src/lcg.js ***!\n  \\******************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use\nconst a = 1664525;\nconst c = 1013904223;\nconst m = 4294967296; // 2^32\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  let s = 1;\n  return () => (s = (a * s + c) % m) / m;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/link.js\":\n/*!*******************************************!*\\\n  !*** ./node_modules/d3-force/src/link.js ***!\n  \\*******************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-force/src/constant.js\");\n/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle.js */ \"./node_modules/d3-force/src/jiggle.js\");\n\n\n\nfunction index(d) {\n  return d.index;\n}\n\nfunction find(nodeById, nodeId) {\n  var node = nodeById.get(nodeId);\n  if (!node) throw new Error(\"node not found: \" + nodeId);\n  return node;\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(links) {\n  var id = index,\n      strength = defaultStrength,\n      strengths,\n      distance = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(30),\n      distances,\n      nodes,\n      count,\n      bias,\n      random,\n      iterations = 1;\n\n  if (links == null) links = [];\n\n  function defaultStrength(link) {\n    return 1 / Math.min(count[link.source.index], count[link.target.index]);\n  }\n\n  function force(alpha) {\n    for (var k = 0, n = links.length; k < iterations; ++k) {\n      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {\n        link = links[i], source = link.source, target = link.target;\n        x = target.x + target.vx - source.x - source.vx || (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(random);\n        y = target.y + target.vy - source.y - source.vy || (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(random);\n        l = Math.sqrt(x * x + y * y);\n        l = (l - distances[i]) / l * alpha * strengths[i];\n        x *= l, y *= l;\n        target.vx -= x * (b = bias[i]);\n        target.vy -= y * b;\n        source.vx += x * (b = 1 - b);\n        source.vy += y * b;\n      }\n    }\n  }\n\n  function initialize() {\n    if (!nodes) return;\n\n    var i,\n        n = nodes.length,\n        m = links.length,\n        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),\n        link;\n\n    for (i = 0, count = new Array(n); i < m; ++i) {\n      link = links[i], link.index = i;\n      if (typeof link.source !== \"object\") link.source = find(nodeById, link.source);\n      if (typeof link.target !== \"object\") link.target = find(nodeById, link.target);\n      count[link.source.index] = (count[link.source.index] || 0) + 1;\n      count[link.target.index] = (count[link.target.index] || 0) + 1;\n    }\n\n    for (i = 0, bias = new Array(m); i < m; ++i) {\n      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);\n    }\n\n    strengths = new Array(m), initializeStrength();\n    distances = new Array(m), initializeDistance();\n  }\n\n  function initializeStrength() {\n    if (!nodes) return;\n\n    for (var i = 0, n = links.length; i < n; ++i) {\n      strengths[i] = +strength(links[i], i, links);\n    }\n  }\n\n  function initializeDistance() {\n    if (!nodes) return;\n\n    for (var i = 0, n = links.length; i < n; ++i) {\n      distances[i] = +distance(links[i], i, links);\n    }\n  }\n\n  force.initialize = function(_nodes, _random) {\n    nodes = _nodes;\n    random = _random;\n    initialize();\n  };\n\n  force.links = function(_) {\n    return arguments.length ? (links = _, initialize(), force) : links;\n  };\n\n  force.id = function(_) {\n    return arguments.length ? (id = _, force) : id;\n  };\n\n  force.iterations = function(_) {\n    return arguments.length ? (iterations = +_, force) : iterations;\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initializeStrength(), force) : strength;\n  };\n\n  force.distance = function(_) {\n    return arguments.length ? (distance = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initializeDistance(), force) : distance;\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/manyBody.js\":\n/*!***********************************************!*\\\n  !*** ./node_modules/d3-force/src/manyBody.js ***!\n  \\***********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-quadtree */ \"./node_modules/d3-quadtree/src/quadtree.js\");\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-force/src/constant.js\");\n/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jiggle.js */ \"./node_modules/d3-force/src/jiggle.js\");\n/* harmony import */ var _simulation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simulation.js */ \"./node_modules/d3-force/src/simulation.js\");\n\n\n\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var nodes,\n      node,\n      random,\n      alpha,\n      strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(-30),\n      strengths,\n      distanceMin2 = 1,\n      distanceMax2 = Infinity,\n      theta2 = 0.81;\n\n  function force(_) {\n    var i, n = nodes.length, tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(nodes, _simulation_js__WEBPACK_IMPORTED_MODULE_2__.x, _simulation_js__WEBPACK_IMPORTED_MODULE_2__.y).visitAfter(accumulate);\n    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);\n  }\n\n  function initialize() {\n    if (!nodes) return;\n    var i, n = nodes.length, node;\n    strengths = new Array(n);\n    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);\n  }\n\n  function accumulate(quad) {\n    var strength = 0, q, c, weight = 0, x, y, i;\n\n    // For internal nodes, accumulate forces from child quadrants.\n    if (quad.length) {\n      for (x = y = i = 0; i < 4; ++i) {\n        if ((q = quad[i]) && (c = Math.abs(q.value))) {\n          strength += q.value, weight += c, x += c * q.x, y += c * q.y;\n        }\n      }\n      quad.x = x / weight;\n      quad.y = y / weight;\n    }\n\n    // For leaf nodes, accumulate forces from coincident quadrants.\n    else {\n      q = quad;\n      q.x = q.data.x;\n      q.y = q.data.y;\n      do strength += strengths[q.data.index];\n      while (q = q.next);\n    }\n\n    quad.value = strength;\n  }\n\n  function apply(quad, x1, _, x2) {\n    if (!quad.value) return true;\n\n    var x = quad.x - node.x,\n        y = quad.y - node.y,\n        w = x2 - x1,\n        l = x * x + y * y;\n\n    // Apply the Barnes-Hut approximation if possible.\n    // Limit forces for very close nodes; randomize direction if coincident.\n    if (w * w / theta2 < l) {\n      if (l < distanceMax2) {\n        if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(random), l += x * x;\n        if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(random), l += y * y;\n        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);\n        node.vx += x * quad.value * alpha / l;\n        node.vy += y * quad.value * alpha / l;\n      }\n      return true;\n    }\n\n    // Otherwise, process points directly.\n    else if (quad.length || l >= distanceMax2) return;\n\n    // Limit forces for very close nodes; randomize direction if coincident.\n    if (quad.data !== node || quad.next) {\n      if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(random), l += x * x;\n      if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(random), l += y * y;\n      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);\n    }\n\n    do if (quad.data !== node) {\n      w = strengths[quad.data.index] * alpha / l;\n      node.vx += x * w;\n      node.vy += y * w;\n    } while (quad = quad.next);\n  }\n\n  force.initialize = function(_nodes, _random) {\n    nodes = _nodes;\n    random = _random;\n    initialize();\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : strength;\n  };\n\n  force.distanceMin = function(_) {\n    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);\n  };\n\n  force.distanceMax = function(_) {\n    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);\n  };\n\n  force.theta = function(_) {\n    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/simulation.js\":\n/*!*************************************************!*\\\n  !*** ./node_modules/d3-force/src/simulation.js ***!\n  \\*************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"x\": () => (/* binding */ x),\n/* harmony export */   \"y\": () => (/* binding */ y),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-dispatch */ \"./node_modules/d3-dispatch/src/dispatch.js\");\n/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-timer */ \"./node_modules/d3-timer/src/timer.js\");\n/* harmony import */ var _lcg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lcg.js */ \"./node_modules/d3-force/src/lcg.js\");\n\n\n\n\nfunction x(d) {\n  return d.x;\n}\n\nfunction y(d) {\n  return d.y;\n}\n\nvar initialRadius = 10,\n    initialAngle = Math.PI * (3 - Math.sqrt(5));\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(nodes) {\n  var simulation,\n      alpha = 1,\n      alphaMin = 0.001,\n      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),\n      alphaTarget = 0,\n      velocityDecay = 0.6,\n      forces = new Map(),\n      stepper = (0,d3_timer__WEBPACK_IMPORTED_MODULE_0__.timer)(step),\n      event = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"tick\", \"end\"),\n      random = (0,_lcg_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n  if (nodes == null) nodes = [];\n\n  function step() {\n    tick();\n    event.call(\"tick\", simulation);\n    if (alpha < alphaMin) {\n      stepper.stop();\n      event.call(\"end\", simulation);\n    }\n  }\n\n  function tick(iterations) {\n    var i, n = nodes.length, node;\n\n    if (iterations === undefined) iterations = 1;\n\n    for (var k = 0; k < iterations; ++k) {\n      alpha += (alphaTarget - alpha) * alphaDecay;\n\n      forces.forEach(function(force) {\n        force(alpha);\n      });\n\n      for (i = 0; i < n; ++i) {\n        node = nodes[i];\n        if (node.fx == null) node.x += node.vx *= velocityDecay;\n        else node.x = node.fx, node.vx = 0;\n        if (node.fy == null) node.y += node.vy *= velocityDecay;\n        else node.y = node.fy, node.vy = 0;\n      }\n    }\n\n    return simulation;\n  }\n\n  function initializeNodes() {\n    for (var i = 0, n = nodes.length, node; i < n; ++i) {\n      node = nodes[i], node.index = i;\n      if (node.fx != null) node.x = node.fx;\n      if (node.fy != null) node.y = node.fy;\n      if (isNaN(node.x) || isNaN(node.y)) {\n        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;\n        node.x = radius * Math.cos(angle);\n        node.y = radius * Math.sin(angle);\n      }\n      if (isNaN(node.vx) || isNaN(node.vy)) {\n        node.vx = node.vy = 0;\n      }\n    }\n  }\n\n  function initializeForce(force) {\n    if (force.initialize) force.initialize(nodes, random);\n    return force;\n  }\n\n  initializeNodes();\n\n  return simulation = {\n    tick: tick,\n\n    restart: function() {\n      return stepper.restart(step), simulation;\n    },\n\n    stop: function() {\n      return stepper.stop(), simulation;\n    },\n\n    nodes: function(_) {\n      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;\n    },\n\n    alpha: function(_) {\n      return arguments.length ? (alpha = +_, simulation) : alpha;\n    },\n\n    alphaMin: function(_) {\n      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;\n    },\n\n    alphaDecay: function(_) {\n      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;\n    },\n\n    alphaTarget: function(_) {\n      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;\n    },\n\n    velocityDecay: function(_) {\n      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;\n    },\n\n    randomSource: function(_) {\n      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;\n    },\n\n    force: function(name, _) {\n      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);\n    },\n\n    find: function(x, y, radius) {\n      var i = 0,\n          n = nodes.length,\n          dx,\n          dy,\n          d2,\n          node,\n          closest;\n\n      if (radius == null) radius = Infinity;\n      else radius *= radius;\n\n      for (i = 0; i < n; ++i) {\n        node = nodes[i];\n        dx = x - node.x;\n        dy = y - node.y;\n        d2 = dx * dx + dy * dy;\n        if (d2 < radius) closest = node, radius = d2;\n      }\n\n      return closest;\n    },\n\n    on: function(name, _) {\n      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);\n    }\n  };\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/x.js\":\n/*!****************************************!*\\\n  !*** ./node_modules/d3-force/src/x.js ***!\n  \\****************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-force/src/constant.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {\n  var strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0.1),\n      nodes,\n      strengths,\n      xz;\n\n  if (typeof x !== \"function\") x = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(x == null ? 0 : +x);\n\n  function force(alpha) {\n    for (var i = 0, n = nodes.length, node; i < n; ++i) {\n      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;\n    }\n  }\n\n  function initialize() {\n    if (!nodes) return;\n    var i, n = nodes.length;\n    strengths = new Array(n);\n    xz = new Array(n);\n    for (i = 0; i < n; ++i) {\n      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);\n    }\n  }\n\n  force.initialize = function(_) {\n    nodes = _;\n    initialize();\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : strength;\n  };\n\n  force.x = function(_) {\n    return arguments.length ? (x = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : x;\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-force/src/y.js\":\n/*!****************************************!*\\\n  !*** ./node_modules/d3-force/src/y.js ***!\n  \\****************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ \"./node_modules/d3-force/src/constant.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(y) {\n  var strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(0.1),\n      nodes,\n      strengths,\n      yz;\n\n  if (typeof y !== \"function\") y = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(y == null ? 0 : +y);\n\n  function force(alpha) {\n    for (var i = 0, n = nodes.length, node; i < n; ++i) {\n      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;\n    }\n  }\n\n  function initialize() {\n    if (!nodes) return;\n    var i, n = nodes.length;\n    strengths = new Array(n);\n    yz = new Array(n);\n    for (i = 0; i < n; ++i) {\n      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);\n    }\n  }\n\n  force.initialize = function(_) {\n    nodes = _;\n    initialize();\n  };\n\n  force.strength = function(_) {\n    return arguments.length ? (strength = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : strength;\n  };\n\n  force.y = function(_) {\n    return arguments.length ? (y = typeof _ === \"function\" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(+_), initialize(), force) : y;\n  };\n\n  return force;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/add.js\":\n/*!*********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/add.js ***!\n  \\*********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"addAll\": () => (/* binding */ addAll)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {\n  const x = +this._x.call(null, d),\n      y = +this._y.call(null, d);\n  return add(this.cover(x, y), x, y, d);\n}\n\nfunction add(tree, x, y, d) {\n  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points\n\n  var parent,\n      node = tree._root,\n      leaf = {data: d},\n      x0 = tree._x0,\n      y0 = tree._y0,\n      x1 = tree._x1,\n      y1 = tree._y1,\n      xm,\n      ym,\n      xp,\n      yp,\n      right,\n      bottom,\n      i,\n      j;\n\n  // If the tree is empty, initialize the root as a leaf.\n  if (!node) return tree._root = leaf, tree;\n\n  // Find the existing leaf for the new point, or add it.\n  while (node.length) {\n    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;\n    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;\n    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;\n  }\n\n  // Is the new point is exactly coincident with the existing point?\n  xp = +tree._x.call(null, node.data);\n  yp = +tree._y.call(null, node.data);\n  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;\n\n  // Otherwise, split the leaf node until the old and new point are separated.\n  do {\n    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);\n    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;\n    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;\n  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));\n  return parent[j] = node, parent[i] = leaf, tree;\n}\n\nfunction addAll(data) {\n  var d, i, n = data.length,\n      x,\n      y,\n      xz = new Array(n),\n      yz = new Array(n),\n      x0 = Infinity,\n      y0 = Infinity,\n      x1 = -Infinity,\n      y1 = -Infinity;\n\n  // Compute the points and their extent.\n  for (i = 0; i < n; ++i) {\n    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;\n    xz[i] = x;\n    yz[i] = y;\n    if (x < x0) x0 = x;\n    if (x > x1) x1 = x;\n    if (y < y0) y0 = y;\n    if (y > y1) y1 = y;\n  }\n\n  // If there were no (valid) points, abort.\n  if (x0 > x1 || y0 > y1) return this;\n\n  // Expand the tree to cover the new points.\n  this.cover(x0, y0).cover(x1, y1);\n\n  // Add the new points.\n  for (i = 0; i < n; ++i) {\n    add(this, xz[i], yz[i], data[i]);\n  }\n\n  return this;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/cover.js\":\n/*!***********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/cover.js ***!\n  \\***********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {\n  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points\n\n  var x0 = this._x0,\n      y0 = this._y0,\n      x1 = this._x1,\n      y1 = this._y1;\n\n  // If the quadtree has no extent, initialize them.\n  // Integer extent are necessary so that if we later double the extent,\n  // the existing quadrant boundaries don’t change due to floating point error!\n  if (isNaN(x0)) {\n    x1 = (x0 = Math.floor(x)) + 1;\n    y1 = (y0 = Math.floor(y)) + 1;\n  }\n\n  // Otherwise, double repeatedly to cover.\n  else {\n    var z = x1 - x0 || 1,\n        node = this._root,\n        parent,\n        i;\n\n    while (x0 > x || x >= x1 || y0 > y || y >= y1) {\n      i = (y < y0) << 1 | (x < x0);\n      parent = new Array(4), parent[i] = node, node = parent, z *= 2;\n      switch (i) {\n        case 0: x1 = x0 + z, y1 = y0 + z; break;\n        case 1: x0 = x1 - z, y1 = y0 + z; break;\n        case 2: x1 = x0 + z, y0 = y1 - z; break;\n        case 3: x0 = x1 - z, y0 = y1 - z; break;\n      }\n    }\n\n    if (this._root && this._root.length) this._root = node;\n  }\n\n  this._x0 = x0;\n  this._y0 = y0;\n  this._x1 = x1;\n  this._y1 = y1;\n  return this;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/data.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/data.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var data = [];\n  this.visit(function(node) {\n    if (!node.length) do data.push(node.data); while (node = node.next)\n  });\n  return data;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/extent.js\":\n/*!************************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/extent.js ***!\n  \\************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {\n  return arguments.length\n      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])\n      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/find.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/find.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ \"./node_modules/d3-quadtree/src/quad.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y, radius) {\n  var data,\n      x0 = this._x0,\n      y0 = this._y0,\n      x1,\n      y1,\n      x2,\n      y2,\n      x3 = this._x1,\n      y3 = this._y1,\n      quads = [],\n      node = this._root,\n      q,\n      i;\n\n  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node, x0, y0, x3, y3));\n  if (radius == null) radius = Infinity;\n  else {\n    x0 = x - radius, y0 = y - radius;\n    x3 = x + radius, y3 = y + radius;\n    radius *= radius;\n  }\n\n  while (q = quads.pop()) {\n\n    // Stop searching if this quadrant can’t contain a closer node.\n    if (!(node = q.node)\n        || (x1 = q.x0) > x3\n        || (y1 = q.y0) > y3\n        || (x2 = q.x1) < x0\n        || (y2 = q.y1) < y0) continue;\n\n    // Bisect the current quadrant.\n    if (node.length) {\n      var xm = (x1 + x2) / 2,\n          ym = (y1 + y2) / 2;\n\n      quads.push(\n        new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node[3], xm, ym, x2, y2),\n        new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node[2], x1, ym, xm, y2),\n        new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node[1], xm, y1, x2, ym),\n        new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node[0], x1, y1, xm, ym)\n      );\n\n      // Visit the closest quadrant first.\n      if (i = (y >= ym) << 1 | (x >= xm)) {\n        q = quads[quads.length - 1];\n        quads[quads.length - 1] = quads[quads.length - 1 - i];\n        quads[quads.length - 1 - i] = q;\n      }\n    }\n\n    // Visit this point. (Visiting coincident points isn’t necessary!)\n    else {\n      var dx = x - +this._x.call(null, node.data),\n          dy = y - +this._y.call(null, node.data),\n          d2 = dx * dx + dy * dy;\n      if (d2 < radius) {\n        var d = Math.sqrt(radius = d2);\n        x0 = x - d, y0 = y - d;\n        x3 = x + d, y3 = y + d;\n        data = node.data;\n      }\n    }\n  }\n\n  return data;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/quad.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/quad.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, x0, y0, x1, y1) {\n  this.node = node;\n  this.x0 = x0;\n  this.y0 = y0;\n  this.x1 = x1;\n  this.y1 = y1;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/quadtree.js\":\n/*!**************************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/quadtree.js ***!\n  \\**************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ quadtree)\n/* harmony export */ });\n/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add.js */ \"./node_modules/d3-quadtree/src/add.js\");\n/* harmony import */ var _cover_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cover.js */ \"./node_modules/d3-quadtree/src/cover.js\");\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data.js */ \"./node_modules/d3-quadtree/src/data.js\");\n/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extent.js */ \"./node_modules/d3-quadtree/src/extent.js\");\n/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./find.js */ \"./node_modules/d3-quadtree/src/find.js\");\n/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remove.js */ \"./node_modules/d3-quadtree/src/remove.js\");\n/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./root.js */ \"./node_modules/d3-quadtree/src/root.js\");\n/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./size.js */ \"./node_modules/d3-quadtree/src/size.js\");\n/* harmony import */ var _visit_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./visit.js */ \"./node_modules/d3-quadtree/src/visit.js\");\n/* harmony import */ var _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./visitAfter.js */ \"./node_modules/d3-quadtree/src/visitAfter.js\");\n/* harmony import */ var _x_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./x.js */ \"./node_modules/d3-quadtree/src/x.js\");\n/* harmony import */ var _y_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./y.js */ \"./node_modules/d3-quadtree/src/y.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction quadtree(nodes, x, y) {\n  var tree = new Quadtree(x == null ? _x_js__WEBPACK_IMPORTED_MODULE_0__.defaultX : x, y == null ? _y_js__WEBPACK_IMPORTED_MODULE_1__.defaultY : y, NaN, NaN, NaN, NaN);\n  return nodes == null ? tree : tree.addAll(nodes);\n}\n\nfunction Quadtree(x, y, x0, y0, x1, y1) {\n  this._x = x;\n  this._y = y;\n  this._x0 = x0;\n  this._y0 = y0;\n  this._x1 = x1;\n  this._y1 = y1;\n  this._root = undefined;\n}\n\nfunction leaf_copy(leaf) {\n  var copy = {data: leaf.data}, next = copy;\n  while (leaf = leaf.next) next = next.next = {data: leaf.data};\n  return copy;\n}\n\nvar treeProto = quadtree.prototype = Quadtree.prototype;\n\ntreeProto.copy = function() {\n  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),\n      node = this._root,\n      nodes,\n      child;\n\n  if (!node) return copy;\n\n  if (!node.length) return copy._root = leaf_copy(node), copy;\n\n  nodes = [{source: node, target: copy._root = new Array(4)}];\n  while (node = nodes.pop()) {\n    for (var i = 0; i < 4; ++i) {\n      if (child = node.source[i]) {\n        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});\n        else node.target[i] = leaf_copy(child);\n      }\n    }\n  }\n\n  return copy;\n};\n\ntreeProto.add = _add_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"];\ntreeProto.addAll = _add_js__WEBPACK_IMPORTED_MODULE_2__.addAll;\ntreeProto.cover = _cover_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"];\ntreeProto.data = _data_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"];\ntreeProto.extent = _extent_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"];\ntreeProto.find = _find_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"];\ntreeProto.remove = _remove_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"];\ntreeProto.removeAll = _remove_js__WEBPACK_IMPORTED_MODULE_7__.removeAll;\ntreeProto.root = _root_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"];\ntreeProto.size = _size_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"];\ntreeProto.visit = _visit_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"];\ntreeProto.visitAfter = _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"];\ntreeProto.x = _x_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\ntreeProto.y = _y_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/remove.js\":\n/*!************************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/remove.js ***!\n  \\************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"removeAll\": () => (/* binding */ removeAll)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {\n  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points\n\n  var parent,\n      node = this._root,\n      retainer,\n      previous,\n      next,\n      x0 = this._x0,\n      y0 = this._y0,\n      x1 = this._x1,\n      y1 = this._y1,\n      x,\n      y,\n      xm,\n      ym,\n      right,\n      bottom,\n      i,\n      j;\n\n  // If the tree is empty, initialize the root as a leaf.\n  if (!node) return this;\n\n  // Find the leaf node for the point.\n  // While descending, also retain the deepest parent with a non-removed sibling.\n  if (node.length) while (true) {\n    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;\n    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;\n    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;\n    if (!node.length) break;\n    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;\n  }\n\n  // Find the point to remove.\n  while (node.data !== d) if (!(previous = node, node = node.next)) return this;\n  if (next = node.next) delete node.next;\n\n  // If there are multiple coincident points, remove just the point.\n  if (previous) return (next ? previous.next = next : delete previous.next), this;\n\n  // If this is the root point, remove it.\n  if (!parent) return this._root = next, this;\n\n  // Remove this leaf.\n  next ? parent[i] = next : delete parent[i];\n\n  // If the parent now contains exactly one leaf, collapse superfluous parents.\n  if ((node = parent[0] || parent[1] || parent[2] || parent[3])\n      && node === (parent[3] || parent[2] || parent[1] || parent[0])\n      && !node.length) {\n    if (retainer) retainer[j] = node;\n    else this._root = node;\n  }\n\n  return this;\n}\n\nfunction removeAll(data) {\n  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);\n  return this;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/root.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/root.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  return this._root;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/size.js\":\n/*!**********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/size.js ***!\n  \\**********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\n  var size = 0;\n  this.visit(function(node) {\n    if (!node.length) do ++size; while (node = node.next)\n  });\n  return size;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/visit.js\":\n/*!***********************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/visit.js ***!\n  \\***********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ \"./node_modules/d3-quadtree/src/quad.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {\n  var quads = [], q, node = this._root, child, x0, y0, x1, y1;\n  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](node, this._x0, this._y0, this._x1, this._y1));\n  while (q = quads.pop()) {\n    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {\n      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;\n      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, xm, ym, x1, y1));\n      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, x0, ym, xm, y1));\n      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, xm, y0, x1, ym));\n      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, x0, y0, xm, ym));\n    }\n  }\n  return this;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/visitAfter.js\":\n/*!****************************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/visitAfter.js ***!\n  \\****************************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ \"./node_modules/d3-quadtree/src/quad.js\");\n\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {\n  var quads = [], next = [], q;\n  if (this._root) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._root, this._x0, this._y0, this._x1, this._y1));\n  while (q = quads.pop()) {\n    var node = q.node;\n    if (node.length) {\n      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;\n      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, x0, y0, xm, ym));\n      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, xm, y0, x1, ym));\n      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, x0, ym, xm, y1));\n      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](child, xm, ym, x1, y1));\n    }\n    next.push(q);\n  }\n  while (q = next.pop()) {\n    callback(q.node, q.x0, q.y0, q.x1, q.y1);\n  }\n  return this;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/x.js\":\n/*!*******************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/x.js ***!\n  \\*******************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"defaultX\": () => (/* binding */ defaultX),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction defaultX(d) {\n  return d[0];\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {\n  return arguments.length ? (this._x = _, this) : this._x;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-quadtree/src/y.js\":\n/*!*******************************************!*\\\n  !*** ./node_modules/d3-quadtree/src/y.js ***!\n  \\*******************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"defaultY\": () => (/* binding */ defaultY),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction defaultY(d) {\n  return d[1];\n}\n\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {\n  return arguments.length ? (this._y = _, this) : this._y;\n}\n\n\n/***/ }),\n\n/***/ \"./node_modules/d3-timer/src/timer.js\":\n/*!********************************************!*\\\n  !*** ./node_modules/d3-timer/src/timer.js ***!\n  \\********************************************/\n/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {\n\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"now\": () => (/* binding */ now),\n/* harmony export */   \"Timer\": () => (/* binding */ Timer),\n/* harmony export */   \"timer\": () => (/* binding */ timer),\n/* harmony export */   \"timerFlush\": () => (/* binding */ timerFlush)\n/* harmony export */ });\nvar frame = 0, // is an animation frame pending?\n    timeout = 0, // is a timeout pending?\n    interval = 0, // are any timers active?\n    pokeDelay = 1000, // how frequently we check for clock skew\n    taskHead,\n    taskTail,\n    clockLast = 0,\n    clockNow = 0,\n    clockSkew = 0,\n    clock = typeof performance === \"object\" && performance.now ? performance : Date,\n    setFrame = typeof window === \"object\" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };\n\nfunction now() {\n  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);\n}\n\nfunction clearNow() {\n  clockNow = 0;\n}\n\nfunction Timer() {\n  this._call =\n  this._time =\n  this._next = null;\n}\n\nTimer.prototype = timer.prototype = {\n  constructor: Timer,\n  restart: function(callback, delay, time) {\n    if (typeof callback !== \"function\") throw new TypeError(\"callback is not a function\");\n    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);\n    if (!this._next && taskTail !== this) {\n      if (taskTail) taskTail._next = this;\n      else taskHead = this;\n      taskTail = this;\n    }\n    this._call = callback;\n    this._time = time;\n    sleep();\n  },\n  stop: function() {\n    if (this._call) {\n      this._call = null;\n      this._time = Infinity;\n      sleep();\n    }\n  }\n};\n\nfunction timer(callback, delay, time) {\n  var t = new Timer;\n  t.restart(callback, delay, time);\n  return t;\n}\n\nfunction timerFlush() {\n  now(); // Get the current time, if not already set.\n  ++frame; // Pretend we’ve set an alarm, if we haven’t already.\n  var t = taskHead, e;\n  while (t) {\n    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);\n    t = t._next;\n  }\n  --frame;\n}\n\nfunction wake() {\n  clockNow = (clockLast = clock.now()) + clockSkew;\n  frame = timeout = 0;\n  try {\n    timerFlush();\n  } finally {\n    frame = 0;\n    nap();\n    clockNow = 0;\n  }\n}\n\nfunction poke() {\n  var now = clock.now(), delay = now - clockLast;\n  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;\n}\n\nfunction nap() {\n  var t0, t1 = taskHead, t2, time = Infinity;\n  while (t1) {\n    if (t1._call) {\n      if (time > t1._time) time = t1._time;\n      t0 = t1, t1 = t1._next;\n    } else {\n      t2 = t1._next, t1._next = null;\n      t1 = t0 ? t0._next = t2 : taskHead = t2;\n    }\n  }\n  taskTail = t0;\n  sleep(time);\n}\n\nfunction sleep(time) {\n  if (frame) return; // Soonest alarm already set, or will be.\n  if (timeout) timeout = clearTimeout(timeout);\n  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.\n  if (delay > 24) {\n    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);\n    if (interval) interval = clearInterval(interval);\n  } else {\n    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);\n    frame = 1, setFrame(wake);\n  }\n}\n\n\n/***/ })\n\n/******/ \t});\n/************************************************************************/\n/******/ \t// The module cache\n/******/ \tvar __webpack_module_cache__ = {};\n/******/ \t\n/******/ \t// The require function\n/******/ \tfunction __webpack_require__(moduleId) {\n/******/ \t\t// Check if module is in cache\n/******/ \t\tvar cachedModule = __webpack_module_cache__[moduleId];\n/******/ \t\tif (cachedModule !== undefined) {\n/******/ \t\t\treturn cachedModule.exports;\n/******/ \t\t}\n/******/ \t\t// Create a new module (and put it into the cache)\n/******/ \t\tvar module = __webpack_module_cache__[moduleId] = {\n/******/ \t\t\t// no module.id needed\n/******/ \t\t\t// no module.loaded needed\n/******/ \t\t\texports: {}\n/******/ \t\t};\n/******/ \t\n/******/ \t\t// Execute the module function\n/******/ \t\t__webpack_modules__[moduleId](module, module.exports, __webpack_require__);\n/******/ \t\n/******/ \t\t// Return the exports of the module\n/******/ \t\treturn module.exports;\n/******/ \t}\n/******/ \t\n/************************************************************************/\n/******/ \t/* webpack/runtime/define property getters */\n/******/ \t(() => {\n/******/ \t\t// define getter functions for harmony exports\n/******/ \t\t__webpack_require__.d = (exports, definition) => {\n/******/ \t\t\tfor(var key in definition) {\n/******/ \t\t\t\tif(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {\n/******/ \t\t\t\t\tObject.defineProperty(exports, key, { enumerable: true, get: definition[key] });\n/******/ \t\t\t\t}\n/******/ \t\t\t}\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/hasOwnProperty shorthand */\n/******/ \t(() => {\n/******/ \t\t__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))\n/******/ \t})();\n/******/ \t\n/******/ \t/* webpack/runtime/make namespace object */\n/******/ \t(() => {\n/******/ \t\t// define __esModule on exports\n/******/ \t\t__webpack_require__.r = (exports) => {\n/******/ \t\t\tif(typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n/******/ \t\t\t\tObject.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });\n/******/ \t\t\t}\n/******/ \t\t\tObject.defineProperty(exports, '__esModule', { value: true });\n/******/ \t\t};\n/******/ \t})();\n/******/ \t\n/************************************************************************/\nvar __webpack_exports__ = {};\n// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.\n(() => {\n/*!****************************************************************!*\\\n  !*** ./node_modules/ts-loader/index.js!./src/lib/d3.worker.ts ***!\n  \\****************************************************************/\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./layout */ \"./src/lib/layout.ts\");\n\nconst ctx = self;\nlet layout = null;\nctx.addEventListener('message', (event) => {\n    const data = event.data;\n    switch (data.name) {\n        case 'init':\n            layout = new _layout__WEBPACK_IMPORTED_MODULE_0__.Layout();\n            layout.onEvent.on('tick', (percent) => {\n                ctx.postMessage({ type: \"tick\", progress: percent });\n            });\n            layout.onEvent.on('end', (d) => {\n                ctx.postMessage({ type: 'end', d });\n            });\n            layout.init(data);\n            break;\n        case 'calculate':\n            if (layout) {\n                layout.calculate();\n            }\n            break;\n        case 'destroy':\n            if (layout) {\n                layout.onEvent.removeAllListeners();\n                layout.destroy();\n            }\n            layout = null;\n            break;\n    }\n});\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (null);\n//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZDMud29ya2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xpYi9kMy53b3JrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUVsQyxNQUFNLEdBQUcsR0FBVyxJQUFXLENBQUM7QUFFaEMsSUFBSSxNQUFNLEdBQWtCLElBQUksQ0FBQztBQUVqQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7SUFDeEMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztJQUV4QixRQUFPLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDaEIsS0FBSyxNQUFNO1lBQ1QsTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7WUFDdEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3BDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE1BQU07UUFDUixLQUFLLFdBQVc7WUFDZCxJQUFJLE1BQU0sRUFBRTtnQkFDVixNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDcEI7WUFDRCxNQUFNO1FBQ1IsS0FBSyxTQUFTO1lBQ1osSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2dCQUNwQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDbEI7WUFDRCxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ2QsTUFBTTtLQUNUO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxlQUFlLElBQVcsQ0FBQyJ9\n})();\n\n/******/ })()\n;", "Worker", undefined, undefined);
}


/***/ }),

/***/ "./node_modules/worker-loader/dist/runtime/inline.js":
/*!***********************************************************!*\
  !*** ./node_modules/worker-loader/dist/runtime/inline.js ***!
  \***********************************************************/
/***/ ((module) => {



/* eslint-env browser */

/* eslint-disable no-undef, no-use-before-define, new-cap */
module.exports = function (content, workerConstructor, workerOptions, url) {
  var globalScope = self || window;

  try {
    try {
      var blob;

      try {
        // New API
        blob = new globalScope.Blob([content]);
      } catch (e) {
        // BlobBuilder = Deprecated, but widely implemented
        var BlobBuilder = globalScope.BlobBuilder || globalScope.WebKitBlobBuilder || globalScope.MozBlobBuilder || globalScope.MSBlobBuilder;
        blob = new BlobBuilder();
        blob.append(content);
        blob = blob.getBlob();
      }

      var URL = globalScope.URL || globalScope.webkitURL;
      var objectURL = URL.createObjectURL(blob);
      var worker = new globalScope[workerConstructor](objectURL, workerOptions);
      URL.revokeObjectURL(objectURL);
      return worker;
    } catch (e) {
      return new globalScope[workerConstructor]("data:application/javascript,".concat(encodeURIComponent(content)), workerOptions);
    }
  } catch (e) {
    if (!url) {
      throw Error("Inline worker is not supported");
    }

    return new globalScope[workerConstructor](url, workerOptions);
  }
};

/***/ }),

/***/ "./node_modules/d3-dispatch/src/dispatch.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);


/***/ }),

/***/ "./node_modules/d3-force/src/center.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-force/src/center.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  var nodes, strength = 1;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/collide.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-force/src/collide.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-quadtree */ "./node_modules/d3-quadtree/src/quadtree.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./jiggle.js */ "./node_modules/d3-force/src/jiggle.js");




function x(d) {
  return d.x + d.vx;
}

function y(d) {
  return d.y + d.vy;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius) {
  var nodes,
      radii,
      random,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_1__["default"])(nodes, x, y).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(random), l += x * x;
            if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_2__["default"])(random), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : radius;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/constant.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-force/src/constant.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-force/src/jiggle.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-force/src/jiggle.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(random) {
  return (random() - 0.5) * 1e-6;
}


/***/ }),

/***/ "./node_modules/d3-force/src/lcg.js":
/*!******************************************!*\
  !*** ./node_modules/d3-force/src/lcg.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a = 1664525;
const c = 1013904223;
const m = 4294967296; // 2^32

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  let s = 1;
  return () => (s = (a * s + c) % m) / m;
}


/***/ }),

/***/ "./node_modules/d3-force/src/link.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-force/src/link.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jiggle.js */ "./node_modules/d3-force/src/jiggle.js");



function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(30),
      distances,
      nodes,
      count,
      bias,
      random,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(random);
        y = target.y + target.vy - source.y - source.vy || (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(random);
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initializeDistance(), force) : distance;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/manyBody.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-force/src/manyBody.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_quadtree__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-quadtree */ "./node_modules/d3-quadtree/src/quadtree.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-force/src/constant.js");
/* harmony import */ var _jiggle_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./jiggle.js */ "./node_modules/d3-force/src/jiggle.js");
/* harmony import */ var _simulation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./simulation.js */ "./node_modules/d3-force/src/simulation.js");





/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var nodes,
      node,
      random,
      alpha,
      strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = (0,d3_quadtree__WEBPACK_IMPORTED_MODULE_1__["default"])(nodes, _simulation_js__WEBPACK_IMPORTED_MODULE_2__.x, _simulation_js__WEBPACK_IMPORTED_MODULE_2__.y).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__["default"])(random), l += x * x;
        if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__["default"])(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__["default"])(random), l += x * x;
      if (y === 0) y = (0,_jiggle_js__WEBPACK_IMPORTED_MODULE_3__["default"])(random), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/simulation.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-force/src/simulation.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "x": () => (/* binding */ x),
/* harmony export */   "y": () => (/* binding */ y),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/src/dispatch.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");
/* harmony import */ var _lcg_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lcg.js */ "./node_modules/d3-force/src/lcg.js");




function x(d) {
  return d.x;
}

function y(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = new Map(),
      stepper = (0,d3_timer__WEBPACK_IMPORTED_MODULE_0__.timer)(step),
      event = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_1__["default"])("tick", "end"),
      random = (0,_lcg_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.forEach(function(force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-force/src/x.js":
/*!****************************************!*\
  !*** ./node_modules/d3-force/src/x.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-force/src/constant.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  var strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0.1),
      nodes,
      strengths,
      xz;

  if (typeof x !== "function") x = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(x == null ? 0 : +x);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vx += (xz[i] - node.x) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    xz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(xz[i] = +x(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : strength;
  };

  force.x = function(_) {
    return arguments.length ? (x = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : x;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-force/src/y.js":
/*!****************************************!*\
  !*** ./node_modules/d3-force/src/y.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-force/src/constant.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(y) {
  var strength = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(0.1),
      nodes,
      strengths,
      yz;

  if (typeof y !== "function") y = (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(y == null ? 0 : +y);

  function force(alpha) {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.vy += (yz[i] - node.y) * strengths[i] * alpha;
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length;
    strengths = new Array(n);
    yz = new Array(n);
    for (i = 0; i < n; ++i) {
      strengths[i] = isNaN(yz[i] = +y(nodes[i], i, nodes)) ? 0 : +strength(nodes[i], i, nodes);
    }
  }

  force.initialize = function(_) {
    nodes = _;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : strength;
  };

  force.y = function(_) {
    return arguments.length ? (y = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(+_), initialize(), force) : y;
  };

  return force;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/add.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-quadtree/src/add.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "addAll": () => (/* binding */ addAll)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {
  const x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/cover.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-quadtree/src/cover.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/data.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/data.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/extent.js":
/*!************************************************!*\
  !*** ./node_modules/d3-quadtree/src/extent.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/find.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/find.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node[3], xm, ym, x2, y2),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node[2], x1, ym, xm, y2),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node[1], xm, y1, x2, ym),
        new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/quad.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/quad.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/quadtree.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-quadtree/src/quadtree.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ quadtree)
/* harmony export */ });
/* harmony import */ var _add_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./add.js */ "./node_modules/d3-quadtree/src/add.js");
/* harmony import */ var _cover_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cover.js */ "./node_modules/d3-quadtree/src/cover.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data.js */ "./node_modules/d3-quadtree/src/data.js");
/* harmony import */ var _extent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./extent.js */ "./node_modules/d3-quadtree/src/extent.js");
/* harmony import */ var _find_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./find.js */ "./node_modules/d3-quadtree/src/find.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-quadtree/src/remove.js");
/* harmony import */ var _root_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./root.js */ "./node_modules/d3-quadtree/src/root.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./size.js */ "./node_modules/d3-quadtree/src/size.js");
/* harmony import */ var _visit_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./visit.js */ "./node_modules/d3-quadtree/src/visit.js");
/* harmony import */ var _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./visitAfter.js */ "./node_modules/d3-quadtree/src/visitAfter.js");
/* harmony import */ var _x_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./x.js */ "./node_modules/d3-quadtree/src/x.js");
/* harmony import */ var _y_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./y.js */ "./node_modules/d3-quadtree/src/y.js");













function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? _x_js__WEBPACK_IMPORTED_MODULE_0__.defaultX : x, y == null ? _y_js__WEBPACK_IMPORTED_MODULE_1__.defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = _add_js__WEBPACK_IMPORTED_MODULE_2__["default"];
treeProto.addAll = _add_js__WEBPACK_IMPORTED_MODULE_2__.addAll;
treeProto.cover = _cover_js__WEBPACK_IMPORTED_MODULE_3__["default"];
treeProto.data = _data_js__WEBPACK_IMPORTED_MODULE_4__["default"];
treeProto.extent = _extent_js__WEBPACK_IMPORTED_MODULE_5__["default"];
treeProto.find = _find_js__WEBPACK_IMPORTED_MODULE_6__["default"];
treeProto.remove = _remove_js__WEBPACK_IMPORTED_MODULE_7__["default"];
treeProto.removeAll = _remove_js__WEBPACK_IMPORTED_MODULE_7__.removeAll;
treeProto.root = _root_js__WEBPACK_IMPORTED_MODULE_8__["default"];
treeProto.size = _size_js__WEBPACK_IMPORTED_MODULE_9__["default"];
treeProto.visit = _visit_js__WEBPACK_IMPORTED_MODULE_10__["default"];
treeProto.visitAfter = _visitAfter_js__WEBPACK_IMPORTED_MODULE_11__["default"];
treeProto.x = _x_js__WEBPACK_IMPORTED_MODULE_0__["default"];
treeProto.y = _y_js__WEBPACK_IMPORTED_MODULE_1__["default"];


/***/ }),

/***/ "./node_modules/d3-quadtree/src/remove.js":
/*!************************************************!*\
  !*** ./node_modules/d3-quadtree/src/remove.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "removeAll": () => (/* binding */ removeAll)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/root.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/root.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this._root;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/size.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-quadtree/src/size.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/visit.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-quadtree/src/visit.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, x0, y0, xm, ym));
    }
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/visitAfter.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-quadtree/src/visitAfter.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _quad_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./quad.js */ "./node_modules/d3-quadtree/src/quad.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new _quad_js__WEBPACK_IMPORTED_MODULE_0__["default"](child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/x.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-quadtree/src/x.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultX": () => (/* binding */ defaultX),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultX(d) {
  return d[0];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}


/***/ }),

/***/ "./node_modules/d3-quadtree/src/y.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-quadtree/src/y.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultY": () => (/* binding */ defaultY),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function defaultY(d) {
  return d[1];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "Timer": () => (/* binding */ Timer),
/* harmony export */   "timer": () => (/* binding */ timer),
/* harmony export */   "timerFlush": () => (/* binding */ timerFlush)
/* harmony export */ });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


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
/* harmony export */   "D3Layout": () => (/* reexport safe */ _lib_supervisor__WEBPACK_IMPORTED_MODULE_0__.D3Layout)
/* harmony export */ });
/* harmony import */ var _lib_supervisor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/supervisor */ "./src/lib/supervisor.ts");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYyxrQkFBa0IsQ0FBQyJ9
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});