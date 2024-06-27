import { Link } from 'react-router-dom'
import './Header.scss'
import Chat from './chat.svg?react'
import Settings from './settings.svg?react'
import Notification from './notification.svg?react'
import User from './photo.png'
import { useAppSelector } from 'shared/model'
import { userApi } from 'entities/user'

export const Header = () => {
  const { data: currentUser, isSuccess } = useAppSelector(userApi.endpoints.currentUser.select())

  if (!isSuccess) return <div>profileData error</div>

  return (
    <header className='header'>
      <div className='container-fluid'>
        <div className='header__inner'>
          <div className='header__title'>Home</div>
          <ul className='header-icons header__icons'>
            <li className='header-icons__item'>
              <Link to={'/'} className='header-icons__link'>
                <Chat />
              </Link>
            </li>
            <li className='header-icons__item'>
              <Link to={'/'} className='header-icons__link'>
                <Settings />
              </Link>
            </li>
            <li className='header-icons__item'>
              <Link to={'/'} className='header-icons__link'>
                <Notification />
              </Link>
              <div className='header-icons__number'>9</div>
            </li>
          </ul>
          <div className='header__profile profile'>
            <div className='profile__image'>
              <img src={User} alt='' />
              <div className='profile__image--status'></div>
            </div>
            <div className='profile__text'>
              <div className='profile__name'>{currentUser.email}</div>
              <div className='profile__status'>Active</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
