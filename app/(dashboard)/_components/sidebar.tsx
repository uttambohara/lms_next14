import Logo from "./logo";
import SidebarList from "./sidebar/sidebar-list";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex border-r border-gray-100 row-span-full py-4 md:gap-6 md:flex-col">
      <div>
        <Logo />
      </div>

      <SidebarList />
    </aside>
  );
}
