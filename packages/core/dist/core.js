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
        this._clearInternalState();
        this._arrowGeometry = new three__WEBPACK_IMPORTED_MODULE_0__.BufferGeometry();
        const { vertices, colors } = this._calculateArrowData();
        this._arrowGeometry.setAttribute('position', new three__WEBPACK_IMPORTED_MODULE_0__.BufferAttribute(vertices, 2).setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage));
        this._arrowGeometry.setAttribute('color', new three__WEBPACK_IMPORTED_MODULE_0__.Float32BufferAttribute(colors, 3).setUsage(three__WEBPACK_IMPORTED_MODULE_0__.DynamicDrawUsage));
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
        this._graph._scene.add(this._arrowMesh);
    }
    dispose() {
        this._clearInternalState();
        this._graph = null;
    }
    _clearInternalState() {
        if (this._arrowMesh) {
            this._graph._scene.remove(this._arrowMesh);
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
            color.setHex(edges[i].color);
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
        const pointBelow = [pointOnLine[0] - scalingCornerFactor * -dy / vNorm, pointOnLine[1] - scalingCornerFactor * dx / vNorm,];
        const pointAbove = [pointOnLine[0] + scalingCornerFactor * -dy / vNorm, pointOnLine[1] + scalingCornerFactor * dx / vNorm,];
        return {
            pointAbove,
            pointBelow,
            pointOnLine: [sourceX, sourceY]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hcnJvd3MvYXJyb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsSUFBSSxFQUNKLGNBQWMsRUFDZCxNQUFNLEVBQ04sT0FBTyxHQUNSLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFekQsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0lBVTlDLFlBQVksS0FBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUVSLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNqQztJQUNILENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hKLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRTNCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUUzQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBRXhELElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxJQUFJLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUMxRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsSUFBSSxzQkFBc0IsQ0FBRSxNQUFNLEVBQUUsQ0FBQyxDQUFFLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztRQUU5RyxJQUFJLENBQUMsY0FBYyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNFLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQUM7WUFDdkMsU0FBUyxFQUFFLEtBQUs7WUFDaEIsY0FBYztZQUNkLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsWUFBWTtTQUNiLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQztRQUUzQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUUzQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1NBQ3hCO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDNUI7UUFFRCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtJQUNILENBQUM7SUFFTyxtQkFBbUI7UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDakMsTUFBTSxRQUFRLEdBQUcsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBRyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRWxELE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDMUIsS0FBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFHO1lBQ2pGLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLEVBQUU7Z0JBQzdCLFNBQVM7YUFDVjtZQUNELElBQUksTUFBTSxDQUFDO1lBQ1gsSUFBSSxNQUFNLENBQUM7WUFFWCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDbEQsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3pCLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2FBQzFCO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUN6QixNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUMxQjtZQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTdCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUVsRixlQUFlO1lBQ2YsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRCxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXBELFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsUUFBUSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyRCxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELFFBQVEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFcEQsU0FBUztZQUNULE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBRXpCLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFCO1FBRUQsT0FBTztZQUNMLE1BQU07WUFDTixRQUFRO1NBQ1QsQ0FBQztJQUNKLENBQUM7SUFFTyx1QkFBdUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFFLFdBQVc7UUFDNUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxDQUFDO1FBRTVFLE1BQU0sRUFBRSxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QyxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFFekMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUUzQyxNQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pELE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoRCxNQUFNLG1CQUFtQixHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztRQUV2RCw0QkFBNEI7UUFDNUIsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxHQUFHLEtBQUssRUFBRSxPQUFPLEdBQUcsbUJBQW1CLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxDQUFBO1FBRTVHLGlGQUFpRjtRQUNqRixNQUFNLFVBQVUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUcsQ0FBQTtRQUM1SCxNQUFNLFVBQVUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxtQkFBbUIsR0FBRyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLG1CQUFtQixHQUFHLEVBQUUsR0FBRyxLQUFLLEVBQUcsQ0FBQTtRQUU1SCxPQUFPO1lBQ0wsVUFBVTtZQUNWLFVBQVU7WUFDVixXQUFXLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO1NBQ2hDLENBQUE7SUFDSCxDQUFDO0lBRU8sc0JBQXNCLENBQUMsU0FBYztRQUMzQyxNQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBRXBDLElBQUssU0FBUyxFQUFHO1lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUM3QixNQUFNLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdFLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztZQUVwQixLQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUc7Z0JBRXZELE1BQU0sQ0FBQyxTQUFTLENBQUUsU0FBUyxFQUFFLENBQUMsQ0FBRSxDQUFDO2dCQUNqQyxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLGlCQUFpQixDQUFFLE1BQU0sQ0FBRSxDQUFFLENBQUM7YUFFM0U7WUFFRCxjQUFjLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFL0MsSUFBSyxLQUFLLENBQUUsY0FBYyxDQUFDLE1BQU0sQ0FBRSxFQUFHO2dCQUNwQyx5Q0FBeUM7Z0JBQ3pDLE9BQU8sQ0FBQyxLQUFLLENBQUUsOEhBQThILEVBQUUsSUFBSSxDQUFFLENBQUM7YUFDdko7U0FDRjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3pCLENBQUM7Q0FFRCJ9

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






class PretyGraph {
    constructor(options) {
        this.onEvent = new _emitter__WEBPACK_IMPORTED_MODULE_1__.EventEmitter();
        this.nodeScalingFactor = 5.0;
        this.animationTime = 500;
        this.neighbourhoodNodes = {};
        this.neighbourhoodEdges = {};
        this._options = {};
        this._container = document.body;
        this._fov = 75;
        this._far = 10000;
        this._nodes = [];
        this._edges = [];
        this._center = null;
        this._dragInProgress = false;
        this._dragging = false;
        this._plane = new three__WEBPACK_IMPORTED_MODULE_0__.Plane();
        this._raycaster = new three__WEBPACK_IMPORTED_MODULE_0__.Raycaster();
        this._intersection = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this._offset = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
        this._indexedNodes = {};
        this._labelsLayer = null;
        this._arrowsLayer = null;
        this._edgesLayer = null;
        this._nodesLayer = null;
        this._startPoint = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._pointTopLeft = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._pointBottomRight = new three__WEBPACK_IMPORTED_MODULE_0__.Vector2();
        this._resizeTimeout = 0;
        this._labelHidedOnMove = false;
        this._selectMode = false;
        this._skip = false;
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
    toggleLabels() {
        if (this._labelsLayer) {
            this._labelsLayer.toggleLabels();
        }
    }
    setData(data, options = { animate: false, locate: false }) {
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
            this._render();
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
            this._render();
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
        const coordinates = this._translateCoordinates(node.x, node.y);
        return {
            node,
            ...coordinates,
            scale: this._controls.scale
        };
    }
    getScreenshot() {
        const renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({ premultipliedAlpha: false, preserveDrawingBuffer: true, antialias: true, alpha: true });
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
        this.onEvent.removeAllListeners();
    }
    _onWorkspaceClick() {
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
    _onNodeHover(data) {
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
    _onNodeUnhover() {
        if (this._edgesLayer) {
            this._edgesLayer.clearHoveredEdges();
        }
        if (this._arrowsLayer) {
            this._arrowsLayer.recalculate();
        }
        this._render();
    }
    _onRotate({ delta }) {
        if (this._scene) {
            this._scene.rotation.z += delta * 0.001;
        }
        this._render();
    }
    _onMouseMove({ position, event }) {
        if (this._dragging && this._camera) {
            if (this._labelsLayer && !this._labelsLayer.isHidden()) {
                this._labelHidedOnMove = true;
                this._labelsLayer.hide();
            }
            // dragging node
            const mouse = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
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
                    const worldVector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
                    this._camera.getWorldDirection(worldVector);
                    this._plane.setFromNormalAndCoplanarPoint(worldVector, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
                    this._raycaster.setFromCamera(mouse, this._camera);
                    this._raycaster.ray.intersectPlane(this._plane, this._intersection);
                    this._offset.copy(this._intersection).sub(new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y, 0));
                    newPos = this._intersection.sub(this._offset).clone();
                    this._dragInProgress = true;
                }
                else {
                    this._raycaster.setFromCamera(mouse, this._camera);
                    this._raycaster.ray.intersectPlane(this._plane, this._intersection);
                    newPos = this._intersection.sub(this._offset).clone();
                }
                if (this._nodesLayer.hoveredNode !== null) {
                    const offset = { x: 0, y: 0 };
                    offset.x = this._nodesLayer.hoveredNode.x - newPos.x;
                    offset.y = this._nodesLayer.hoveredNode.y - newPos.y;
                    let nodes;
                    if (this._nodesLayer && this._nodesLayer.activeNodes.length) {
                        const hasHoveredNode = this._nodesLayer.activeNodes.find((n) => {
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
                this._selectBox.style.left = this._pointTopLeft.x + 'px';
                this._selectBox.style.top = this._pointTopLeft.y + 'px';
                this._selectBox.style.width = (this._pointBottomRight.x - this._pointTopLeft.x) + 'px';
                this._selectBox.style.height = (this._pointBottomRight.y - this._pointTopLeft.y) + 'px';
            }
            else {
                if (this._nodesLayer && !this._nodesLayer.testNode(position)) {
                    if (this._edgesLayer) {
                        this._edgesLayer.testEdge(position);
                    }
                }
                else {
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
    _onMouseUp({ event }) {
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
        }
        else {
            if (this._nodesLayer && !this._dragInProgress) {
                if (event.ctrlKey && this._nodesLayer.hoveredNode) {
                    this._nodesLayer.setActiveNodes([this._nodesLayer.hoveredNode, ...this._nodesLayer.activeNodes]);
                }
                else {
                    if (this._nodesLayer.hoveredNode) {
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
    _onMouseDown({ event, position }) {
        if (this._nodesLayer && this._nodesLayer.hoveredNode !== null && event.buttons === 1) {
            this._controls.enabled = false;
            this._dragging = true;
        }
        else {
            if (this._selectMode || event.shiftKey) {
                if (!this._selectMode) {
                    this.activateSelectMode();
                }
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
    }
    _onClick() {
        if (this._skip) {
            this._skip = false;
            return;
        }
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
        }
        if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('edgeClick', { edge: this._edgesLayer.hoveredEdge, scale: this._controls.scale });
        }
        if (this._nodesLayer && !this._nodesLayer.hoveredNode && this._edgesLayer && !this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('workspaceClick');
        }
    }
    _onDblClick() {
        if (this._nodesLayer && this._nodesLayer.hoveredNode !== null) {
            const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeDblClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
        }
    }
    _onContextMenu(position) {
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeContextMenu', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
        }
        else if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('edgeContextMenu', { edge: this._edgesLayer.hoveredEdge, coordinates: position, scale: this._controls.scale });
        }
    }
    _onPan() {
        this._render();
        if (this._labelsLayer) {
            this._labelsLayer.recalculate();
        }
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeScaling', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
        }
        else {
            this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale });
        }
    }
    _onScale(event) {
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
        }
        else {
            this.onEvent.emit('workspaceViewChanged', { scale: this._controls.scale, canZoom: event.canZoom, zoomDirection: event.zoomDirection });
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
    _translateCoordinates(x, y) {
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
            y: vector.y
        };
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
            antialias: true
        });
        // Add support for retina displays
        this._renderer.setPixelRatio(1);
        // Set canvas dimension
        this._renderer.setSize(this._container.clientWidth, this._container.clientHeight, false);
        this._renderer.domElement.style.position = 'absolute';
        this._renderer.domElement.style.userSelect = 'none';
        // Add the canvas to the DOM
        this._container.appendChild(this._renderer.domElement);
    }
    _render() {
        if (this._scene && this._camera && this._renderer) {
            this._renderer.render(this._scene, this._camera);
        }
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
                this._render();
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
                this._render();
                requestAnimationFrame(step);
            }
        };
        step();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLGFBQWEsR0FDZCxNQUFNLE9BQU8sQ0FBQztBQUVmLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsTUFBTSxPQUFPLFVBQVU7SUFnR3JCLFlBQVksT0FBcUI7UUE5RjFCLFlBQU8sR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQyxzQkFBaUIsR0FBVyxHQUFHLENBQUM7UUFFaEMsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFFNUIsdUJBQWtCLEdBQTJCLEVBQUUsQ0FBQztRQUVoRCx1QkFBa0IsR0FBMkIsRUFBRSxDQUFDO1FBTS9DLGFBQVEsR0FBaUIsRUFBRSxDQUFDO1FBSTVCLGVBQVUsR0FBZ0IsUUFBUSxDQUFDLElBQUksQ0FBQztRQUV4QyxTQUFJLEdBQVcsRUFBRSxDQUFDO1FBRWxCLFNBQUksR0FBVyxLQUFLLENBQUM7UUFFckIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUVuQixXQUFNLEdBQVUsRUFBRSxDQUFDO1FBRW5CLFlBQU8sR0FBUSxJQUFJLENBQUM7UUFJcEIsb0JBQWUsR0FBWSxLQUFLLENBQUM7UUFFakMsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixXQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztR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

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
        this._graph = null;
    }
    setHoveredEdges(edges) {
        this._hoveredEdges = edges;
        this._hoveredEdges.forEach((edge) => edge.__hovered = true);
        const hoveringEdges = this._hoveredEdges.filter((edge) => edge.__active === undefined || edge.__active === false);
        this._setEdgesSize(hoveringEdges, 1.3, 1);
    }
    clearHoveredEdges() {
        const unhoveringEdges = this._hoveredEdges.filter((edge) => edge.__active === undefined || edge.__active === false);
        this._setEdgesSize(unhoveringEdges, 1, 1.3);
        this._hoveredEdges.forEach((edge) => edge.__hovered = false);
        this._hoveredEdges = [];
    }
    setActiveEdges(edges) {
        this._activeEdges = edges;
        this._activeEdges.forEach((edge) => edge.__active = true);
        const activatingEdges = this._activeEdges.filter((edge) => edge.__hovered === undefined || edge.__hovered === false);
        this._setEdgesSize(activatingEdges, 1.3, 1);
    }
    clearActiveEdges() {
        const deactivatingEdges = this._activeEdges.filter((edge) => edge.__hovered === undefined || edge.__hovered === false);
        this._setEdgesSize(deactivatingEdges, 1, 1.3);
        this._activeEdges.forEach((edge) => edge.__active = false);
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
                    for (let i = edge._lineSizeRange[0]; i < edge._lineSizeRange[1] / 2 + 2; i++) {
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
        }
    }
    testEdge(position) {
        if (this._pickingTexture) {
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
    _setPickingLineSize(edges) {
        if (!edges.length) {
            return;
        }
        for (const edge of edges) {
            if (edge._lineSizeRange) {
                const count = edge._lineSizeRange[1] - edge._lineSizeRange[0];
                if (count > 1) {
                    for (let i = edge._lineSizeRange[0]; i < edge._lineSizeRange[1] / 2 + 2; i++) {
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
            vertexColors: true
        });
        this._lineMaterial.useColor = 1.0;
        this._lineMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);
        this._lineMesh = new _externals_lines_Line2_js__WEBPACK_IMPORTED_MODULE_1__.Line2(this._lineGeometry, this._lineMaterial);
        this._lineMesh.computeLineDistances();
        this._graph._scene.add(this._lineMesh);
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
            vertexColors: true
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
            this._graph._scene.remove(this._lineMesh);
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
            color.setHex(link.color);
            pickingColor.setHex(index + 1);
            if (link.source.x === link.target.x && link.source.y === link.target.y) {
                const vStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.source.x, link.source.y || 0, 0);
                const vEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.target.x, link.target.y || 0, 0);
                const d = 15 * link.source.size;
                const endAngle = -0; // Rotate clockwise (from Z angle perspective)
                const startAngle = endAngle + Math.PI / 2;
                const curve = new three__WEBPACK_IMPORTED_MODULE_0__.CubicBezierCurve3(vStart, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0).add(vStart), new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0).add(vStart), vEnd);
                const points = curve.getPoints(50);
                link._lineSizeRange = [sizes.length, sizes.length + points.length * 2];
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
                        color.r, color.g, color.b // color end
                        );
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
                        color.r, color.g, color.b // color end
                        );
                        pickingColors.push(pickingColor.r, pickingColor.g, pickingColor.b, pickingColor.r, pickingColor.g, pickingColor.b);
                    }
                    lastPoint = points[i + 1];
                }
            }
            else {
                positions.push(sourceX, sourceY, 0, // start point
                targetX, targetY, 0 // end point
                );
                link._lineSizeRange = [sizes.length, sizes.length + 1];
                sizes.push(link.size);
                if (link.type === 'dashed') {
                    isDashed.push(1.0);
                }
                else {
                    isDashed.push(0.0);
                }
                colors.push(color.r, color.g, color.b, // color start
                color.r, color.g, color.b // color end
                );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL2VkZ2VzL2VkZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxLQUFLLEVBQ0wsaUJBQWlCLEVBQ2pCLGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixLQUFLLEVBQ0wsT0FBTyxFQUNQLGlCQUFpQixFQUNsQixNQUFNLE9BQU8sQ0FBQztBQUVmLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUMxRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFFeEYsTUFBTSxPQUFPLFVBQVcsU0FBUSxlQUFlO0lBNEI3QyxZQUFZLEtBQVU7UUFDcEIsS0FBSyxFQUFFLENBQUM7UUFURixpQkFBWSxHQUFRLElBQUksQ0FBQztRQUV6QixtQkFBYyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTVCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBRTFCLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBSy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEgsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQztRQUV0RCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzFE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

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
        this._labels = [];
        this._isHidden = false;
        this._graph = graph;
        this._textCanvas = document.createElement("canvas");
        this._textCanvas.setAttribute("style", "position: absolute;left: 0px;top: 0px;z-index:10;");
        this._textCanvas.width = this._graph._renderer.domElement.width;
        this._textCanvas.height = this._graph._renderer.domElement.height;
        this._textCanvas.style.userSelect = 'none';
        this._textCanvas.style.pointerEvents = 'none';
        this._textContext = this._textCanvas.getContext("2d");
        this._graph._container.appendChild(this._textCanvas);
        this._textContext.font = "12px Roboto";
        CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
            let newR;
            if (w < 2 * r) {
                newR = w / 2;
            }
            ;
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
            y
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
            const coords = this._graph._translateCoordinates(label.x, label.y);
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
            const coords = this._graph._translateCoordinates(label.x, label.y);
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
        ctx.font = "12px Roboto";
        const textWidth = ctx.measureText(text).width;
        const textOffset = (nodeSize / 2) * this._graph.nodeScalingFactor * this._graph._controls.scale;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 3;
        // ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.roundRect(textOffset + coords.x + 1, coords.y - textHeight / 2 - 2, textWidth + 10, textHeight + 6, 2);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.shadowColor = '';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = "black";
        ctx.fillText(text, textOffset + 6 + coords.x, coords.y + 5);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9sYWJlbHNMYXllci9sYWJlbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLFdBQVc7SUFZdEIsWUFBWSxLQUFLO1FBUlQsWUFBTyxHQUFVLEVBQUUsQ0FBQztRQUVwQixjQUFTLEdBQVksS0FBSyxDQUFDO1FBT2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXBCLElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsbURBQW1ELENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDbEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztRQUMzQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBRTlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7UUFFdEMsd0JBQXdCLENBQUMsU0FBaUIsQ0FBQyxTQUFTLEdBQUcsVUFBUyxDQUFDLEVBQUUsQ0FB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

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
                this._graph._render();
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
                this._color.setHex(this._graph._nodes[i].color);
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
            const coordinates = this._graph._translateCoordinates(this._graph._nodes[i].x, this._graph._nodes[i].y);
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
                    value: this._graph.nodeScalingFactor
                },
                scale: {
                    value: this._graph._controls ? this._graph._controls.scale : 1.0
                },
                spriteDim: {
                    value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this._imageCanvas.textureWidth, this._imageCanvas.textureHeight)
                },
                textureDim: {
                    value: new three__WEBPACK_IMPORTED_MODULE_0__.Vector2(this._imageCanvas.canvasWidth, this._imageCanvas.canvasHeight)
                },
                textureMap: {
                    value: this._imageCanvas.textureMap
                }
            },
            vertexColors: true,
            vertexShader: _shaders__WEBPACK_IMPORTED_MODULE_1__.vertexShader,
        });
        this._nodeMesh = new three__WEBPACK_IMPORTED_MODULE_0__.Points(this._nodesInstancedGeometry, this._nodesMaterial);
        this._nodeMesh.frustumCulled = false;
        this._nodeMesh.renderOrder = 10;
        this._graph._scene.add(this._nodeMesh);
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
                    value: this._graph.nodeScalingFactor
                },
                scale: {
                    value: this._graph._controls ? this._graph._controls.scale : 1.0
                }
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
    setActiveNodes(nodes) {
        if (this._activeNodes.length && nodes[0].index === this._activeNodes[0].index) {
            this.clearActiveNodes();
            return;
        }
        this.clearActiveNodes();
        this._activeNodes = nodes;
        this._activeNodes.forEach((n) => n.__active = true);
        const activatingNodes = this._activeNodes.filter((n) => n.__hovered === undefined || n.__hovered === false);
        this.setNodesColor(activatingNodes, 0x4b7bec);
    }
    clearActiveNodes() {
        this._activeNodes.forEach((n) => n.__active = false);
        const deactivatingNodes = this._activeNodes.filter((n) => n.__hovered === undefined || n.__hovered === false);
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
                color.setHex(newColor);
            }
            else {
                color.setHex(node.color);
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
                    const coordinates = this._graph._translateCoordinates(node.x, node.y);
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
        if (this._pickingTexture) {
            this._graph._renderer.setRenderTarget(this._pickingTexture);
            this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
            this._graph._renderer.setRenderTarget(null);
            const pixelBuffer = new Uint8Array(4);
            this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
            /* tslint:disable-next-line */
            const id = (pixelBuffer[0] << 16) | (pixelBuffer[1] << 8) | (pixelBuffer[2]);
            if (id) {
                const node = this._graph._indexedNodes[this._colorToNodeID[id]];
                if (this.hoveredNode !== node) {
                    // clear last nodes
                    const unhoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
                    this.setNodesColor(unhoveringNodes);
                    this._hoveredNodes.forEach((n) => n.__hovered = false);
                    this.hoveredNode = node;
                    this._hoveredNodes = [node, ...this._graph.neighbourhoodNodes[node.id]];
                    this._hoveredNodes.forEach((n) => n.__hovered = true);
                    const hoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
                    this.setNodesColor(hoveringNodes, 0x4b7bec);
                    const coordinates = this._graph._translateCoordinates(this.hoveredNode.x, this.hoveredNode.y);
                    this._graph.onEvent.emit('nodeHover', { node: this.hoveredNode, ...coordinates, scale: this._graph._controls.scale });
                    this._graph._render();
                }
                return this.hoveredNode;
            }
            else {
                if (this.hoveredNode !== null) {
                    const unhoveringNodes = this._hoveredNodes.filter((n) => n.__active === undefined || n.__active === false);
                    this.setNodesColor(unhoveringNodes);
                    this._hoveredNodes.forEach((n) => n.__hovered = false);
                    this._hoveredNodes = [];
                    this._graph.onEvent.emit('nodeUnhover', { node: this.hoveredNode });
                    this.hoveredNode = null;
                    this._graph._render();
                }
                return undefined;
            }
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
            const coordinates = this._graph._translateCoordinates(this._graph._nodes[i].x, this._graph._nodes[i].y);
            this._graph._nodes[i].coordinates = coordinates;
            if (this._graph._labelsLayer && this._graph._nodes[i].__labelIndex !== undefined) {
                this._graph._labelsLayer.setLabelPosition(this._graph._nodes[i].__labelIndex, { x: this._graph._nodes[i].x, y: this._graph._nodes[i].y, z: 0 }, false);
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
        if (this._pickingTexture) {
            this._graph._renderer.setRenderTarget(this._pickingTexture);
            this._graph._renderer.render(this._pickingNodesScene, this._graph._camera);
            this._graph._renderer.setRenderTarget(null);
            this._buffer = new Uint8Array(4 * this._pickingTexture.width * this._pickingTexture.height);
            this._graph._renderer.readRenderTargetPixels(this._pickingTexture, 0, 0, this._pickingTexture.width, this._pickingTexture.height, this._buffer);
        }
    }
    _disposeInternal() {
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
            this._graph._scene.remove(this._nodeMesh);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25vZGVzL25vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxJQUFJLEVBQ0osZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBRWhCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsaUJBQWlCLEdBQ2xCLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFlBQVksR0FDYixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLFNBQVMsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsVUFBZSxFQUFFO0lBQzFELElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUM7SUFDeEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLFNBQVMsS0FBSztRQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsSUFBVyxFQUFPLEVBQUU7UUFDN0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFD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LFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRztZQUM1RSxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztZQUU3QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWhELE1BQU0sQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FB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

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
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "three");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(three__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _LineSegments2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./LineSegments2 */ "./externals/lines/LineSegments2.js");
/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */





class Line2 extends _LineSegments2__WEBPACK_IMPORTED_MODULE_1__.LineSegments2 {
	constructor(
		geometry = new three__WEBPACK_IMPORTED_MODULE_0__.LineGeometry(),
		material = new three__WEBPACK_IMPORTED_MODULE_0__.LineMaterial({
			color: Math.random() * 0xffffff
		})
	) {
		super( geometry, material );
		this.type = 'Line2';
	}
}

Line2.prototype.isLine2 = true;




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