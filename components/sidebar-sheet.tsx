import Logo from "@/app/(dashboard)/_components/logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function SidebarSheet({
  children,
}: {
  children: React.ReactNode;
}) {
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

        {children}
      </SheetContent>
    </Sheet>
  );
}
