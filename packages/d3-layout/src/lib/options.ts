export interface LayoutOptions {
  useWorker?: boolean;
  layoutOptions?: {
    linkDistance?: number;
    mainBody: {
      strength?: number;
      distanceMin?: number;
      distanceMax?: number;
    }
  }
}

export const defaultOptions = {
  layoutOptions: {
    linkDistance: 300,
    mainBody: {
      distanceMin: 1,
      strength: -1000
    }
  },
  useWebworker: true
}
