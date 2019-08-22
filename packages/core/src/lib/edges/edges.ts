import {
  Color,
  CubicBezierCurve3,
  EventDispatcher,
  InstancedBufferAttribute,
  LinearFilter,
  Scene,
  Vector3,
  VertexColors,
  WebGLRenderTarget
} from 'three';

import { Line2 } from '../../../externals/lines/Line2.js';
import { LineMaterial } from '../../../externals/lines/LineMaterial.js';
import { LineSegmentsGeometry } from '../../../externals/lines/LineSegmentsGeometry.js';

export class EdgesLayer extends EventDispatcher {

  private _lineMaterial!: LineMaterial;

  private _linePickingMaterial!: LineMaterial;

  private _lineGeometry!: LineSegmentsGeometry;

  private _linesPickingGeometry!: LineSegmentsGeometry;

  private _graph: any;

  private _lineMesh!: Line2;

  private _linePickingMesh!: Line2;

  private _pickingLineScene!: Scene | null;

  private _pickingTexture!: WebGLRenderTarget | null;

  private _hoveredEdge: any = null;

  private _hoveredEdgeID: number = -1;

  constructor(graph: any) {
    super();

    this._graph = graph;
    this._pickingTexture = new WebGLRenderTarget(this._graph._container.clientWidth, this._graph._container.clientHeight);
    this._pickingTexture.texture.minFilter = LinearFilter;

    this._pickingLineScene = new Scene();
    this._pickingLineScene.background = new Color(0x000000);
  }

  get hoveredEdge(): any {
    return this._hoveredEdge;
  }

  public onResize(): void {
    if (this._lineMaterial) {
      this._lineMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);
      this._lineMaterial.needsUpdate = true;
    }

    if (this._pickingTexture) {
      this._pickingTexture.setSize(this._graph._container.clientWidth, this._graph._container.clientHeight);
    }
  }

  public onScale(scale: number): void {
    this._lineMaterial.uniforms.scale.value = scale;
    this._lineMaterial.needsUpdate = true;

    this._linePickingMaterial.uniforms.scale.value = scale;
    this._linePickingMaterial.needsUpdate = true;
  }

  public draw(): void {
    this._disposeInternal();
    const linesData = this._constructLines(this._graph._edges);

    this._constructMesh(linesData);
    this._constructPickingMesh(linesData);
  }

  public dispose(): void {
    this._disposeInternal();

    if (this._pickingLineScene) {
      (this._pickingLineScene as any).dispose();
      this._pickingLineScene = null;
    }

    if (this._pickingTexture) {
      this._pickingTexture.dispose();
      this._pickingTexture = null;
    }

    this._graph = null;
    this._hoveredEdge = null;
    this._hoveredEdgeID = -1;
  }

  public _setEdgesSize(edges: any[], sizeMul: number, sizeDiv: number): void {
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
        } else {
          this._lineGeometry.attributes.linewidth.setX(edge._lineSizeRange[0], edge.size);
        }

        this._lineGeometry.attributes.linewidth.updateRange = { offset: edge._lineSizeRange[0], count };
      }
    }

    this._setPickingLineSize(edges);

    this._lineGeometry.attributes.linewidth.needsUpdate = true;
  }

  public resetHoverEdge(): void {
    if (this._hoveredEdge) {
      this._setEdgesSize([this._hoveredEdge], 1, 1.3);

      this._graph.onEvent.emit('edgeUnhover', { edge: this._hoveredEdge });
      this._hoveredEdge = null;
      this._hoveredEdgeID = -1;
    }
  }

  public testEdge(position: any): void {
    if (this._pickingTexture) {
      this._graph._renderer.setRenderTarget(this._pickingTexture);
      this._graph._renderer.render(this._pickingLineScene, this._graph._camera);
      this._graph._renderer.setRenderTarget(null);
      const pixelBuffer = new Uint8Array(4);
      this._graph._renderer.readRenderTargetPixels(this._pickingTexture, position.x, this._pickingTexture.height - position.y, 1, 1, pixelBuffer);
      /* tslint:disable-next-line */
      const id = (pixelBuffer[0]<<16)|(pixelBuffer[1]<<8)|(pixelBuffer[2]);
      if (id) {
        if (this._hoveredEdgeID !== id - 1) {
          this.resetHoverEdge();

          this._hoveredEdge = this._graph._edges[id - 1];
          this._hoveredEdgeID = id - 1;

          this._setEdgesSize([this._hoveredEdge], 1.3, 1);

          // ToDo: отсылать надо центр ребра?
          this._graph.onEvent.emit('edgeHover', { edge: this._hoveredEdge, ...position });
        }
      } else {
        this.resetHoverEdge();
      }
    }
  }

  public recalculate(): void {
    const linesData = this._constructLines(this._graph._edges);
    this._lineGeometry.setPositions(linesData.positions);
  }

  public recalculatePicking(): void {
    const linesData = this._constructLines(this._graph._edges);
    this._linesPickingGeometry.setPositions(linesData.positions);
  }

  private _setPickingLineSize(edges): void {
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
        } else {
          this._linesPickingGeometry.attributes.linewidth.setX(edge._lineSizeRange[0], edge.size);
        }

        this._linesPickingGeometry.attributes.linewidth.updateRange = { offset: edge._lineSizeRange[0], count };
      }
    }

    this._linesPickingGeometry.attributes.linewidth.needsUpdate = true;
  }

  private _constructMesh(linesData): void {
    this._lineGeometry = new LineSegmentsGeometry();
    this._lineGeometry.setPositions(linesData.positions);
    this._lineGeometry.setColors(linesData.colors);

    const lineWidthAttr = new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1);
    lineWidthAttr.setDynamic(true);

    const dashedAttr = new InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1);
    dashedAttr.setDynamic(true);

    this._lineGeometry.addAttribute('linewidth', lineWidthAttr);
    this._lineGeometry.addAttribute('dashed', dashedAttr);

    this._lineGeometry.attributes.instanceStart.data.dynamic = true;
    this._lineGeometry.attributes.instanceEnd.data.dynamic = true;

    this._lineMaterial = new LineMaterial({
      dashScale: 0.1,
      dashSize: 2,
      depthTest: false,
      gapSize: 1,
      scale: this._graph._controls ? this._graph._controls.scale : 1.0,
      vertexColors: VertexColors
    });

    this._lineMaterial.useColor = 1.0;
    this._lineMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);

    this._lineMesh = new Line2(this._lineGeometry, this._lineMaterial);
    this._lineMesh.computeLineDistances();
    this._graph._scene.add(this._lineMesh);
  }

  private _constructPickingMesh(linesData): void {
    this._linesPickingGeometry = new LineSegmentsGeometry();
    this._linesPickingGeometry.setPositions(linesData.positions);
    this._linesPickingGeometry.setColors(linesData.pickingColors);

    const lineWidthAttr = new InstancedBufferAttribute(new Float32Array(linesData.sizes), 1);
    lineWidthAttr.setDynamic(true);

    const dashedAttr = new InstancedBufferAttribute(new Float32Array(linesData.isDashed), 1);
    dashedAttr.setDynamic(true);

    this._linesPickingGeometry.addAttribute('linewidth', lineWidthAttr);
    this._linesPickingGeometry.addAttribute('dashed', dashedAttr);

    this._linesPickingGeometry.attributes.instanceStart.data.dynamic = true;
    this._linesPickingGeometry.attributes.instanceEnd.data.dynamic = true;

    this._linePickingMaterial = new LineMaterial({
      dashScale: 0.1,
      dashSize: 2,
      depthTest: false,
      gapSize: 1,
      scale: this._graph._controls ? this._graph._controls.scale : 1.0,
      vertexColors: VertexColors
    });

    this._linePickingMaterial.useColor = 1.0;
    this._linePickingMaterial.resolution.set(this._graph._container.clientWidth, this._graph._container.clientHeight);

    this._linePickingMesh = new Line2(this._linesPickingGeometry, this._linePickingMaterial);
    this._linePickingMesh.computeLineDistances();

    if (this._pickingLineScene) {
      this._pickingLineScene.add(this._linePickingMesh);
      this._pickingLineScene.updateMatrixWorld(true);
    }
  }

  private _disposeInternal(): void {
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
  }

  private _constructLines(links: any[]): any {
    const positions: any[] = [];
    const colors: any[] = [];
    const sizes: any[] = [];
    const isDashed: any[] = [];
    const pickingColors: any[] = [];

    const color = new Color();
    const pickingColor = new Color();

    links.forEach((link, index) => {
      const angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);

      let sourceX;
      let sourceY;
      if (link.arrow && link.arrow === 'source') {
        sourceX = link.source.x + ((link.source.size / 2) * this._graph.nodeScalingFactor + link.size * 1.5) * Math.cos(angle);
        sourceY = link.source.y + ((link.source.size / 2) * this._graph.nodeScalingFactor + link.size * 1.5) * Math.sin(angle);
      } else {
        sourceX = link.source.x + ((link.source.size / 2) * this._graph.nodeScalingFactor) * Math.cos(angle);
        sourceY = link.source.y + ((link.source.size / 2) * this._graph.nodeScalingFactor) * Math.sin(angle);
      }

      let targetX;
      let targetY;
      if (link.arrow === 'none' || link.arrow === 'source') {
        targetX = link.target.x - ((link.target.size / 2) * this._graph.nodeScalingFactor) * Math.cos(angle);
        targetY = link.target.y - ((link.target.size / 2) * this._graph.nodeScalingFactor) * Math.sin(angle);
      } else {
        targetX = link.target.x - (((link.target.size / 2) * this._graph.nodeScalingFactor) + link.size * 1.5) * Math.cos(angle);
        targetY = link.target.y - (((link.target.size / 2) * this._graph.nodeScalingFactor) + link.size * 1.5) * Math.sin(angle);
      }

      color.setHex(link.color);
      pickingColor.setHex(index + 1);

      if (link.source.x === link.target.x && link.source.y === link.target.y) {
        const vStart = new Vector3(link.source.x, link.source.y || 0, 0);
        const vEnd = new Vector3(link.target.x, link.target.y || 0, 0);

        const d = 15 * link.source.size;
        const endAngle = -0; // Rotate clockwise (from Z angle perspective)
        const startAngle = endAngle + Math.PI / 2;

        const curve = new CubicBezierCurve3(
          vStart,
          new Vector3(d * Math.cos(startAngle), d * Math.sin(startAngle), 0).add(vStart),
          new Vector3(d * Math.cos(endAngle), d * Math.sin(endAngle), 0).add(vStart),
          vEnd
        );
        const points = curve.getPoints(50);
        link._lineSizeRange = [sizes.length, sizes.length + points.length * 2];

        let lastPoint;
        for (let i = 0; i < points.length - 1; i += 2) {
          if (lastPoint) {
            positions.push(
              lastPoint.x, lastPoint.y, 0,
              points[i].x, points[i].y, 0,
              points[i].x, points[i].y, 0,
              points[i + 1].x, points[i + 1].y, 0
            );

            sizes.push(link.size, link.size);

            if (link.type === 'dashed') {
              isDashed.push(1.0, 1.0);
            } else {
              isDashed.push(0.0, 0.0);
            }

            colors.push(
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b,  // color end
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b  // color end
            );

            pickingColors.push(
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
            );
          } else {
            positions.push(
              points[i].x, points[i].y, 0,
              points[i + 1].x, points[i + 1].y, 0
            );

            sizes.push(link.size);
            if (link.type === 'dashed') {
              isDashed.push(1.0);
            } else {
              isDashed.push(0.0);
            }

            colors.push(
              color.r, color.g, color.b, // color start
              color.r, color.g, color.b  // color end
            );

            pickingColors.push(
              pickingColor.r, pickingColor.g, pickingColor.b,
              pickingColor.r, pickingColor.g, pickingColor.b,
            );
          }
          lastPoint = points[i + 1];
        }
      } else {
        positions.push(
          sourceX, sourceY, 0, // start point
          targetX, targetY, 0  // end point
        );

        link._lineSizeRange = [sizes.length, sizes.length + 1];
        sizes.push(link.size);
        if (link.type === 'dashed') {
          isDashed.push(1.0);
        } else {
          isDashed.push(0.0);
        }

        colors.push(
          color.r, color.g, color.b, // color start
          color.r, color.g, color.b  // color end
        );

        pickingColors.push(
          pickingColor.r, pickingColor.g, pickingColor.b,
          pickingColor.r, pickingColor.g, pickingColor.b,
        );
      }
    });

    return {
      colors,
      isDashed,
      pickingColors,
      positions,
      sizes,
    }
  }
}
