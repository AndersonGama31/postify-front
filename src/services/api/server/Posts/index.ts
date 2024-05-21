/* eslint-disable prettier/prettier */
'use server'

import apiServer from '../api-server'

const route = '/posts'

export interface IPostResponse {
    createdAt: string
    content: string
    title: string
    id: string
    published: boolean
    authorId: string
    banner: string
    job: string
    avatar: string
    name: string
}

const List = (): Promise<IPostResponse[]> => apiServer.api.get(route)

export { List }
