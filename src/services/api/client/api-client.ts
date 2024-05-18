/* eslint-disable prettier/prettier */
import axios, { Axios, AxiosError } from 'axios'
import { parseCookies } from 'nookies'

class ApiClient {
    api: Axios
    token: string

    constructor() {
        const cookies = parseCookies()

        this.token = cookies['postify.token']

        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL,
            responseType: 'json',
            timeout: 10000,
            headers: {
                Authorization: this.token ? `Bearer ${this.token}` : '',
                'Content-Type': 'application/json'
            }
        })

        this.api.interceptors.response.use(
            response => response.data,
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )
    }

    setTokenInHeader(token: string) {
        this.token = token
        this.api.defaults.headers
    }
}

export default new ApiClient()
