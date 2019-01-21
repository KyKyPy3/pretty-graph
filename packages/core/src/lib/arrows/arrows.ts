import {
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Color,
  EventDispatcher,
  Float32BufferAttribute,
  Mesh,
  Scene,
  ShaderMaterial,
  Vector3,
  VertexColors
} from 'three';

import { fragmentShader, vertexShader } from './shaders';

export class ArrowsLayer extends EventDispatcher {

  private _scene: Scene;

  // private _controls: any;

  private _arrowGeometry!: BufferGeometry;

  private _arrowMesh!: Mesh;

  private _arrowMaterial!: ShaderMaterial;

  private _nodeScalingFactor: number = 1.0;

  private _arrows: any[] = [];

  constructor(scene: Scene, _controls: any, nodeScalingFactor: number) {
    super();

    this._scene = scene;
    // this._controls = controls;
    this._nodeScalingFactor = nodeScalingFactor;
  }

  public addArrow(source: any, target: any, size: number, color: any): void {
    this._arrows.push({
      color,
      size,
      source,
      target
    });
  }

  public hide(): void {
    this._arrowMesh.visible = false;
  }

  public show(): void {
    this._arrowMesh.visible = true;
  }

  public reset(): void {
    this._arrows = [];
  }

  public reposition(): void {
    const { vertices, normals } = this._calculateArrowData();

    this._arrowGeometry.attributes.position.array = vertices;
    this._arrowGeometry.attributes.normal.array = normals;

    (this._arrowGeometry.attributes.position as BufferAttribute).needsUpdate = true;
    (this._arrowGeometry.attributes.normal as BufferAttribute).needsUpdate = true;
  }

  public draw(): void {
    this._arrowGeometry = new BufferGeometry();

    const { vertices, normals, colors } = this._calculateArrowData();

    this._arrowGeometry.addAttribute('position', new BufferAttribute(vertices, 3).setDynamic(true));
    this._arrowGeometry.addAttribute('normal', new Float32BufferAttribute( normals, 3 ).setDynamic(true));
    this._arrowGeometry.addAttribute('color', new Float32BufferAttribute( colors, 3 ).setDynamic(true));

    // this._arrowGeometry.computeBoundingSphere();

    this._arrowMaterial = new ShaderMaterial({
      depthTest: false,
      fragmentShader,
      side: BackSide,
      transparent: false,
      vertexColors: VertexColors,
      vertexShader
    });

    this._arrowMesh = new Mesh(this._arrowGeometry, this._arrowMaterial);
    this._scene.add(this._arrowMesh);
  }

  public dispose(): void {
    if (this._arrowMesh) {
      this._scene.remove(this._arrowMesh);
    }

    if (this._arrowMaterial) {
      this._arrowMaterial.dispose();
    }

    if (this._arrowGeometry) {
      this._arrowGeometry.dispose();
    }
  }

  private _calculateArrowData(): any {
    const vertices = new Float32Array(this._arrows.length * 9);
    const normals = new Float32Array(this._arrows.length * 9);
    const colors = new Float32Array(this._arrows.length * 9);

    const color = new Color();
    for ( let i = 0, i3 = 0, l = this._arrows.length; i < l; i ++, i3 += 9 ) {
      color.setHex(this._arrows[i].color);

      const arrowVertices = this._calculateArrowVertices(this._arrows[i].size, this._arrows[i].source, this._arrows[i].target);

      // Add vertices
      vertices[i3 + 0] = arrowVertices.pointBelow[0] || 0;
      vertices[i3 + 1] = arrowVertices.pointBelow[1] || 0;
      vertices[i3 + 2] = 0;

      vertices[i3 + 3] = arrowVertices.pointOnLine[0] || 0;
      vertices[i3 + 4] = arrowVertices.pointOnLine[1] || 0;
      vertices[i3 + 5] = 0;

      vertices[i3 + 6] = arrowVertices.pointAbove[0] || 0;
      vertices[i3 + 7] = arrowVertices.pointAbove[1] || 0;
      vertices[i3 + 8] = 0;

      // Add normals
      const n = this._calculateNormals(arrowVertices);

      normals[i3 + 0] = n.nx;
      normals[i3 + 1] = n.ny;
      normals[i3 + 2] = n.nz;

      normals[i3 + 3] = n.nx;
      normals[i3 + 4] = n.ny;
      normals[i3 + 5] = n.nz;

      normals[i3 + 6] = n.nx;
      normals[i3 + 7] = n.ny;
      normals[i3 + 8] = n.nz;

      // colors
      colors[i3 + 0] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      colors[i3 + 3] = color.r;
      colors[i3 + 4] = color.g;
      colors[i3 + 5] = color.b;

      colors[i3 + 6] = color.r;
      colors[i3 + 7] = color.g;
      colors[i3 + 8] = color.b;
    }

    return {
      colors,
      normals,
      vertices,
    };
  }

  private _calculateArrowVertices(size, sourcePoint, targetPoint): any {
    const radius = (targetPoint.size / 2) * this._nodeScalingFactor - 0.4;

    const dx = sourcePoint.x - targetPoint.x;
    const dy = sourcePoint.y - targetPoint.y;

    const angle = Math.atan2(dy, dx);
    const vNorm = Math.sqrt(dx * dx + dy * dy);

    const sourceX = targetPoint.x + radius * Math.cos(angle);
    const sourceY = targetPoint.y + radius * Math.sin(angle);

    const scalingCornerFactor = size < 6 ? 6 : size;
    const scalingOnLineFactor = size < 6 ? 12 : 2 * size;

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

  private _calculateNormals(arrowVertices): any {
    const pA = new Vector3();
    const pB = new Vector3();
    const pC = new Vector3();

    const cb = new Vector3();
    const ab = new Vector3();

    pA.set(arrowVertices.pointBelow[0], arrowVertices.pointBelow[1], 0);
    pB.set(arrowVertices.pointAbove[0], arrowVertices.pointAbove[1], 0);
    pC.set(arrowVertices.pointOnLine[0], arrowVertices.pointOnLine[1], 0);

    cb.subVectors( pC, pB );
    ab.subVectors( pA, pB );
    cb.cross(ab);

    cb.normalize();

    return {
      nx: cb.x,
      ny: cb.y,
      nz: cb.z
    }
  }

}
