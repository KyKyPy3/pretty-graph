/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

import {
  Box3,
  InstancedInterleavedBuffer,
  InterleavedBufferAttribute,
  Matrix4,
  Mesh,
  Line3,
  Sphere,
  Vector3,
  Vector4
} from 'three';

import {
  LineMaterial
} from './LineMaterial';

import {
  LineSegmentsGeometry
} from './LineSegmentsGeometry';


class LineSegments2 extends Mesh {


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

		var start = new Vector3();
		var end = new Vector3();

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

			var instanceDistanceBuffer = new InstancedInterleavedBuffer( lineDistances, 2, 1 ); // d0, d1

			geometry.setAttribute( 'instanceDistanceStart', new InterleavedBufferAttribute( instanceDistanceBuffer, 1, 0 ) ); // d0
			geometry.setAttribute( 'instanceDistanceEnd', new InterleavedBufferAttribute( instanceDistanceBuffer, 1, 1 ) ); // d1

			return this;

		};

	}() );

	raycast = ( function () {
		const sphere = new Sphere();
		const clipToWorldVector = new Vector4();
		const box = new Box3();
		const ssOrigin = new Vector4();
		const ssOrigin3 = new Vector3();
		const mvMatrix = new Matrix4();


		const start4 = new Vector4();
		const end4 = new Vector4();
		const line = new Line3();
		const closestPoint = new Vector3();

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

export { LineSegments2 };
