import { EventEmitter } from './emitter';
export declare class Layout {
    onEvent: EventEmitter;
    private _simulation;
    private _nodes;
    private _links;
    private _options;
    init(options: any): void;
    calculate(): void;
    destroy(): void;
}
