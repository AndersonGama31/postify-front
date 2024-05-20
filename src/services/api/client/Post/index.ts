/* eslint-disable prettier/prettier */

import apiClient from '../api-client'

const route = '/posts'

interface ICreatePostPayload {
    title: string
    content: string
    banner: string
}

interface ICreatePostResponse {
    createdAt: string
    content: string
    title: string
    id: string
    published: boolean
    authorId: string
}

const CreatePost = (payload: ICreatePostPayload): Promise<ICreatePostResponse> => apiClient.api.post(route, payload)

export { CreatePost }
