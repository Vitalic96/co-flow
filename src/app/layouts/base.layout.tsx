import { selectIsAuth } from 'entities/session'
import { selectTheme } from 'entities/theme'
import { useCurrentUserQuery } from 'entities/user'
import { useAppSelector } from 'shared/model'
import { Layout, Preloader } from 'shared/ui'
import { Footer, Header, Sidebar } from 'widgets'

export const BaseLayout = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const currentUserState = useCurrentUserQuery(undefined, { skip: !isAuth })
  const theme = useAppSelector(selectTheme)

  if (currentUserState.isLoading) return <Preloader />

  return <Layout headerSlot={<Header />} sidebarSlot={<Sidebar />} dark={theme === 'dark'} />
}
