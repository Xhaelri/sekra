import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap  text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground cursor-pointer dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        section:
          "bg-transparent text-primary shadow-xs hover:border-black hover:border-1 cursor-pointer tracking-widest uppercase",
        stock:
          "bg-transparent text-primary text-lg font-light shadow-xs cursor-pointer tracking-widest uppercase",
        color:
          "bg-transparent text-primary rounded-full text-sm font-light shadow-xs disabled:pointer-events-none disabled:line-through disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer tracking-widest uppercase",
          cartAdd:
          "bg-transparent text-primary text-sm font-normal shadow-xs border-1 border-primary disabled:pointer-events-none  disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer tracking-widest uppercase",
          cartBuyNow:
          "bg-primary text-secondary text-sm font-normal shadow-xs border-1 border-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none cursor-pointer tracking-widest uppercase",
          filter:
          "bg-transparent text-primary flex w-full font-light items-center justify-start whitespace-nowrap cursor-pointer border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        user: "h-10 px-6 w-40",
        hero: "h-10 px-6 w-24",
        stock: "h-10 px-4 w-18",
        color: "h-10 px-4 w-18",
        cartAdd: "h-12 px-4 w-full",
        cartBuyNow: "h-12 px-4 w-full",
        login: "h-12 px-4 w-full",
        filter: "h-9 w-44",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
