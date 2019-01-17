import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

import { PretyGraph } from '@pretty-graph/core';
import { D3Layout } from '@pretty-graph/d3-layout';
import { PrettyGraphControls } from '@pretty-graph/controls';

import * as graphMini from '../data/before.json';
import * as graphSmall from '../data/after.json';

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

  private _graph: any;

  private _activeNode: any;

  ngOnInit() {
    this._prepareGraphData({ nodes: graphMini.nodes, links: graphMini.links });
    const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();

    this._graph = new PretyGraph({
      container: this._graphContainer.nativeElement,
      controls: PrettyGraphControls
    });

    this._graph.onEvent.on('nodeContextMenu', (data) => {
      console.log(data);
    });

    this._graph.onEvent.on('edgeContextMenu', (data) => {
      console.log(data);
    });

    this._graph.onEvent.on('nodeDblClick', (data) => {
      console.log('Double click', data);
    });

    this._graph.onEvent.on('workspaceClick', () => {
      console.log('Workspace click');
    });

    this._graph.onEvent.on('workspaceViewChanged', () => {
      const node = this._graph.getNodeByID(this._activeNode.id);

      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = node.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = node.y - (node.node.size / 2) * 7 * node.scale - d.height + 'px';
    });

    this._graph.onEvent.on('nodeMoving', (data) => {
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 7 * data.scale - d.height + 'px';
    });

    this._graph.onEvent.on('nodeScaling', (data) => {
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 7 * data.scale - d.height + 'px';
    });

    this._graph.onEvent.on('nodeHover', (data) => {
      this._activeNode = data.node;
      this._tooltipEl.nativeElement.innerHTML = data.node.name || data.node.id.split(':').pop();
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - (data.node.size / 2) * 7 * data.scale - d.height + 'px';
    });

    this._graph.onEvent.on('nodeUnhover', () => {
      this._tooltipEl.nativeElement.style.left = -10000 + 'px';
    });

    this._graph.onEvent.on('edgeHover', (data) => {
      this._tooltipEl.nativeElement.innerHTML = `
        ${data.edge.source.name || data.edge.source.id.split(':').pop()}
        -
        ${data.edge.target.name || data.edge.target.id.split(':').pop()}
      `;
      const d = this._tooltipEl.nativeElement.getBoundingClientRect();
      this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
      this._tooltipEl.nativeElement.style.top = data.y - d.height - 20 + 'px';
    });

    this._graph.onEvent.on('edgeUnhover', () => {
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

      this._graph.setData({
        nodes: nodes,
        links: links,
        center: 1044
      }, {
        animate: false
      });
    });

    this._agent.init({
      height: dimensions.height,
      width: dimensions.width,
      nodes: this._nodes,
      links: this._links
    });
    this._agent.calculate();
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

  public fullscreen(): void {
    this._agent.destroy();
    this._graph.destroy();
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
          img: 'assets/user.jpg',
          color: 0xdcdcdc,
          label: null,
          size: node.size || 5
        };
      } else {
        return {
          ...node,
          size: node.size || 5,
          img: 'assets/user.jpg',
          color: 0xdcdcdc,
          label: null
        };
      }
    });

  }
}
