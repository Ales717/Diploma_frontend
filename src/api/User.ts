import { apiRoutes } from 'constants/apiConstants'
import { apiRequest } from './Api'
import { UserType } from 'models/auth'
import { LoginUserFields } from 'hooks/react-hook-form/useLogin'
import { RegisterUserFields } from 'hooks/react-hook-form/useRegister'

export const signout = async () =>
  apiRequest<undefined, void>('post', apiRoutes.SIGNOUT)

export const login = async (data: LoginUserFields) =>
  apiRequest<LoginUserFields, UserType>('post', apiRoutes.LOGIN, data)

export const createUser = async (data: RegisterUserFields) =>
  apiRequest<RegisterUserFields, void>('post', apiRoutes.USERS_PREFIX, data)

export const currentUser = async () =>
  apiRequest<undefined, UserType>('get', `${apiRoutes.FETCH_USER}`)