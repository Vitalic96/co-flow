import { Button } from 'shared/ui'
import { useAppDispatch } from 'shared/model'
import { logoutThunk } from '../model/logout.thunk'
import { Logout } from 'shared/ui/icon'

export function LogoutButton() {
  const dispatch = useAppDispatch()

  const onConfirmLogout = async () => {
    try {
      await dispatch(logoutThunk()).unwrap()
    } finally {
    }
  }

  return (
    <div className='logout-button'>
      <a onClick={onConfirmLogout} className='logout-button__link'>
        <Logout className='logout-button__icon' />
        Log Out
      </a>
    </div>
  )
}
