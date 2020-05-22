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

  @ViewChild('graph', { static: true }) private _graphContainer: ElementRef;

  @ViewChild('tooltip', { static: true }) private _tooltipEl: ElementRef;

  private _links: any[] = [];

  private _nodes: any[] = [];

  private _agent: any;

  private _graph: PretyGraph;

  private _activeNode: any;

  private _data: any = {};

  constructor(
    private _zone: NgZone
  ) {}

  ngOnInit() {
    this._data = this._generateData(300);

    this.initGraph();
  }

  public activateSelectMode(): void {
    this._graph.activateSelectMode();
  }

  public zoomIn(): void {
    this._graph.zoomIn();
  }

  public zoomOut(): void {
    this._graph.zoomOut();
  }

  public toggleLabels(): void {
    this._graph.toggleLabels();
  }

  public initGraph(): void {
    this._zone.runOutsideAngular(() => {
      this._nodes = this._data.nodes;
      this._links = this._data.links;

      const dimensions = this._graphContainer.nativeElement.getBoundingClientRect();

      this._graph = new PretyGraph({
        container: this._graphContainer.nativeElement,
        controls: PrettyGraphControls,
        showLabels: false
      });

      this._graph.onEvent.on('changeMode', (data) => {
        console.log('New mode: ', data.mode);
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

      this._graph.onEvent.on('nodeClick', (data) => {
        console.log('Node click', data);
      });

      this._graph.onEvent.on('edgeClick', (data) => {
        console.log('Edge click', data);
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
          ${data.edge.source.name}
          -
          ${data.edge.target.name}
        `;
        const d = this._tooltipEl.nativeElement.getBoundingClientRect();
        this._tooltipEl.nativeElement.style.left = data.x - d.width / 2 + 'px';
        this._tooltipEl.nativeElement.style.top = data.y - d.height - 20 + 'px';
      });

      this._graph.onEvent.on('edgeUnhover', () => {
        this._tooltipEl.nativeElement.style.left = -10000 + 'px';
      });

      this._agent = new D3Layout({
        useWorker: true,
        layoutOptions: {
          mainBody: {
            strength: -3000
          }
        }
      });

      this._agent.onEvent.on('tick', (progress) => {
        console.log(progress);
      });

      this._agent.onEvent.on('end', (data) => {
        const { nodes, links } = data;

        this._graph.setData({
          nodes: nodes,
          links: links,
          center: nodes[nodes.length / 2]
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

  public getScreenshot(): void {
    const dataURL = this._graph.getScreenshot();

    const iframe = `
      <iframe
        src="${dataURL}"
        frameborder="0"
        style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;"
        allowfullscreen>
      </iframe>`;

    const win = window.open();
    win.document.open();
    win.document.write( iframe );
    win.document.close();
  }

  public destroyGraph(): void {
    this._graph.destroy();
    this._agent.destroy();
    this._agent = null;
    this._graph = null;
    this._links = [];
    this._nodes = [];
  }

  private _generateData(count: number): any {
    return {
      nodes: [...Array(count).keys()].map((i, index) => {
        return {
          id: i,
          color: 0x99A3A4,
          name: this._getRandomString(Math.random() * (30 - 5) + 5),
          size: Math.random() * (30 - 5) + 5,
          showDot: !(index % 2) ? true : false,
          img: !(index % 10) ? 'assets/user.jpg' : 'assets/web.svg',
          label: this._getRandomString(Math.random() * (30 - 5) + 5)
        };
      }),
      links: [...Array(count).keys()]
        .filter(id => id)
        .map((id, index) => {
          return {
            source: id,
            target: Math.round(Math.random() * (id - 1)),
            color: 0x99A3A4,
            type: !(index % 10) ? 'dashed' : 'solid',
            size: Math.random() * (30 - 5) + 5
          };
      })
    };
  }

  private _getRandomString(length: number): string {
    let s = '';
    do { s += Math.random().toString(36).substr(2); } while (s.length < length);
    s = s.substr(0, length);

    return s;
  }
}
