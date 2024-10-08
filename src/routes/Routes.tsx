import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

type AppRoute = RouteProps & {
  type?: RouteType
}

/* Public routes */
const Home = lazy(() => import('pages/Home'))

/* Private routes */

const Orders = lazy(() => import('pages/orders/index'))
const OrderDetail = lazy(() => import('pages/orders/OrderDetail'))
const CreateOrder = lazy(() => import('pages/orders/createOrder'))

const Workers = lazy(() => import('pages/workers/index'))
const AddWorkers = lazy(() => import('pages/workers/addWorker'))
const UpdateWorkers = lazy(() => import('pages/workers/updateWorker'))
const WorkerControlPanel = lazy(() => import('pages/workers/controlePanel'))

const Equipment = lazy(() => import('pages/equipment/index'))
const AddEquipment = lazy(() => import('pages/equipment/addEquipment'))
const UpdateEquipment = lazy(() => import('pages/equipment/updateEquipment'))

const Service = lazy(() => import('pages/services/index'))
const AddService = lazy(() => import('pages/services/addService'))
const UpdateService = lazy(() => import('pages/services/updateService'))
/* Restricted routes */
const Login = lazy(() => import('pages/Login'))
const Register = lazy(() => import('pages/Register'))

/* Error routes */
const Page404 = lazy(() => import('pages/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: '/login',
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: '/signup',
    children: <Register />,
  },

  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: '/orders',
    children: <Orders />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/orders/orderdetail/:id',
    children: <OrderDetail />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/orders/createorder',
    children: <CreateOrder />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/workers',
    children: <Workers />,
  },
  {
    type: RouteType.PRIVATE,
    path: 'workers/addworker',
    children: <AddWorkers />,
  },
  {
    type: RouteType.PRIVATE,
    path: 'workers/updateworker/:id',
    children: <UpdateWorkers />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/workers/controlpanel',
    children: <WorkerControlPanel />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/equipment',
    children: <Equipment />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/equipment/addequipment',
    children: <AddEquipment />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/equipment/updateequipment/:id',
    children: <UpdateEquipment />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/service',
    children: <Service />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/service/addservice',
    children: <AddService />,
  },
  {
    type: RouteType.PRIVATE,
    path: '/service/updateservice/:id',
    children: <UpdateService />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<PrivateRoute>{r.children}</PrivateRoute>}
              />
            )
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route
                key={`${r.path}`}
                path={`${r.path}`}
                element={<RestrictedRoute>{r.children}</RestrictedRoute>}
              />
            )
          }

          return (
            <Route key={`${r.path}`} path={`${r.path}`} element={r.children} />
          )
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default Routes
