export interface INode {
  id: number;
  name: string;
  category: number;
  directNeighbor?: boolean;
}

export interface INodeFull extends INode {
  avatar: string;
  birthDate: Date;
  company: string;
  balance: string;
  registeredAt: Date;
  favoriteFood: string;
}

export interface IEdge {
  id: number;
  source: number;
  destination: number;
}

export interface GraphInfo {
  node: INode;
  relatedNodes: INode[];
}

export interface ChartData extends GraphInfo {
  links: IEdge[];
}

export interface EntryCounts {
  nodes: number;
  edges: number;
}
