import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { UserType } from 'models/auth'
import { CreateUpdateUserFields } from 'hooks/react-hook-form/useCreateUpdateUserForm'


export const findAllWorkers = async (role: string) =>
    apiRequest<undefined, UserType[]>('get', `${apiRoutes.USERS_PREFIX}/role/${role}`)

export const fetchActiveWorkers = async () =>
    apiRequest<undefined, UserType[]>('get', `${apiRoutes.USERS_PREFIX}/active`)

export const createWorker = async (data: CreateUpdateUserFields) =>
    apiRequest<CreateUpdateUserFields, UserType>('post', apiRoutes.USERS_PREFIX, data)

export const fetchWorkerById = async (workerId: string) =>
    apiRequest<undefined, UserType>('get', `${apiRoutes.USERS_PREFIX}/${workerId}`)

export const updateWorker = async (workerId: string, data: CreateUpdateUserFields) =>
    apiRequest<CreateUpdateUserFields, UserType>('put', `${apiRoutes.USERS_PREFIX}/${workerId}`, data)

export const deleteWorker = async (workerId: string) =>
    apiRequest<undefined, void>('delete', `${apiRoutes.USERS_PREFIX}/${workerId}`)
