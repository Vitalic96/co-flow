import { selectIsAuth } from 'entities/session'
import { useCurrentUserQuery } from 'entities/user'
import { useAppSelector } from 'shared/model'
import { Layout } from 'shared/ui'
import { Footer, Header, Sidebar } from 'widgets'

export const BaseLayout = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const currentUserState = useCurrentUserQuery(undefined)

  // if (currentUserState.isLoading) return <Preloader />

  return <Layout headerSlot={<Header />} sidebarSlot={<Sidebar />} />
}
