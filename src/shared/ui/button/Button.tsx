import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface ButtonHTML extends ButtonHTMLAttributes<HTMLButtonElement> {}
interface AnchorHTML extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
}

type ButtonColor = 'primary' | 'secondary' | 'dangerous' | 'success'

export type ButtonProps = {
  children?: ReactNode
  color?: ButtonColor
  border?: boolean
  maxWidth?: boolean
  width300?: boolean
  backgroundDark?: boolean
  withoutColor?: boolean
  link?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
} & (AnchorHTML | ButtonHTML)

export const Button = (props: ButtonProps) => {
  const {
    children,
    color = 'primary',
    border,
    maxWidth,
    width300,
    link,
    backgroundDark,
    withoutColor,
    loading,
    disabled,
    className,
    ...rest
  } = props

  const fullClassName = classNames(
    `btn btn--${color}`,
    {
      'btn--max': maxWidth,
      'btn--w-300': width300,
      'btn--dark-background': backgroundDark,
      'btn--without-color': withoutColor,
      'btn--border': border,
      'btn--link': link,
      'btn--loading': loading,
      'btn--disabled': disabled || loading,
    },
    className,
  )

  return (
    <>
      {'to' in rest ? (
        <Link {...rest} to={rest.to} className={fullClassName}>
          {children}
        </Link>
      ) : (
        <button className={fullClassName} {...rest} disabled={disabled || loading}>
          {children}
          {loading && (
            <span className='btn__loader'>
              <i></i>
              <i></i>
              <i></i>
            </span>
          )}
        </button>
      )}
    </>
  )
}
