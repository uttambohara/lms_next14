import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const bannerBackground = cva(
  "flex items-center gap-3 py-4 px-12 shadow-sm italic",
  {
    variants: {
      variant: {
        default: "bg-yellow-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type BannerBackground = VariantProps<typeof bannerBackground>;

interface BannerProps extends BannerBackground {
  label: string;
  icon: LucideIcon;
}

export function Banner({ label, icon: Icon, variant }: BannerProps) {
  return (
    <div className={cn(bannerBackground({ variant }))}>
      <span>
        <Icon />
      </span>
      <span>{label}</span>
    </div>
  );
}
