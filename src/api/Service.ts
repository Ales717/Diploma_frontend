import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'

import { CreateUpdateServiceFields } from 'hooks/react-hook-form/useCreateUpdateServiceForm'
import { ServiceType } from 'models/service'

export const fetchServices = async () => {
    const response = await apiRequest<undefined, ServiceType[]>('get', apiRoutes.SERVICES_PREFIX)
    return response.data || []
}

export const fetchServiceById = async (serviceId: string) =>
    apiRequest<undefined, ServiceType>('get', `${apiRoutes.SERVICES_PREFIX}/${serviceId}`)

export const createService = async (data: CreateUpdateServiceFields) =>
    apiRequest<CreateUpdateServiceFields, ServiceType>('post', apiRoutes.SERVICES_PREFIX, data)

// Update an existing service
export const updateService = async (serviceId: string, data: CreateUpdateServiceFields) =>
    apiRequest<CreateUpdateServiceFields, ServiceType>('put', `${apiRoutes.SERVICES_PREFIX}/${serviceId}`, data)

// Delete a service
export const deleteService = async (serviceId: string) =>
    apiRequest<undefined, void>('delete', `${apiRoutes.SERVICES_PREFIX}/${serviceId}`)
