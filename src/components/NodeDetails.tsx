import { FaBuilding } from "react-icons/fa6";
import { GiMeal } from "react-icons/gi";
import { categoryColors } from "../utils/chartFns";
import { INodeFull } from "../utils/types";

const dateIntl = new Intl.DateTimeFormat("en-us", { dateStyle: "medium" });

export function NodeDetails({ node }: { node: INodeFull }) {
  const age = Math.floor((Date.now() - new Date(node.birthDate).getTime()) / (365 * 24 * 60 * 60 * 1000));

  return (
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
  );
}
