import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import Chat from './chat.svg?react'
import Settings from './settings.svg?react'
import Notification from './notification.svg?react'
import User from './photo.png'
import { useAppSelector } from 'shared/model'
import { userApi } from 'entities/user'
import { PATH_PAGE } from 'shared/lib'
import './Header.scss'
import { useDispatch } from 'react-redux'
import { selectTheme, toggleTheme } from 'entities/theme'

export const HeaderTitle = () => {
  const location = useLocation()
  const { productId = '' } = useParams()
  const navigate = useNavigate()

  switch (location.pathname) {
    case PATH_PAGE.products.root:
      return <div className='header__title'>Products</div>
    case PATH_PAGE.products.createProduct:
      return (
        <div
          className='header__title text-link'
          onClick={(e) => {
            e.preventDefault()
            navigate(-1)
          }}
        >
          Add digital product
        </div>
      )
    case PATH_PAGE.products.product(productId):
      return <div className='header__title'>Product card</div>
    case PATH_PAGE.root:
    default:
      return <div className='header__title'>Home</div>
  }
}

export const Header = () => {
  const { data: currentUser, isSuccess } = useAppSelector(userApi.endpoints.currentUser.select())
  const dispatch = useDispatch()

  const changeTheme = () => {
    dispatch(toggleTheme())
  }

  return (
    <header className='header'>
      <div className='container-fluid'>
        <div className='header__inner'>
          <HeaderTitle />

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
              <div className='profile__name'>{isSuccess ? currentUser.email : ''}</div>
              <div className='profile__status'>Active</div>
            </div>
          </div>
          <label className='input-radio' style={{ marginLeft: '10px' }} onChange={changeTheme}>
            <input className='input-radio__input' type='checkbox' />
            <i className='input-radio__check'></i>
          </label>
        </div>
      </div>
    </header>
  )
}
