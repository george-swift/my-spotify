import { forwardRef } from 'react'
import { cva } from 'cva'

import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[30px] font-bold uppercase transition-colors focus:outline-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'border border-white bg-transparent tracking-[1px] text-white hover:bg-white hover:text-black-100',
        success: 'bg-green-200 tracking-[2px] hover:bg-green-100',
        transparent:
          'bg-transparent font-semibold capitalize text-gray-200 hover:text-white'
      },
      size: {
        sm: 'p-2.5',
        default: 'px-[30px] py-3',
        xl: 'px-[35px] py-[17px]'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export const Button = forwardRef(
  (
    { className, variant, size, text, children, type = 'button', ...props },
    ref
  ) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      type={type}
      {...props}
    >
      {text && text}
      {children}
    </button>
  )
)

Button.displayName = 'Button'
