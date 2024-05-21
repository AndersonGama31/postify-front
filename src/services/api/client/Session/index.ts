/* eslint-disable prettier/prettier */

import apiClient from '../api-client'
import { IAuthPayload, IUser, ISignUpPayload, ISignUpResponse } from './interface'

const route = 'auth/'

const Authenticate = (payload: IAuthPayload): Promise<IUser> => apiClient.api.post(route + 'signIn', payload)
const SignUp = (payload: ISignUpPayload): Promise<ISignUpResponse> => apiClient.api.post(route + 'signUp', payload)

export { Authenticate, SignUp }
