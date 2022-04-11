import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  EventDispatcher,
  Float32BufferAttribute,
  Mesh,
  ShaderMaterial,
  Sphere,
  Vector2,
} from 'three';

import { fragmentShader, vertexShader } from './shaders';

export class ArrowsLayer extends EventDispatcher {

  private _arrowGeometry!: BufferGeometry | null;

  private _arrowMesh!: Mesh | null;

  private _arrowMaterial!: ShaderMaterial | null;

  private _activeEdges: any[] = [];

  private _graph: any;

  constructor(graph: any) {
    super();

    this._graph = graph;
  }

  public hide(): void {
    if (this._arrowMesh) {
      this._arrowMesh.visible = false;
    }
  }

  public show(): void {
    if (this._arrowMesh) {
      this._arrowMesh.visible = true;
    }
  }

  public recalculate(): void {
    if (!this._arrowGeometry) {
      return;
    }

    const { vertices } = this._calculateArrowData();

    this._arrowGeometry.boundingSphere = this._computeBoundingSphere(vertices);

    const newPosition = new BufferAttribute(vertices, this._arrowGeometry.attributes.position.itemSize, this._arrowGeometry.attributes.position.normalized);
    this._arrowGeometry.setAttribute('position', newPosition);
  }

  public draw(): void {
    this._clearInternalState();

    this._arrowGeometry = new BufferGeometry();

    const { vertices, colors } = this._calculateArrowData();

    this._arrowGeometry.setAttribute('position',
      new BufferAttribute(vertices, 2).setUsage(DynamicDrawUsage));
    this._arrowGeometry.setAttribute('color',
      new Float32BufferAttribute( colors, 3 ).setUsage(DynamicDrawUsage));

    this._arrowGeometry.computeVertexNormals();
    this._arrowGeometry.boundingSphere = this._computeBoundingSphere(vertices);

    this._arrowMaterial = new ShaderMaterial({
      depthTest: false,
      fragmentShader,
      side: BackSide,
      transparent: false,
      vertexColors: true,
      vertexShader,
    });

    this._arrowMaterial.name = 'ArrowMaterial';

    this._arrowMesh = new Mesh(this._arrowGeometry, this._arrowMaterial);
    this._graph._scene.add(this._arrowMesh);
  }


  public dispose(): void {
    this._clearInternalState();

    this._graph = null;
  }

  public clearActiveArrowOfEdges(){
      this.setArrowsColor(this._activeEdges)
  }

  public setActiveArrowByEdges(edges: any[]){
    this._activeEdges = edges
    this.setArrowsColor(this._activeEdges, this._graph.dataConfig.colorsEvents.selectEdge)
  }

  public setDeactivatedArrowByEdges(edges: any[]){
    edges.map(x => this._activeEdges.indexOf(x)).forEach(index => {
      this._activeEdges.splice(index , 1)
    })
    this.setArrowsColor(edges)
  }

  public setArrowsColor(edges: any[], newColor?: string){
    if (!edges.length) {
      return;
    }

    const color = new Color();

    for (const edge of edges) {
      if (newColor) {
        color.setStyle(newColor);
      } else {
        color.setStyle(edge.color);
      }

      const index = edge.__arrowIndex / 3;
      this._arrowGeometry?.attributes.color.setXYZ(index, color.r, color.g, color.b);
      this._arrowGeometry?.attributes.color.setXYZ(index + 1, color.r, color.g, color.b);
      this._arrowGeometry?.attributes.color.setXYZ(index + 2, color.r, color.g, color.b);


    }

    if(this._arrowGeometry){
      this._arrowGeometry.attributes.color.needsUpdate = true;
    }

  }


  private _clearInternalState(): void {
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

  private _calculateArrowData(): any {
    const edges = this._graph._edges;
    const vertices = new Float32Array(edges.length * 6);
    const colors = new Float32Array(edges.length * 9);

    const color = new Color();
    for ( let i = 0, i2 = 0, c3 = 0, l = edges.length; i < l; i ++, i2 += 6, c3 += 9 ) {
      if (edges[i].arrow === 'none') {
        continue;
      }
      let source;
      let target;

      if (!edges[i].arrow || edges[i].arrow === 'target') {
        source = edges[i].source;
        target = edges[i].target;
      } else {
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

  private _calculateArrowVertices(size, sourcePoint, targetPoint): any {
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
    const pointOnLine = [sourceX + scalingOnLineFactor * dx / vNorm, sourceY + scalingOnLineFactor * dy / vNorm]

    // endpoints of arrows at length above point (the distance from the original line
    const pointBelow = [pointOnLine[0] - scalingCornerFactor * -dy / vNorm, pointOnLine[1] - scalingCornerFactor * dx / vNorm, ]
    const pointAbove = [pointOnLine[0] + scalingCornerFactor * -dy / vNorm, pointOnLine[1] + scalingCornerFactor * dx / vNorm, ]

    return {
      pointAbove,
      pointBelow,
      pointOnLine: [sourceX, sourceY]
    }
  }

  private _computeBoundingSphere(positions: any): Sphere {
    const boundingSphere = new Sphere();

    if ( positions ) {
      const vector = new Vector2();
      const center = new Vector2(boundingSphere.center.x, boundingSphere.center.y);

      let maxRadiusSq = 0;

      for ( let i = 0, il = positions.length; i < il; i += 2 ) {

        vector.fromArray( positions, i );
        maxRadiusSq = Math.max( maxRadiusSq, center.distanceToSquared( vector ) );

      }

      boundingSphere.radius = Math.sqrt(maxRadiusSq);

      if ( isNaN( boundingSphere.radius ) ) {
        /* tslint:disable-next-line no-console */
        console.error( 'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this );
      }
    }

    return boundingSphere;
	}

}
