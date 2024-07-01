import { LoginForm, RegisterForm } from 'features/session/sign-in-and-up'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import './RegisterPage.scss'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onCompleteSignIn = useCallback(
    () => navigate(location.state?.returnUrl ?? PATH_PAGE.root),
    [navigate, location],
  )

  const onCompleteSignUp = useCallback(() => {
    navigate(PATH_PAGE.login)
  }, [navigate])

  const isSignIn = location.pathname === PATH_PAGE.login

  const className = 's-sign-in__form form form--bg'

  return (
    <section className='s-sign-in'>
      <h2 className='h2 text-center mb-50'>{isSignIn ? 'Sign in' : 'Sign up'}</h2>
      {isSignIn ? (
        <LoginForm onComplete={onCompleteSignIn} className={className} />
      ) : (
        <RegisterForm onComplete={onCompleteSignUp} className={className} />
      )}
    </section>
  )
}
