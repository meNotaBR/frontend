"use client"

import { forwardRef } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"

type Props = {
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
  title: string
  description: string
  actionTitle: string
  onClick: () => void
  className?: string
}

const SonnerToast = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  return (
    <Button
      type="submit"
      ref={ref}
      variant={props.variant}
      className={props.className}
      onClick={() =>
        toast(props.title, {
          description: props.description,
          action: {
            label: props.actionTitle,
            onClick: props.onClick,
          },
          position: 'top-left'
        })
      }
    >
      Show Toast
    </Button>
  )
})

SonnerToast.displayName = "SonnerToast"

export default SonnerToast