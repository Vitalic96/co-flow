import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './app.router'
import { ToastContainer } from 'react-toastify'
import { appStore, persistedStore } from './app.store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { worker } from './mock/browser'
import { Provider as ModalProvider } from '@ebay/nice-modal-react'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root') as HTMLElement

const start = async () => await worker.start({ onUnhandledRequest: 'bypass', quiet: true })

start().then(async () => {
  createRoot(root).render(
    <ReduxProvider store={appStore}>
      <ModalProvider>
        <PersistGate loading={null} persistor={persistedStore}>
          <RouterProvider router={appRouter()} />
          <ToastContainer position='bottom-right' />
        </PersistGate>
      </ModalProvider>
    </ReduxProvider>,
  )
})
