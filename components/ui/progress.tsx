"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const progressBackground = cva(
  "h-full w-full flex-1 bg-primary transition-all",
  {
    variants: {
      variant: {
        default: "bg-sky-700",
        success: "bg-emerald-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ProgressBackground = VariantProps<typeof progressBackground>;

interface Progress
  extends ProgressBackground,
    React.HTMLAttributes<HTMLDivElement>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Progress
>(({ className, value, variant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(progressBackground({ variant }))}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
