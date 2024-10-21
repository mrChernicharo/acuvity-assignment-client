import { categoryColors } from "./chartFns";

export function Header() {
  return (
    <header className="pb-2 border-b border-gray-500">
      <h1 className="text-center" style={{ color: categoryColors("0") }}>
        Acuvity
      </h1>
    </header>
  );
}
