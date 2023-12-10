import Logo from "@/app/(dashboard)/_components/logo";
import SidebarList from "@/app/(dashboard)/_components/sidebar/sidebar-list";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="w-[15rem] px-0">
        <SheetHeader>
          <SheetTitle className="mb-8">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <SidebarList />
      </SheetContent>
    </Sheet>
  );
}
