import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
        outline:
          "border border-input bg-background hover:bg-primary-light hover:text-primary-light-foreground hover:border-primary/30",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: 
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm",
        success:
          "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
        ghost: "hover:bg-primary-light hover:text-primary-light-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "secondary-outline": 
          "border border-input bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground",
        "primary-subtle": 
          "bg-primary-light text-primary-light-foreground hover:bg-primary-light/80",
        "whatsapp": 
          "bg-success text-success-foreground hover:bg-success/90 shadow-sm",
        "whatsapp-outline": 
          "border border-success/30 bg-success-light text-success-light-foreground hover:bg-success hover:text-success-foreground",
        "badge": 
          "bg-primary-light/50 text-primary border border-primary/20 hover:bg-primary-light",
        "badge-success": 
          "bg-success-light text-success-light-foreground border border-success/20 hover:bg-success-light/80",
        "badge-warning": 
          "bg-warning-light text-warning-light-foreground border border-warning/20 hover:bg-warning-light/80",
      },
      size: {
        default: "h-11 px-4 py-2.5",
        sm: "h-10 rounded-md px-3",
        lg: "h-12 rounded-md px-8 text-base",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9 [&_svg]:size-4",
        badge: "h-7 px-2 py-1 text-xs rounded-full",
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
