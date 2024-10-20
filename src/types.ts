export interface INode {
  id: number;
  name: string;
  category: number;
}

export interface IEdge {
  id: number;
  source: number;
  destination: number;
}

export interface NodeInfo {
  node: INode;
  relatedNodes: INode[];
}
