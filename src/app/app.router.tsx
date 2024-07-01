import { ErrorPage, MainPage, NotFoundPage, SignInPage, ProductPage, CreateProductPage } from 'pages'
import { Navigate, createBrowserRouter } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { BaseLayout } from './layouts/base.layout'
import { GuestGuard } from './guards/GuestGuard'
import { AuthGuard } from './guards/AuthGuard'
import { FormLayout } from './layouts/form.loyout'
import { ProductListPage } from 'pages/product-list-page/ProductListPage'
import { UpdateProductPage } from 'pages/product-editor-page/CreateProductPage'

export const appRouter = () => {
  return createBrowserRouter([
    {
      element: (
        <GuestGuard>
          <BaseLayout />
        </GuestGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_PAGE.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.products.root,
          element: <ProductListPage />,
        },
        {
          path: PATH_PAGE.products.product(':productId'),
          element: <ProductPage />,
        },
        {
          path: PATH_PAGE.products.createProduct,
          element: <CreateProductPage />,
        },
        {
          path: PATH_PAGE.products.updateProduct(':productId'),
          element: <UpdateProductPage />,
        },
        { path: PATH_PAGE[404], element: <NotFoundPage /> },
        { path: PATH_PAGE.error, element: <ErrorPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE[404]} replace /> },
      ],
    },
    {
      element: (
        <AuthGuard>
          <FormLayout />
        </AuthGuard>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH_PAGE.login,
          element: <SignInPage />,
        },
        {
          path: PATH_PAGE.register,
          element: <SignInPage />,
        },
        { path: PATH_PAGE[404], element: <NotFoundPage /> },
        { path: PATH_PAGE.error, element: <ErrorPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE[404]} replace /> },
      ],
    },
  ])
}
