/* eslint-disable prettier/prettier */

import apiClient from '../api-client'

const route = '/signIn'

interface IAuthPayload {
    email: string
    password: string
}

interface IUser {
    id: string
    name: string
    email: string
    access_token: string
}

const Authenticate = (payload: IAuthPayload): Promise<IUser> => apiClient.api.post(route, payload)

export { Authenticate }
