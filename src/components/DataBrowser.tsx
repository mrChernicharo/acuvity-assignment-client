import { INodeFull, NodeInfo } from "../utils/types";
import { NodeNeighbors } from "./NodeNeighbors";
import { NodeDetails } from "./NodeDetails";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;
  const { node, relatedNodes } = nodeInfo;
  const fullNode = node as INodeFull;

  return (
    <div className="fixed bottom-0 w-screen border-t border-gray-500 bg-gray-800">
      <div className="flex flex-col items-center space-y-6 px-6">
        <NodeDetails node={fullNode} />

        <NodeNeighbors node={node} neighbors={relatedNodes} selectNode={selectNode} />
      </div>
    </div>
  );
}
