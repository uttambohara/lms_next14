import Logo from "./logo";
import SidebarList from "./sidebar/sidebar-list";

export default function Sidebar() {
  return (
    <aside className="row-span-full hidden border-r border-gray-100 py-4 md:flex-col md:gap-6 lg:flex">
      <div>
        <Logo />
      </div>

      <SidebarList />
    </aside>
  );
}
