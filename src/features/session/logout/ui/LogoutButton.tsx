import { useAppDispatch } from 'shared/model'
import { logoutThunk } from '../model/logout.thunk'
import { notifySuccess } from 'shared/lib'
import { IoLogOutOutline } from 'react-icons/io5'
import './LogoutButton.scss'

export function LogoutButton() {
  const dispatch = useAppDispatch()

  const onConfirmLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap()
    } finally {
      notifySuccess('You have successfully logged out')
    }
  }

  return (
    <div className='logout-button'>
      <a onClick={onConfirmLogout} className='logout-button__link'>
        <IoLogOutOutline className='logout-button__icon' />
        Log Out
      </a>
    </div>
  )
}
