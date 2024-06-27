import { selectIsAuth } from 'entities/session'
import { notifySuccess } from 'shared/lib/notify'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { useCallback } from 'react'
import { ButtonForm, Form, InputForm, SectionTitle } from 'shared/ui'
import classNames from 'classnames'
import { SignUpFormSchema, signUpFormSchema } from '../model/sign-up-form.schema'
import { signUpThunk } from '../model/sign-up.thunk'

type Props = {
  onComplete?: () => void
  onToSignIn?: () => void
  className?: string
}

export const SignUpForm = (props: Props) => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const onSubmitHandler = useCallback(
    async (data: SignUpFormSchema) => {
      await dispatch(signUpThunk(data)).unwrap()
      props.onComplete && props.onComplete()
      notifySuccess('You have successfully registered')
    },
    [dispatch, props],
  )

  return (
    <>
      {isAuth ? (
        <div className='item-bg'>
          <div className='item-bg__bg'></div>
          <SectionTitle subtitle='You are authorized'></SectionTitle>
        </div>
      ) : (
        <Form<SignUpFormSchema>
          onSubmit={onSubmitHandler}
          validationSchema={signUpFormSchema}
          defaultValues={{ email: 'login1@gmail.com', password: '12345678', passwordConfirm: '12345678' }}
          className={classNames('', props.className)}
        >
          <InputForm<SignUpFormSchema> type='text' name='email' label='Email' placeholder='Enter your email' />
          <InputForm<SignUpFormSchema>
            type='password'
            name='password'
            label='Create Password'
            placeholder='Create password'
          />
          <InputForm<SignUpFormSchema>
            type='password'
            name='passwordConfirm'
            label='Confirm Password'
            placeholder='Confirm password'
          />
          <ButtonForm width300>Sign up</ButtonForm>
          <div className='form__link'>
            Already have an account?
            <a onClick={props.onToSignIn} className='text-link text-primary'>
              Log In
            </a>
          </div>
        </Form>
      )}
    </>
  )
}
