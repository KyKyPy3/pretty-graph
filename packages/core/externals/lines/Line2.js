/**
 * @author WestLangley / http://github.com/WestLangley
 *
 */

import {
  LineGeometry,
  LineMaterial
} from 'three';

import { LineSegments2 } from './LineSegments2';

class Line2 extends LineSegments2 {
	constructor(
		geometry = new LineGeometry(),
		material = new LineMaterial({
			color: Math.random() * 0xffffff
		})
	) {
		super( geometry, material );
		this.type = 'Line2';
	}
}

Line2.prototype.isLine2 = true;

export { Line2 };
