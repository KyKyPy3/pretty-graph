export interface LayoutOptions {
  useWorker?: boolean;
  layoutOptions?: {
    linkDistance?: number;
    mainBodyStrength?: number;
  }
}

export const defaultOptions = {
  layoutOptions: {
    linkDistance: 300,
    mainBodyStrength: -1000
  },
  useWebworker: true
}
