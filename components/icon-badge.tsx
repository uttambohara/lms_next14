import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

const backgroundVariant = cva("flex items-center justify-center rounded-full", {
  variants: {
    variant: {
      default: "bg-gray-100",
      success: "bg-sky-100",
    },
    size: {
      default: "p-3",
      sm: "p-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const iconVariant = cva("", {
  variants: {
    variant: {
      default: "text-purple-600",
      success: "text-sky-800",
    },
    size: {
      default: "h-6 w-6",
      sm: "h-3 w-3",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

type BackgroundVariant = VariantProps<typeof backgroundVariant>;
type IconVariant = VariantProps<typeof iconVariant>;

interface IconBadgeProps extends BackgroundVariant, IconVariant {
  icon: LucideIcon;
}

export function IconBadge({ variant, size, icon: Icon }: IconBadgeProps) {
  return (
    <div className={cn(backgroundVariant({ variant, size }))}>
      <Icon className={cn(iconVariant({ variant, size }))} />
    </div>
  );
}
