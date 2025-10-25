import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface QuickActionButtonProps {
  icon: LucideIcon
  label: string
  onClick: () => void
  variant?: "default" | "outline" | "ghost"
  color?: string
  disabled?: boolean
}

export function QuickActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = "outline",
  color = "text-primary",
  disabled = false
}: QuickActionButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant={variant}
        onClick={onClick}
        disabled={disabled}
        className="h-24 flex flex-col items-center justify-center space-y-2 w-full bg-foreground/5 hover:bg-foreground/10 border-foreground/10 hover:border-primary/30 transition-all duration-300"
      >
        <Icon className={`h-6 w-6 ${color}`} />
        <span className="text-sm font-medium text-foreground">{label}</span>
      </Button>
    </motion.div>
  )
}
