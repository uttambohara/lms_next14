"use client";

import SearchInput from "@/components/search-input";
import SidebarSheet from "@/components/sidebar-sheet";
import { usePathname } from "next/navigation";
import HeaderButtons from "./header-buttons";

export default function Header() {
  const pathname = usePathname();

  const isBrowse = pathname.includes("/browse");

  return (
    <header className="border-b border-gray-200 flex items-center px-12">
      <div className="lg:hidden">
        <SidebarSheet />
      </div>

      <div className="hidden lg:block">{isBrowse && <SearchInput />}</div>

      <HeaderButtons />
    </header>
  );
}
