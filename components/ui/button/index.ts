import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-[17px] font-normal tracking-[-0.374px] transition-transform duration-150 ease-out active:scale-[0.95] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--dk-primary-focus)] focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--dk-primary)] text-[var(--dk-on-primary)] rounded-[var(--dk-radius-pill)] hover:bg-[var(--dk-primary)]',
        destructive:
          'bg-destructive text-destructive-foreground rounded-[var(--dk-radius-pill)]',
        outline:
          'border border-[var(--dk-primary)] bg-transparent text-[var(--dk-primary)] rounded-[var(--dk-radius-pill)]',
        secondary:
          'bg-[var(--dk-surface-pearl)] text-[var(--dk-ink-muted-80)] border-[3px] border-[var(--dk-divider-soft)] rounded-[var(--dk-radius-md)]',
        ghost: 'rounded-[var(--dk-radius-sm)] hover:bg-[var(--dk-canvas-parchment)]',
        link: 'text-[var(--dk-primary)] underline-offset-4 hover:underline rounded-none',
      },
      size: {
        default: 'px-[22px] py-[11px]',
        xs: 'px-3 py-1.5 text-[14px]',
        sm: 'px-4 py-2 text-[14px]',
        lg: 'px-7 py-[14px] text-[18px] font-light',
        icon: 'size-11 rounded-full p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
