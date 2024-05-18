import apiServer from '../api/server/api-server'

const route = '/posts'

interface IPostResponse {
    createdAt: string
    content: string
    title: string
    id: string
    published: boolean
    authorId: string
}

const List = (): Promise<IPostResponse[]> => apiServer.api.get(route)

export { List }
