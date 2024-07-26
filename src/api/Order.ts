import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { OrderType } from 'models/order'
import { CreateUpdateOrderFields } from 'hooks/react-hook-form/useCreateUpdateOrderForm'

export const fetchOrders = async () =>
    apiRequest<undefined, OrderType[]>('get', apiRoutes.ORDER_PREFIX)

export const fetchActiveOrders = async () =>
    apiRequest<undefined, OrderType[]>('get', `${apiRoutes.ORDER_PREFIX}/active`)

export const createOrder = async (data: CreateUpdateOrderFields) =>
    apiRequest<CreateUpdateOrderFields, OrderType>('post', apiRoutes.ORDER_PREFIX, data)

export const fetchOrderById = async (orderId: string) =>
    apiRequest<undefined, OrderType>('get', `${apiRoutes.ORDER_PREFIX}/${orderId}`)

export const updateOrder = async (orderId: string, data: CreateUpdateOrderFields) =>
    apiRequest<CreateUpdateOrderFields, OrderType>('put', `${apiRoutes.ORDER_PREFIX}/${orderId}`, data)

export const deleteOrder = async (orderId: string) =>
    apiRequest<undefined, void>('delete', `${apiRoutes.ORDER_PREFIX}/${orderId}`)
