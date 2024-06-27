import { selectIsAuth } from 'entities/session'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { useAppSelector } from 'shared/model'

export type Props = {
  children: ReactElement
}

export const AuthGuard = ({ children }: Props): ReactElement => {
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuth) return <Navigate to={PATH_PAGE.root} replace />

  return children
}
