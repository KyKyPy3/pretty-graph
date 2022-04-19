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
    clearActiveArrowOfEdges() {
        this.setArrowsColor(this._activeEdges);
    }
    setActiveArrowByEdges(edges) {
        this._activeEdges = edges;
        this.setArrowsColor(this._activeEdges, this._graph.dataConfig.colorsEvents.selectEdge);
    }
    setDeactivatedArrowByEdges(edges) {
        edges.map(x => this._activeEdges.indexOf(x)).forEach(index => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJyb3dzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9hcnJvd3MvYXJyb3dzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxRQUFRLEVBQ1IsZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixzQkFBc0IsRUFDdEIsSUFBSSxFQUNKLGNBQWMsRUFDZCxNQUFNLEVBQ04sT0FBTyxHQUNSLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFFekQsTUFBTSxPQUFPLFdBQVksU0FBUSxlQUFlO0lBWTlDLFlBQVksS0FBVTtRQUNwQixLQUFLLEVBQUUsQ0FBQztRQUxGLGlCQUFZLEdBQVUsRUFBRSxDQUFDO1FBTy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztTQUNqQztJQUNILENBQUM7SUFFTSxJQUFJO1FBQ1QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztTQUNoQztJQUNILENBQUM7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3hCLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUVoRCxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFM0UsTUFBTSxXQUFXLEdBQUcsSUFBSSxlQUFlLENBQUMsUUFBUSxFQUFFLElB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

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
        this.dataConfig = {
            showLabels: true,
            animate: false,
            locate: false,
            colorsEvents: {
                hoverEdge: '#547DE4',
                selectEdge: '#547DE4',
                hoverNode: '#547DE4',
                selectNode: '#547DE4',
            }
        };
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
            this._edgesLayer.clearHoveredEdges();
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
        var _a;
        if (this._dragging && this._camera) {
            // dragging node
            const mouse = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3();
            mouse.x = (position.x / this._container.clientWidth) * 2 - 1;
            mouse.y = -(position.y / this._container.clientHeight) * 2 + 1;
            let newPos = {
                x: 0,
                y: 0
            };
            if (this._nodesLayer && this._nodesLayer.hoveredNode) {
                if (this._labelsLayer && !this._labelsLayer.isHidden()) {
                    this._labelHidedOnMove = true;
                    this._labelsLayer.hide();
                }
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
                    (_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.testEdge(position);
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        if (this._selectMode) {
            this._selectMode = false;
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
                if (this._nodesLayer.hoveredNode) {
                    if (event.ctrlKey) {
                        this._nodesLayer.setActiveNodes([this._nodesLayer.hoveredNode, ...this._nodesLayer.activeNodes]);
                    }
                    else {
                        const activeNodes = [this._nodesLayer.hoveredNode, ...this.neighbourhoodNodes[this._nodesLayer.hoveredNode.id]];
                        this._nodesLayer.setActiveNodes(activeNodes);
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
                this._render();
            }
            if (((_a = this._edgesLayer) === null || _a === void 0 ? void 0 : _a.hoveredEdge) && event.button === 0) {
                this._edgesLayer.clearActiveEdges();
                (_b = this._arrowsLayer) === null || _b === void 0 ? void 0 : _b.clearActiveArrowOfEdges();
                const hoveredEdges = this._edgesLayer.hoveredEdge;
                if (hoveredEdges.__active) {
                    (_c = this._edgesLayer) === null || _c === void 0 ? void 0 : _c.setDeactivatedEdges([hoveredEdges]);
                    (_d = this._arrowsLayer) === null || _d === void 0 ? void 0 : _d.setDeactivatedArrowByEdges([hoveredEdges]);
                    // Деактивируем ноды ребра
                    (_e = this._nodesLayer) === null || _e === void 0 ? void 0 : _e.clearHoveredNodes();
                    this.onEvent.emit('selectEdge', { selectedEdge: undefined });
                }
                else {
                    (_f = this._edgesLayer) === null || _f === void 0 ? void 0 : _f.setActiveEdges([hoveredEdges]);
                    (_g = this._arrowsLayer) === null || _g === void 0 ? void 0 : _g.setActiveArrowByEdges([hoveredEdges]);
                    (_h = this._nodesLayer) === null || _h === void 0 ? void 0 : _h.clearActiveNodes();
                    (_j = this._nodesLayer) === null || _j === void 0 ? void 0 : _j.setHoveredNodes([hoveredEdges.source, hoveredEdges.target]);
                    this.onEvent.emit('selectEdge', { selectedEdge: hoveredEdges });
                }
                if (this._arrowsLayer) {
                    this._arrowsLayer.recalculate();
                }
                this._render();
            }
        }
        if (this._nodesLayer && !this._nodesLayer.hoveredNode && this._edgesLayer && !this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('workspaceClick');
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
        if (this._nodesLayer && this._nodesLayer.hoveredNode) {
            const coordinates = this._translateCoordinates(this._nodesLayer.hoveredNode.x, this._nodesLayer.hoveredNode.y);
            this.onEvent.emit('nodeClick', { node: this._nodesLayer.hoveredNode, ...coordinates, scale: this._controls.scale });
        }
        if (this._edgesLayer && this._edgesLayer.hoveredEdge) {
            this.onEvent.emit('edgeClick', { edge: this._edgesLayer.hoveredEdge, scale: this._controls.scale });
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
    translateCoordinatesFromCamera(x, y) {
        const vector = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(x, y, 0);
        return {
            x: vector.x,
            y: -vector.y
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9saWIvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsS0FBSyxFQUNMLGlCQUFpQixFQUNqQixLQUFLLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxPQUFPLEVBQ1AsT0FBTyxFQUNQLGFBQWEsR0FDZCxNQUFNLE9BQU8sQ0FBQztBQUVmLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHekMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsTUFBTSxPQUFPLFVBQVU7SUEwR3JCLFlBQVksT0FBcUI7UUF4RzFCLFlBQU8sR0FBaUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUzQyxzQkFBaUIsR0FBVyxHQUFHLENBQUM7UUFFaEMsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFFNUIsdUJBQWtCLEdBQTJCLEVBQUUsQ0FBQztRQUVoRCx1QkFBa0IsR0FBMkIsRUFBRSxDQUFDO1FBRWhELGVBQVUsR0FBcUI7WUFDcEMsVUFBVSxFQUFFLElBQUk7WUFDaEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsS0FBSztZQUNiLFlBQVksRUFBRTtnQkFDWixTQUFTLEVBQUUsU0FBUztnQkFDcEIsVUFBVSxFQUFFLFNBQVM7Z0JBQ3JCLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsU0FBUzthQUN0QjtTQUNGLENBQUM7UUFNTSxhQUFRLEdBQWlCLEVBQUUsQ0FBQztRQUk1QixlQUFVLEdBQWdCLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFFeEMsU0FBSSxHQUFXLEVBQUUsQ0FBQztRQUVsQixTQUFJLEdBQVcsS0FBSyxDQUFDO1FBRXJCLFdBQU0sR0FBVSxFQUFFLENBQUM7UUFFbkIsV0FBTSxHQUFVLEVBQUUsQ0FBQztRQUVuQixZQUFPLEdBQVEsSUFBSSxDQUFDO1FBSXBCLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBRWpDLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFFM0IsV0FBTSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFFckIsZUFBVSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUM7UUFFN0Isa0JBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBRTdCLFlBQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRXhCLGtCQUFhLEdBQTJCLEVBQUUsQ0FBQztRQUUzQyxpQkFBWSxHQUF1QixJQUFJLENBQUM7UUFFeEMsaUJBQVksR0FBdUIsSUFBSSxDQUFDO1FBRXhDLGdCQUFXLEdBQXNCLElBQUksQ0FBQztRQUV0QyxnQkFBVyxHQUFzQixJQUFJLENBQUM7UUFNdEMsZ0JBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBRTVCLGtCQUFhLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUU5QixzQkFBaUIsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO1FBSWxDLG1CQUFjLEdBQVcsQ0FBQyxDQUFDO1FBRTNCLHNCQUFpQixHQUFZLEtBQUssQ0FBQztRQUVuQyxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQXVCbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUMxQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDO1lBRXpDLElBQUksT0FBTyxDQUFDLGNBQWMsRUFBRTtnQkFDMUIsV0FBVztnQkFDWCxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFDaEM7U0FDRjtRQUVELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRXRCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDckYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUV0QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUU3QixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUU7WUFDL0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDMUI7U0FDRjtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxFQUFFO1lBQ3pCLFlBQVksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO2dCQUNwQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtvQkFDbEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ3pGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO29CQUNqRixJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUM7aUJBQ3ZDO2dCQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDN0I7Z0JBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDO2lCQUM5QjtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQzdCO2dCQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXZDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztRQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsQ0FBQztRQUVsRSxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUVqQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuRjtJQUNILENBQUM7SUFFRCxJQUFJLE9BQU8sQ0FBQyxPQUFxQjtRQUMvQixzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRU0sT0FBTztRQUNaLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sVUFBVTtRQUNmLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO0lBQ0gsQ0FBQztJQUVNLFVBQVU7UUFDZixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtJQUNILENBQUM7SUFFTSxrQkFBa0I7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxvQkFBb0I7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxZQUFZO1FBQ2pCLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFTLEVBQUUsVUFBNEIsSUFBSSxDQUFDLFVBQVU7UUFFbkUsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDMUIsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixrQkFBa0I7UUFDbEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckQscUNBQXFDO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3pCLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsRDtZQUNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNsRDtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFFOUIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDM0M7U0FDRjtRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFckMsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNoQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7Z0JBQ2pGLElBQUksQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsQ0FBQzthQUN2QztTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFO1lBQ2pCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEMsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNMLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRCxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFO3dCQUNoRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDN0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7d0JBQzdDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUN6QyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztxQkFDMUM7eUJBQU07d0JBQ0wsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDbEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDcEgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzt3QkFDOUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDakg7aUJBQ0Y7YUFDRjtZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtZQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUVmLHFCQUFxQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkQ7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtZQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQjtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFeEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxFQUFFLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDekI7WUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFFdEMsb0RBQW9EO1lBRXBELHlIQUF5SDtZQUV6SCxvREFBb0Q7WUFDcEQsd0NBQXdDO1lBRXhDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU0sY0FBYztRQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztTQUNyQztRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVNLFFBQVE7UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNoRDtRQUVELE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQztJQUVNLFdBQVcsQ0FBQyxNQUFjO1FBQy9CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9ELE9BQU87WUFDTCxJQUFJO1lBQ0osR0FBRyxXQUFXO1lBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSztTQUM1QixDQUFDO0lBQ0osQ0FBQztJQUVNLGFBQWE7UUFDbEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLENBQUMsRUFBRSxrQkFBa0IsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7UUFFN0gsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDL0IsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVFLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1QztRQUVELE1BQU0sZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxRCxnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7UUFDckQsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDO1FBQ3ZELE1BQU0sU0FBUyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRCxJQUFJLFNBQVMsRUFBRTtZQUNiLFNBQVMsQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDO1lBQzlCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUUsU0FBUyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUV4RCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7UUFFRCxNQUFNLEtBQUssR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUUsV0FBVyxDQUFFLENBQUM7UUFFeEQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRTtZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBRTlFLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMzQztRQUVELElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRWhDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzFCO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztTQUN6QjtRQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFFeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFFcEIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDdkI7UUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRU8scUJBQXFCO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRTVFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUV0RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRXhFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFFbEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFTyx3QkFBd0I7UUFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9ELElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxTQUFTLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztJQUNwQyxDQUFDO0lBRU8saUJBQWlCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDckM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVPLFlBQVksQ0FBQyxJQUFJO1FBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFdkIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN0RCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDaEQ7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1NBQ3RDO1FBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFakIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUN6QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztTQUN6QztRQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sWUFBWSxDQUFDLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBTzs7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFHbEMsZ0JBQWdCO1lBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7WUFDNUIsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELElBQUksTUFBTSxHQUFHO2dCQUNYLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2FBQ0wsQ0FBQztZQUVGLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQkFFcEQsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDdEQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztvQkFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDMUI7Z0JBRUQsTUFBTSxHQUFHO29CQUNQLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckUsQ0FBQztnQkFHRixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtvQkFDekIsTUFBTSxXQUFXLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2SSxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUNuRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxSCxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUV0RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztpQkFDN0I7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO29CQUNwRSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN2RDtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtvQkFDekMsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQztvQkFDN0IsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDckQsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDckQsSUFBSSxLQUFLLENBQUM7b0JBQ1YsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTt3QkFDM0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7NEJBQzdELElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtnQ0FDcEQsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTs2QkFDaEQ7NEJBRUQsT0FBTyxLQUFLLENBQUM7d0JBQ2YsQ0FBQyxDQUFDLENBQUM7d0JBRUgsSUFBSSxjQUFjLEVBQUU7NEJBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQzt5QkFDdEM7NkJBQU07NEJBQ0wsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzt5QkFDckc7cUJBQ0Y7eUJBQU07d0JBQ0wsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDeEM7b0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUVoRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMseUJBQXlCLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUM1RDtpQkFDRjtnQkFFRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQzthQUN0SDtZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pDO1lBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO2dCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pDO1NBQ0Y7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3ZFLE9BQU87YUFDUjtZQUVELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDeEUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUUsQ0FBQztnQkFDdEUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFFLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBRSxDQUFDO2dCQUVsRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMzRCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUN6RixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDO2FBQ3pGO2lCQUFNO2dCQUNMLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4RCxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztpQkFDMUM7cUJBQU07b0JBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO3dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDO3FCQUNuQztpQkFDRjtnQkFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ2pDO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRU8sVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFOztRQUMxQixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7WUFFbEQsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ3BDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDcEUsS0FBSyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDcEUsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDakQsSUFBSSxJQUFJLEVBQUU7NEJBQ1IsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7eUJBQ3ZCO3FCQUNGO2lCQUNGO2dCQUVELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEVBQUU7b0JBQy9CLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTt3QkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3FCQUN2RDtvQkFFRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQ2hCO2FBQ0Y7U0FFRjthQUFNO1lBQ0wsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFFN0MsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBQztvQkFFL0IsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFHO3dCQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3FCQUNsRzt5QkFBTTt3QkFFTCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7d0JBQ2hILElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO3dCQUU3QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7NEJBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs0QkFDckMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDaEQ7d0JBQ0QsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFOzRCQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO3lCQUNqQztxQkFFRjtpQkFDRjtnQkFHRCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7WUFFRCxJQUFHLENBQUEsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxXQUFXLEtBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7Z0JBQ3JELElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtnQkFDbkMsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSx1QkFBdUIsRUFBRSxDQUFDO2dCQUM3QyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQztnQkFDaEQsSUFBRyxZQUFZLENBQUMsUUFBUSxFQUFDO29CQUN2QixNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLG1CQUFtQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFDckQsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSwwQkFBMEIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUE7b0JBQzdELDBCQUEwQjtvQkFDMUIsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxpQkFBaUIsRUFBRSxDQUFBO29CQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQTtpQkFFN0Q7cUJBQU07b0JBQ0wsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxjQUFjLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFBO29CQUNoRCxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLHFCQUFxQixDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtvQkFFeEQsTUFBQSxJQUFJLENBQUMsV0FBVywwQ0FBRSxnQkFBZ0IsRUFBRSxDQUFDO29CQUNyQyxNQUFBLElBQUksQ0FBQyxXQUFXLDBDQUFFLGVBQWUsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBQzdFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsQ0FBQyxDQUFBO2lCQUNoRTtnQkFHSCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ2pDO2dCQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtTQUNGO1FBRUQsSUFBRyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFDO1lBQ3hHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDckM7UUFFRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUMvQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7U0FDaEM7SUFDSCxDQUFDO0lBRU8sWUFBWSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtRQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3BGLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztTQUN2QjthQUFNLElBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUM7WUFDekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO2lCQUMzQjtnQkFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7b0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztvQkFFcEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2lCQUNoQjtnQkFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFO29CQUMxRixJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDdEU7Z0JBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztnQkFFN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDdkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO2dCQUVuQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO1NBQ0Y7SUFDSCxDQUFDO0lBRU8sUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRTtZQUNwRCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9HLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JIO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3JHO0lBQ0gsQ0FBQztJQUVPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxLQUFLLElBQUksRUFBRTtZQUM3RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9HLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQ3hIO0lBQ0gsQ0FBQztJQUVPLGNBQWMsQ0FBQyxRQUFrQztRQUN2RCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzNIO2FBQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFO1lBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUNsSTtJQUVILENBQUM7SUFFTyxNQUFNO1FBQ1osSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN2SDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzVFO0lBQ0gsQ0FBQztJQUVPLFFBQVEsQ0FBQyxLQUFVO1FBQ3pCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdkM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRWYsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUU7WUFDcEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsR0FBRyxXQUFXLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztTQUNuTDthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQUUsYUFBYSxFQUFFLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO1NBQ3hJO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsMEJBQTBCO1lBQzFCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEQ7WUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVPLHFCQUFxQixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEMsTUFBTSxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNqRSxNQUFNLFVBQVUsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBRW5FLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTdCLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBRSxHQUFHLFNBQVMsQ0FBQztZQUNoRCxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBRSxNQUFNLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBRSxHQUFHLFVBQVUsQ0FBQztTQUNyRDtRQUVELE9BQU87WUFDTCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDWCxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDWixDQUFDO0lBQ0osQ0FBQztJQUVNLDhCQUE4QixDQUFDLENBQVMsRUFBRSxDQUFTO1FBQ3hELE1BQU0sTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFcEMsT0FBTztZQUNMLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNYLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2IsQ0FBQztJQUNKLENBQUM7SUFFTyxXQUFXO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsSUFBSSxPQUFPLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUNqQyxLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztRQUVILGtDQUFrQztRQUNsQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVoQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFekYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDdEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFFcEQsNEJBQTRCO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVPLE9BQU87UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xEO0lBQ0gsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO1FBRTdCLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQzVDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUM5QztZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQzlDO1lBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtnQkFDckMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQzlDO1lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFO2dCQUM1QyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDOUM7WUFFRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFeEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQzlCLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQy9CLHlDQUF5QztnQkFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUN6RDtZQUVELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUNwQztJQUNILENBQUM7SUFFTyxVQUFVLENBQUMsT0FBZ0IsS0FBSztRQUN0QyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQztRQUVELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO1FBRUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7UUFFRCxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNqQztRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNwQixJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDdkM7WUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLEVBQUUsQ0FBQzthQUN2QztTQUNGO0lBQ0gsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxHQUFHO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7SUFDdkQsQ0FBQztJQUVPLFlBQVksQ0FBQyxHQUFXO1FBQzlCLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVuQix3REFBd0Q7UUFDeEQsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsT0FBTyxHQUFHLEdBQUcsUUFBUSxHQUFHLFFBQVEsQ0FBQztTQUNsQztRQUNELE9BQU8sQ0FBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLFFBQVEsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sUUFBUTtRQUNkLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUV6QixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO1FBRUQsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7WUFFbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNWLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtvQkFDbEMsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFO3dCQUN6QixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQzt3QkFDcEQsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7cUJBQ3JEO2lCQUNGO2dCQUVELDRCQUE0QjtnQkFDNUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFdEIsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO29CQUNyQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUMxQjtnQkFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7b0JBQ2hELElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQzFCO2dCQUNELElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25DO2dCQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsS0FBSyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO29CQUNsQyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDaEcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUNqRztpQkFDRjtnQkFFRCw0QkFBNEI7Z0JBQzVCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsSUFBSSxFQUFFLENBQUM7SUFDVCxDQUFDO0NBQ0YifQ==

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
        this._activeEdges = edges.filter((edge) => !edge.__active);
        this._activeEdges.forEach((edge) => edge.__active = true);
        this._setEdgesColor(this._activeEdges, this._graph.dataConfig.colorsEvents.selectEdge);
    }
    setDeactivatedEdges(edges) {
        const deactivateEdges = edges.filter(edges => edges.__active);
        deactivateEdges.forEach(edge => edge.__active = false);
        this._setEdgesColor(deactivateEdges);
    }
    clearActiveEdges() {
        const deactivatingEdges = this._activeEdges.filter((edge) => edge.__active === true && edge !== this.hoveredEdge);
        this._setEdgesSize(deactivatingEdges, 1, 1.3);
        this._setEdgesColor(deactivatingEdges);
        deactivatingEdges.forEach((edge) => edge.__active = false);
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
            color.setStyle(link.color);
            pickingColor.setHex(index + 1);
            if (link.source.x === link.target.x && link.source.y === link.target.y) {
                const vStart = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.source.x, link.source.y || 0, 0);
                const vEnd = new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(link.target.x, link.target.y || 0, 0);
                const d = 15 * link.source.size;
                const endAngle = -0; // Rotate clockwise (from Z angle perspective)
                const startAngle = endAngle + Math.PI / 2;
                const curve = new three__WEBPACK_IMPORTED_MODULE_0__.CubicBezierCurve3(vStart, new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0).add(vStart), new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0).add(vStart), vEnd);
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
    setHoveredNodes(nodes) {
        this.clearHoveredNodes();
        this._hoveredNodes = nodes.filter(n => !n.__active);
        this._hoveredNodes.forEach(n => n.__hovered = true);
        this.setNodesColor(this._hoveredNodes, this._graph.dataConfig.colorsEvents.selectNode);
    }
    clearHoveredNodes() {
        const deactivatingNodes = this._hoveredNodes.filter((n) => n.__hovered === true
            && !n.__active);
        this.setNodesColor(deactivatingNodes);
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
        this.setNodesColor(activatingNodes, this._graph.dataConfig.colorsEvents.selectNode);
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
                    this.setNodesColor(hoveringNodes, this._graph.dataConfig.colorsEvents.hoverNode);
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
            const coordinates = this._graph.translateCoordinatesFromCamera(this._graph._nodes[i].x, this._graph._nodes[i].y);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL25vZGVzL25vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxJQUFJLEVBQ0osZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsZ0JBQWdCLEVBRWhCLHdCQUF3QixFQUN4Qix1QkFBdUIsRUFDdkIsWUFBWSxFQUNaLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsS0FBSyxFQUNMLE9BQU8sRUFDUCxPQUFPLEVBQ1AsaUJBQWlCLEdBQ2xCLE1BQU0sT0FBTyxDQUFDO0FBRWYsT0FBTyxFQUNMLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLFlBQVksR0FDYixNQUFNLFdBQVcsQ0FBQztBQUVuQixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVDLFNBQVMsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsVUFBZSxFQUFFO0lBQzFELElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLE9BQU8sR0FBUSxJQUFJLENBQUM7SUFDeEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLFNBQVMsS0FBSztRQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsT0FBTyxDQUFDLEdBQUcsSUFBVyxFQUFPLEVBQUU7UUFDN0IsTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFD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LFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRztZQUM1RSxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxjQUFjLENBQUUsRUFBRSxHQUFHLENBQUMsQ0FBRSxHQUFHLENBQUMsQ0FBQztZQUU3QixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRWxELE1BQU0sQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FB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

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