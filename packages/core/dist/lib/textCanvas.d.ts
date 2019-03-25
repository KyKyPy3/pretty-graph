import { CanvasTexture, EventDispatcher } from 'three';
export declare class TextCanvas extends EventDispatcher {
    canvas: HTMLCanvasElement | null;
    textureMap: CanvasTexture;
    textureWidth: number;
    textureHeight: number;
    canvasHeight: number;
    canvasWidth: number;
    private _ctx;
    private _textOptionsToIndex;
    private _textureIndex;
    constructor();
    dispose(): void;
    drawText(text: string, options: any): number;
}
