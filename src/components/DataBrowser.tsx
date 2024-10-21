import { INodeFull, NodeInfo } from "../utils/types";
import { categoryColors } from "../utils/chartFns";
import { FaBuilding } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";

interface Props {
  nodeInfo: NodeInfo | null;
  selectNode: (id: number) => void;
}

const dateIntl = new Intl.DateTimeFormat("en-us", { dateStyle: "medium" });

export function DataBrowser({ nodeInfo, selectNode }: Props) {
  if (!nodeInfo) return null;

  const { node: fullNode, relatedNodes } = nodeInfo;

  const node = fullNode as INodeFull;
  const age = Math.floor((Date.now() - new Date(node.birthDate).getTime()) / (365 * 24 * 60 * 60 * 1000));

  return (
    <div className="fixed bottom-0 w-screen border-t border-gray-500">
      <div className="flex flex-col items-center space-y-6 px-6">
        <div className="flex gap-4 translate-y-4">
          <div className="p-2 rounded-lg" style={{ background: categoryColors(String(node.category)) }}>
            <img src={node.avatar} width={50} height={50} className="rounded-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl" style={{ color: categoryColors(String(node.category)) }}>
                {node.name}
              </span>
              <span>{node.balance}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaBuilding /> {node.company}
            </div>
            <div>age: {age}</div>
            <div>registered at: {dateIntl.format(new Date(node.registeredAt))}</div>
            <div className="flex items-center gap-2">
              <GiMeal /> {node.favoriteFood}
            </div>
          </div>
        </div>

        <div className="text-left w-full translate-y-2">{node.name}'s neighbors</div>
        <ul className="flex gap-2 px-6 pb-8 pt-1 w-screen overflow-x-auto">
          {relatedNodes.map((n) => (
            <li key={n.id}>
              <button style={{ background: categoryColors(String(n.category)) }} onClick={() => selectNode(n.id)}>
                {n.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
