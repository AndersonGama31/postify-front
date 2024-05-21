export interface IAuthPayload {
    email: string
    password: string
}

export interface ISignUpPayload {
    name: string
    avatar: string
    email: string
    password: string
    job: string
}

export interface IUser {
    id: string
    name: string
    email: string
    access_token: string
}

export interface ISignUpResponse {
    access_token: string
    user: IUser & {
        avatar: string
        job: string
    }
}
