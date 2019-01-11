import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PretyGraph } from '@pretty-graph/core';
import { D3Layout } from '@pretty-graph/d3-layout';
import { PrettyGraphControls } from '@pretty-graph/controls';

import * as graphMini from '../data/graph_data.json';
import * as graphSmall from '../data/graph_small.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('graph') private _graphContainer: ElementRef;

  @ViewChild('tooltip') private _tooltipEl: ElementRef;

  private _links: any[] = [];

  private _nodes: any[] = [];

  private _agent: any;

  ngOnInit() {
    this._prepareGraphData({ nodes: graphMini.nodes, links: graphMini.links });
    const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();

    const graph = new PretyGraph({
      container: this._graphContainer.nativeElement,
      controls: PrettyGraphControls
    });

    graph.onEvent.on('nodeContextMenu', (data) => {
      console.log(data);
    });

    graph.onEvent.on('nodeDblClick', (data) => {
      console.log('Double click', data);
    });

    graph.onEvent.on('workspaceClick', (data) => {
      console.log('Workspace click', data);
    });

    graph.onEvent.on('nodeMoving', (data) => {
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 10 * data.scale - d.height + 'px';
    });

    graph.onEvent.on('nodeScaling', (data) => {
      console.log(data.node.size * 10 * data.scale);
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 10 * data.scale - d.height + 'px';
    });

    graph.onEvent.on('nodeHover', (data) => {
      this._tooltipEl.nativeElement.innerHTML = data.node.name || data.node.id.split(':').pop();
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 10 * data.scale - d.height + 'px';
    });

    graph.onEvent.on('nodeUnhover', () => {
      this._tooltipEl.nativeElement.style.left = -10000 + 'px';
    });

    graph.onEvent.on('edgeHover', (data) => {
      console.log(data);

      this._tooltipEl.nativeElement.innerHTML = `
        ${data.edge.source.name || data.edge.source.id.split(':').pop()}
        -
        ${data.edge.target.name || data.edge.target.id.split(':').pop()}
      `;
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - d.height - 20 + 'px';
    });

    graph.onEvent.on('edgeUnhover', (data) => {
      this._tooltipEl.nativeElement.style.left = -10000 + 'px';
    });

    this._agent = new D3Layout({
      useWorker: true
    });

    this._agent.onEvent.on('tick', (progress) => {
      console.log(progress);
    });

    this._agent.onEvent.on('end', (data) => {
      const { nodes, links } = data;

      graph.setData({
        nodes: nodes,
        links: links,
        center: 373
      });
    });

    this._agent.init({
      height: dimensions.height,
      width: dimensions.width,
      nodes: this._nodes,
      links: this._links
    });
    this._agent.calculate();
    // agent.destroy();
  }

  public addNewData(): void {
    const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();
    this._prepareGraphData({ nodes: graphSmall.nodes, links: graphSmall.links });
    this._agent.init({
      height: dimensions.height,
      width: dimensions.width,
      nodes: this._nodes,
      links: this._links
    });
    this._agent.calculate();
  }

  private _prepareGraphData(data): any {
    this._links = data.links.map((link) => {
      return {
        ...link,
        size: 2,
        color: 0xdcdcdc
      };
    });
    this._nodes = data.nodes.map((node) => {
      if (+node.id === 373) {
        return {
          ...node,
          size: +node.id === 373 ? 15 : 5,
          img: 'assets/user.jpg',
          color: 0xdcdcdc
        };
      } else {
        return {
          ...node,
          size: +node.id === 373 ? 15 : 5,
          img: 'assets/user.jpg',
          color: 0xdcdcdc
        };
      }
    });

  }
}
