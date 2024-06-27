import { selectIsAuth } from 'entities/session'
import { notifySuccess } from 'shared/lib/notify'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { useCallback } from 'react'
import { Button, ButtonForm, Form, InputForm, SectionTitle } from 'shared/ui'
import classNames from 'classnames'
import { SignInFormSchema, signInFormSchema } from '../model/sign-in-form.schema'
import { signInThunk } from '../model/sign-in.thunk'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'

type Props = {
  onComplete?: () => void
  onToSignUp?: () => void
  className?: string
}

export function SignInForm(props: Props) {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const onSubmitHandler = useCallback(
    async (data: SignInFormSchema) => {
      await dispatch(signInThunk(data)).unwrap()
      props.onComplete && props.onComplete()
      notifySuccess('You have successfully logged in')
    },
    [dispatch, props],
  )

  return (
    <>
      {isAuth ? (
        <div className='item-bg-wrapper item-bg-wrapper--padding'>
          <div className='item-bg item-bg--full'></div>
          <SectionTitle subtitle='You are authorized'></SectionTitle>
        </div>
      ) : (
        <Form<SignInFormSchema>
          onSubmit={onSubmitHandler}
          validationSchema={signInFormSchema}
          // defaultValues={{ email: 'login@gmail.com', password: '12345678' }}
          className={classNames(props.className)}
        >
          <InputForm<SignInFormSchema> type='text' name='email' label='Email' placeholder='Email' />
          <InputForm<SignInFormSchema> type='password' name='password' label='Password' />
          <ButtonForm width300>Sign in</ButtonForm>
          <div className='form__link'>
            Don’t have an account?
            <Link to={PATH_PAGE.signUp} className='text-link text-primary'>
              Sign Up
            </Link>
          </div>
        </Form>
      )}
    </>
  )
}
