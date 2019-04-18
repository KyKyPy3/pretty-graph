export interface LayoutOptions {
    useWorker?: boolean;
    layoutOptions?: {
        linkDistance?: number;
        mainBodyStrength?: number;
    };
}
export declare const defaultOptions: {
    layoutOptions: {
        linkDistance: number;
        mainBodyStrength: number;
    };
    useWebworker: boolean;
};
