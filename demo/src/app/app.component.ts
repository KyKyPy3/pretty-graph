import { Component, ViewChild, ElementRef, OnInit, NgZone } from '@angular/core';

import { PretyGraph } from '@pretty-graph/core';
import { D3Layout } from '@pretty-graph/d3-layout';
import { PrettyGraphControls } from '@pretty-graph/controls';

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

  private _data: any;

  constructor(
    private _zone: NgZone
  ) {}

  ngOnInit() {
    this._data = this._generateData(300);

    this.initGraph();
  }

  public initGraph(): void {
    this._zone.runOutsideAngular(() => {
      this._links = this._data.links;
      this._nodes = this._data.nodes;

      const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();

      this._graph = new PretyGraph({
        container: this._graphContainer.nativeElement,
        controls: PrettyGraphControls,
        showLabels: true
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
        if (this._activeNode) {
          const node = this._graph.getNodeByID(this._activeNode.id);

          const d = this._tooltipEl.nativeElement.getBoundingClientRect();
          this._tooltipEl.nativeElement.style.left = node.x - d.width / 2 + 'px';
          this._tooltipEl.nativeElement.style.top = node.y - (node.node.size / 2) * 7 * node.scale - d.height + 'px';
        }
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
          animate: true
        });
      });

      this._agent.init({
        height: dimensions.height,
        width: dimensions.width,
        nodes: this._nodes,
        links: this._links
      });
      this._agent.calculate();
    });
  }

  public destroyGraph(): void {
    this._graph.destroy();
    this._agent.destroy();
    this._links = [];
    this._nodes = [];
  }

  private _generateData(size: number): { nodes: any[], links: any[] } {
    return {
      nodes: [...Array(size).keys()].map(i => {
        const nodeSize = Math.random() * (30 - 5) + 5;
        const label = this._getRandomString(nodeSize);

        return {
          id: i,
          name: i,
          label: label,
          type: 'circle',
          img: !(i % 2) ? 'assets/16_mail_c.svg' : 'assets/user.jpg',
          color: 0x99A3A4,
          size: nodeSize,
          showDot: !(i % 2) ? true : false
        };
      }),
      links: [...Array(size).keys()]
        .filter(id => id)
        .map(id => {
          const targetID = Math.round(Math.random() * (id - 1));

          return {
            source: id,
            target: targetID,
            id: `${id}__${targetID}`,
            type: id % 10 === 0 ? 'dashed' : 'solid',
            color: 0x99A3A4,
            size: Math.random() * (8 - 1) + 1
          };
        })
    };
  }

  /**
   * Generate random string with given length
   */
  private _getRandomString(length: number): string {
    let s = '';
    do { s += Math.random().toString(36).substr(2); } while (s.length < length);
    s = s.substr(0, length);

    return s;
  }
}
