import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-foreground text-background rounded-full hover:bg-foreground/90 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] font-medium",
        destructive:
          "bg-foreground/10 text-foreground border border-foreground/20 rounded-full hover:bg-foreground/20 hover:border-foreground/30",
        outline:
          "border border-foreground/20 bg-transparent rounded-full hover:bg-foreground/5 hover:border-foreground/30 backdrop-blur-sm",
        secondary:
          "bg-foreground/5 text-foreground rounded-full hover:bg-foreground/10 border border-foreground/10",
        ghost: "rounded-full hover:bg-foreground/5 hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline rounded-full",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
