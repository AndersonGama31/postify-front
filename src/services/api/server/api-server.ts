/* eslint-disable prettier/prettier */
import axios, { Axios, AxiosError } from 'axios'
import { cookies } from 'next/headers'

class ApiServer {
    api: Axios
    token: string

    constructor() {
        this.token = cookies().get('postify.token').value

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
}

export default new ApiServer()