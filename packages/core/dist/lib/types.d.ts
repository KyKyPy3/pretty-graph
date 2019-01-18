export interface Node {
    id: string | number;
    size?: number;
    color?: string | number;
}
export interface Edge {
    size?: number;
    color?: string | number;
    style?: 'solid' | 'dashed';
}
