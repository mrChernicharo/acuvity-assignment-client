import { PiGraph } from "react-icons/pi";
export function Header() {
  return (
    <header className="py-2 px-4 flex items-center justify-center border-b border-gray-500 bg-gray-800">
      <h1 className="font-bold text-4xl flex items-center gap-2">
        <PiGraph />
        Graph Navigator
      </h1>
    </header>
  );
}
