import SidebarSheet from "@/components/sidebar-sheet";
import HeaderButtons from "./header-buttons";

export default function Header() {
  return (
    <header className="border-b border-gray-200 flex items-center px-4">
      <div className="lg:hidden">
        <SidebarSheet />
      </div>

      <HeaderButtons />
    </header>
  );
}
