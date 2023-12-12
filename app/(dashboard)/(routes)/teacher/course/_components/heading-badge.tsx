import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

export default function HeadingBadge({
  icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <IconBadge icon={icon} />
      <h3 className="text-[1.3rem]">{children}</h3>
    </div>
  );
}
