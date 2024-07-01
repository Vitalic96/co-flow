import { notifySuccess } from 'shared/lib/notify'
import { useCallback } from 'react'
import { ButtonForm, Form, InputForm } from 'shared/ui'
import classNames from 'classnames'
import { LoginFormSchema, loginFormSchema } from '../model/login-form.schema'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { useLoginMutation } from 'entities/session/api/session.api'

type Props = {
  onComplete?: () => void
  className?: string
}

export function LoginForm(props: Props) {
  const [loginThunk] = useLoginMutation()

  const onSubmitHandler = useCallback(
    async (data: LoginFormSchema) => {
      await loginThunk(data).unwrap()
      props.onComplete && props.onComplete()
      notifySuccess('You have successfully logged in')
    },
    [props, loginThunk],
  )

  return (
    <>
      <Form<LoginFormSchema>
        onSubmit={onSubmitHandler}
        validationSchema={loginFormSchema}
        defaultValues={{ email: 'login@gmail.com', password: '12345678' }}
        className={classNames(props.className)}
      >
        <InputForm<LoginFormSchema> type='text' name='email' label='Email' placeholder='Email' />
        <InputForm<LoginFormSchema> type='password' name='password' label='Password' placeholder='Password' />
        <ButtonForm width300>Sign in</ButtonForm>
        <div className='form__link'>
          Don’t have an account? &nbsp;
          <Link to={PATH_PAGE.register} className='text-link text-primary'>
            Sign Up
          </Link>
        </div>
      </Form>
    </>
  )
}
