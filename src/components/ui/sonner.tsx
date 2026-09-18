'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      position="bottom-right"
      expand={true}
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': '#ffffff',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          // flex-wrap lets the action button drop to its own full-width line
          // on narrow screens instead of squeezing the text into a tall,
          // heavily-wrapped column beside a fixed-width button.
          toast: 'group flex flex-wrap items-start gap-x-3 gap-y-2 !bg-[#121212] !text-white !border !border-white/10 !shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] !rounded-[24px] !p-4 sm:!p-5',
          content: '!min-w-[180px] !flex-1',
          title: '!font-bold !text-sm !tracking-wide',
          description: '!text-white/80 !font-medium !text-xs !mt-1',
          icon: '!w-5 !h-5 !text-white',
          success: '!bg-green-600 !border-green-500/50',
          error: '!bg-red-600 !border-red-500/50',
          warning: '!bg-amber-500 !border-amber-400/50',
          info: '!bg-[#7a4a34] !border-[#a5a58d]/50',
          actionButton: '!w-full sm:!w-auto !justify-center !bg-white !text-black !font-bold !rounded-full !px-5 !py-2 hover:!scale-105 !transition-transform !border-0',
          cancelButton: '!w-full sm:!w-auto !justify-center !bg-white/20 !text-white !font-bold !rounded-full !px-5 !py-2 hover:!bg-white/30 !border-0',
          closeButton: '!bg-white/20 !text-white hover:!bg-white/30 !border-0 !rounded-full',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
