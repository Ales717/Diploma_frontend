import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { AllocationType } from 'models/allocation'

export const fetchAllocationByUserId = async (userId: string) =>
    apiRequest<undefined, AllocationType>('get', `${apiRoutes.ALLOCATION_PREFIX}/user/${userId}`)