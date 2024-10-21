export interface INode {
  id: number;
  name: string;
  category: number;
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

export interface NodeInfo {
  node: INode;
  relatedNodes: INode[];
}
