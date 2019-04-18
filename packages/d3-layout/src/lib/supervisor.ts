/* tslint:disable-next-line */
import Worker from 'worker-loader?inline,fallback=false!./d3.worker';

import { EventEmitter } from './emitter';
import { Layout } from './layout';
import { defaultOptions, LayoutOptions } from './options';

export class D3Layout {

  public onEvent: EventEmitter = new EventEmitter();

  private _worker!: Worker | null;

  private _layout!: Layout | null;

  private _options: LayoutOptions;

  constructor(options: LayoutOptions) {
    this._options = {...defaultOptions, ...options};

    if (this._options.useWorker) {
      this._worker = new Worker();
    } else {
      this._layout = new Layout();
    }
  }

  public init(data: any): void {
    if (this._options.useWorker && this._worker) {
      this._worker.postMessage({
        height: data.height || 0,
        layoutOptions: this._options.layoutOptions,
        links: data.links || [],
        name: 'init',
        nodes: data.nodes || [],
        width: data.width || 0
      });

      this._worker.onmessage = (e: any) => {
        switch (e.data.type) {
          case 'tick':
            this.onEvent.emit('tick', e.data.progress);
            break;
          case 'end':
            this.onEvent.emit('end', e.data.d);
            break;
        }
      }
    } else {
      if (this._layout) {
        this._layout.init({
          height: data.height || 0,
          layoutOptions: this._options.layoutOptions,
          links: data.links || [],
          nodes: data.nodes || [],
          width: data.width || 0,
        });

        this._layout.onEvent.on('tick', (percent) => {
          this.onEvent.emit('tick', percent);
        });

        this._layout.onEvent.on('end', (d) => {
          this.onEvent.emit('end', d);
        });
      }
    }
  }

  public calculate(): void {
    if (this._options.useWorker && this._worker) {
      this._worker.postMessage({
        name: 'calculate'
      });
    } else {
      if (this._layout) {
        this._layout.calculate();
      }
    }
  }

  public destroy(): void {
    if (this._options.useWorker && this._worker) {
      this._worker.postMessage({
        name: 'destroy'
      });
      this._worker.terminate();
      this._worker = null;
    } else {
      if (this._layout) {
        this._layout.onEvent.removeAllListeners();
        this._layout.destroy();
      }
      this._layout = null;
    }
  }
}
