export interface Node {
  id: string | number;
  size?: number;
  color?: string | number;
}

export interface Edge {
  size?: number;
  color?: string | number;
  style?: 'solid' | 'dashed';
  arrow?: 'none' | 'source' | 'target';
}

export interface IGraphDataConfig {
  showLabels: boolean,
  animate: boolean,
  locate: boolean,
  colorsEvents: {
    hoverEdge: string,
    selectEdge: string,
    hoverNode: string,
    selectNode: string,
  }
}
