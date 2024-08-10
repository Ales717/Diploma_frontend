import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { TaskType } from 'models/task'

export const fetchTaskByOrderId = async (orderId: string) =>
    apiRequest<undefined, TaskType[]>('get', `${apiRoutes.TASK_PREFIX}/order/${orderId}`)

export const fetchTaskById = async (id: string) =>
    apiRequest<undefined, TaskType[]>('get', `${apiRoutes.TASK_PREFIX}/${id}`)


export const toggleOrderStatus = async (orderId: string) =>
    apiRequest<undefined, void>('patch', `${apiRoutes.ORDER_PREFIX}/${orderId}/toggle-status`)

export const markTaskAsDone = async (taskId: string) =>
    apiRequest<undefined, void>('patch', `${apiRoutes.TASK_PREFIX}/${taskId}/mark-done`)