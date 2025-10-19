import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[100px] w-full rounded-md border border-border bg-card px-4 py-3 text-sm font-light tracking-wide transition-all duration-200 placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-foreground/40 focus-visible:bg-card/80 disabled:cursor-not-allowed disabled:opacity-40 resize-none hover:border-border/60",
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
