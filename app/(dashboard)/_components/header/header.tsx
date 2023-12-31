"use client";

import SearchInput from "@/components/search-input";
import SidebarSheet from "@/components/sidebar-sheet";
import { usePathname } from "next/navigation";
import SidebarList from "../sidebar/sidebar-list";
import HeaderButtons from "./header-buttons";

export default function Header() {
  const pathname = usePathname();

  const isBrowse = pathname.includes("/browse");

  return (
    <header className="flex items-center border-b border-gray-200 px-12">
      <div className="lg:hidden">
        <SidebarSheet>
          <SidebarList />
        </SidebarSheet>
      </div>

      <div className="hidden lg:block">{isBrowse && <SearchInput />}</div>

      <HeaderButtons />
    </header>
  );
}
