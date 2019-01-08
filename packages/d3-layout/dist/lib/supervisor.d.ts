import { EventEmitter } from './emitter';
import { LayoutOptions } from './options';
export declare class D3Layout {
    onEvent: EventEmitter;
    private _worker;
    private _layout;
    private _options;
    constructor(options: LayoutOptions);
    init(data: any): void;
    calculate(): void;
    destroy(): void;
}
