import { type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from './logo.png'
import { PATH_PAGE } from 'shared/lib'
import { Button } from 'shared/ui'
import { Arrow, Home, Logout, Product } from 'shared/ui/icon'
import { LogoutButton } from 'features/session/logout'
import './Sidebar.scss'

const menuList = [
  { to: PATH_PAGE.root, icon: Home, text: 'Home' },
  { to: PATH_PAGE.products.root, icon: Product, text: 'Products' },
]

export const Sidebar = () => {
  return (
    <aside className='sidebar'>
      <div className='sidebar__main'>
        <div className='sidebar__logo'>
          <Link to={PATH_PAGE.root}>
            <img src={logo} alt='' />
          </Link>
        </div>
        <div className='sidebar__invite'>
          <Button maxWidth>
            Invite a teammate
            <Arrow style={{ marginLeft: 'auto' }} />
          </Button>
        </div>
        <nav className='menu sidebar__menu'>
          <ul className='menu__ul'>
            {menuList.map((el, i) => {
              const Icon = el.icon
              return (
                <li key={i} className='menu__item'>
                  <NavLink
                    to={el.to}
                    className={({ isActive, isPending }) =>
                      'menu__link ' + (isPending ? '' : isActive ? 'menu__link--active' : '')
                    }
                    end
                  >
                    <Icon className='menu__link-icon' />
                    {el.text}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
      <div className='sidebar__logout'>
        <LogoutButton />
      </div>
    </aside>
  )
}
