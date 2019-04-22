export interface LayoutOptions {
    useWorker?: boolean;
    layoutOptions?: {
        linkDistance?: number;
        mainBody: {
            strength?: number;
            distanceMin?: number;
            distanceMax?: number;
        };
    };
}
export declare const defaultOptions: {
    layoutOptions: {
        linkDistance: number;
        mainBody: {
            distanceMin: number;
            strength: number;
        };
    };
    useWebworker: boolean;
};
