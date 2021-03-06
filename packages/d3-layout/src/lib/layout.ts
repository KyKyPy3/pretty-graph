import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  Simulation,
} from 'd3-force';

import { EventEmitter } from './emitter';

export class Layout {

  public onEvent: EventEmitter = new EventEmitter();

  private _simulation!: Simulation<{}, any>;

  private _nodes: any[] = [];

  private _links: any[] = [];

  private _options: any = {};

  public init(options: any): void {
    this._nodes = options.nodes;
    this._links = options.links;
    this._options = options.layoutOptions;

    let mainBody = forceManyBody();
    let fLink = forceLink(this._links).id((d: any) => d.id);

    if (this._options.mainBody.strength) {
      mainBody = mainBody.strength(this._options.mainBody.strength);
    }

    if (this._options.mainBody.distanceMin) {
      mainBody = mainBody.distanceMin(this._options.mainBody.distanceMin);
    }

    if (this._options.mainBody.distanceMax) {
      mainBody = mainBody.distanceMax(this._options.mainBody.distanceMax)
    }

    if (this._options.linkDistance) {
      fLink = fLink.distance(this._options.linkDistance)
    }

    this._simulation = forceSimulation(this._nodes)
      .force('charge', mainBody)
      .force('link', fLink)
      .force('center', forceCenter())
      .force('x', forceX().strength(0.1))
      .force('y', forceY().strength(0.1))
      .force('collision', forceCollide().radius((d: any) => {
        return d.size;
      }).iterations(2))
      .velocityDecay(0.08)
      .stop();
  }

  public calculate(): void {
    for (let i = 0, n = Math.ceil(Math.log(this._simulation.alphaMin()) / Math.log(1 - this._simulation.alphaDecay())); i < n; ++i) {
      this.onEvent.emit('tick', i / n);
      this._simulation.tick();
    }

    this.onEvent.emit('end', { nodes: this._nodes, links: this._links });
  }

  public destroy(): void {
    this._simulation.stop();
    this._simulation = null;
    this._links = [];
    this._nodes = [];
  }
}
