import { CanvasTexture, EventDispatcher } from 'three';
export declare class ImageCanvas extends EventDispatcher {
    canvas: HTMLCanvasElement;
    textureMap: CanvasTexture;
    textureWidth: number;
    textureHeight: number;
    canvasHeight: number;
    canvasWidth: number;
    private _ctx;
    private _nodeImageToIndex;
    private _textureIndex;
    constructor();
    dispose(): void;
    loadImage(imageUrl: string): number;
}
