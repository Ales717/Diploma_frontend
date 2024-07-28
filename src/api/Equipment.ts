import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { EquipmentType } from 'models/equipment'
import { CreateUpdateEquipmentFields } from 'hooks/react-hook-form/useCreateUpdateEquipmentForm'

export const fetchEquipment = async () =>
    apiRequest<undefined, EquipmentType[]>('get', apiRoutes.EQUIPMENT_PREFIX)

export const fetchEquipmentById = async (equipmentId: string) =>
    apiRequest<undefined, EquipmentType>('get', `${apiRoutes.EQUIPMENT_PREFIX}/${equipmentId}`)

export const createEquipment = async (data: CreateUpdateEquipmentFields) =>
    apiRequest<CreateUpdateEquipmentFields, EquipmentType>('post', apiRoutes.EQUIPMENT_PREFIX, data)

export const updateEquipment = async (equipmentId: string, data: CreateUpdateEquipmentFields) =>
    apiRequest<CreateUpdateEquipmentFields, EquipmentType>('put', `${apiRoutes.EQUIPMENT_PREFIX}/${equipmentId}`, data)

export const deleteEquipment = async (equipmentId: string) =>
    apiRequest<undefined, void>('delete', `${apiRoutes.EQUIPMENT_PREFIX}/${equipmentId}`)

export const fetchAvailableEquipment = async () =>
    apiRequest<undefined, EquipmentType[]>('get', `${apiRoutes.EQUIPMENT_PREFIX}/available`)

export const toggleEquipmentAvailability = async (equipmentId: string) =>
    apiRequest<undefined, EquipmentType>('patch', `${apiRoutes.EQUIPMENT_PREFIX}/${equipmentId}/toggle-availability`)
