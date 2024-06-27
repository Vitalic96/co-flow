import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { appRouter } from './app.router'
import { ToastContainer } from 'react-toastify'
import { appStore, persistedStore } from './app.store'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { setupWorker } from 'msw/browser'
import { handlers } from './mock/handlers'
import 'react-toastify/dist/ReactToastify.css'

const root = document.getElementById('root') as HTMLElement

export const worker = setupWorker(...handlers)

const start = async () => await worker.start()

start().then(() => {
  createRoot(root).render(
    <ReduxProvider store={appStore}>
      {/* <ModalProvider> */}
      <PersistGate loading={null} persistor={persistedStore}>
        <RouterProvider router={appRouter()} />
        <ToastContainer />
      </PersistGate>
      {/* </ModalProvider> */}
    </ReduxProvider>,
  )
})
