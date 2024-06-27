import { ComponentProps, ReactNode } from 'react'
import classNames from 'classnames'
import './SectionTitle.scss'

interface Props extends ComponentProps<'h2'> {
  children?: ReactNode
  subtitle?: string
  className?: string
  white?: boolean
  center?: boolean
}

export const SectionTitle = (props: Props) => {
  const { children, subtitle, className, white, center, ...rest } = props
  return (
    <>
      {children && (
        <h2
          className={classNames(
            'h3 section-title',
            { 'section-title--center': center, 'text-white': white },
            className,
          )}
          {...rest}
        >
          {children}
        </h2>
      )}
      {subtitle && (
        <h3 className={classNames('h3 section-subtitle', { 'section-subtitle--center': center, 'text-white': white })}>
          {subtitle}
        </h3>
      )}
    </>
  )
}
