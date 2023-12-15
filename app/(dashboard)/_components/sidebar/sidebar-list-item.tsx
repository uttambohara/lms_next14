import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarListItemProps {
  icon: LucideIcon;
  element: string;
  path: string;
}

export default function SidebarListItem({
  icon: Icon,
  element,
  path,
}: SidebarListItemProps) {
  const pathname = usePathname();

  const isActive = path === pathname;

  return (
    <Link href={path}>
      <li
        className={cn(
          "flex h-10 items-center gap-2 px-5",
          isActive && "bg-purple-100",
        )}
      >
        <Icon className={cn(isActive && "text-purple-800")} />
        <span className={cn(isActive && "text-purple-800")}>{element}</span>
      </li>
    </Link>
  );
}
