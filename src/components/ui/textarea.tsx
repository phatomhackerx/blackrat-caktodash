import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-2xl border border-foreground/20 bg-background/50 backdrop-blur-sm px-6 py-4 text-sm font-light tracking-wide transition-all duration-300 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-foreground/40 focus-visible:bg-background/80 focus-visible:ring-2 focus-visible:ring-foreground/10 disabled:cursor-not-allowed disabled:opacity-40 resize-none hover:border-foreground/30",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
