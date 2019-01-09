import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

import { PretyGraph } from '@pretty-graph/core';
import { D3Layout } from '@pretty-graph/d3-layout';
import { PrettyGraphControls } from '@pretty-graph/controls';

import * as graphData from '../data/graph_mini.json';

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

  ngOnInit() {
    this._prepareGraphData({ nodes: graphData.nodes, links: graphData.links });
    const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();

    const graph = new PretyGraph({
      container: this._graphContainer.nativeElement,
      controls: PrettyGraphControls
    });

    graph.onEvent.on('nodeContextMenu', (data) => {
      console.log(data);
    });

    graph.onEvent.on('nodeMoving', (data) => {
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

    const agent = new D3Layout({
      useWorker: true
    });

    agent.onEvent.on('tick', (progress) => {
      console.log(progress);
    });

    agent.onEvent.on('end', (data) => {
      const { nodes, links } = data;

      graph.setData({
        nodes: nodes,
        links: links,
        center: 373
      });
    });

    agent.init({
      height: dimensions.height,
      width: dimensions.width,
      nodes: this._nodes,
      links: this._links
    });
    agent.calculate();
    // agent.destroy();
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
