import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium tracking-wide transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-foreground/20 bg-foreground/5 text-foreground hover:bg-foreground/10 backdrop-blur-sm",
        secondary:
          "border-foreground/15 bg-foreground/5 text-foreground hover:bg-foreground/10",
        destructive:
          "border-foreground/20 bg-foreground/10 text-foreground hover:bg-foreground/20",
        outline: "border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 backdrop-blur-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
