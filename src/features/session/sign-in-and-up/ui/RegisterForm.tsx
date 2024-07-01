import { notifySuccess } from 'shared/lib/notify'
import { useCallback } from 'react'
import { ButtonForm, Form, InputForm } from 'shared/ui'
import classNames from 'classnames'
import { RegisterFormSchema, registerFormSchema } from '../model/register-form.schema'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { useRegisterMutation } from 'entities/session/api/session.api'

type Props = {
  onComplete?: () => void
  className?: string
}

export const RegisterForm = (props: Props) => {
  const [register] = useRegisterMutation()

  const onSubmitHandler = useCallback(
    async (data: RegisterFormSchema) => {
      await register(data).unwrap()
      props.onComplete && props.onComplete()
      notifySuccess('You have successfully registered')
    },
    [props, register],
  )

  return (
    <>
      <Form<RegisterFormSchema>
        onSubmit={onSubmitHandler}
        validationSchema={registerFormSchema}
        // defaultValues={{ email: 'login@gmail.com', password: '12345678', passwordConfirm: '12345678' }}
        className={classNames('', props.className)}
      >
        <InputForm<RegisterFormSchema> type='text' name='email' label='Email' placeholder='Enter your email' />
        <InputForm<RegisterFormSchema>
          type='password'
          name='password'
          label='Create Password'
          placeholder='Create password'
        />
        <InputForm<RegisterFormSchema>
          type='password'
          name='passwordConfirm'
          label='Confirm Password'
          placeholder='Confirm password'
        />
        <ButtonForm width300>Sign up</ButtonForm>
        <div className='form__link'>
          Already have an account? &nbsp;
          <Link to={PATH_PAGE.login} className='text-link text-primary'>
            Log In
          </Link>
        </div>
      </Form>
    </>
  )
}
