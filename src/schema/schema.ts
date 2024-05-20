/* eslint-disable prettier/prettier */

import { z } from 'zod'

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})

export const signUpSchema = z.object({
    name: z.string().min(3),
    nickname: z.string().min(3),
    avatar: z.string().url(),
    email: z.string().email(),
    password: z.string().min(6),
    passwordConfirmation: z
        .string()
        .min(6)
        .refine(data => data === data.password, {
            message: 'Passwords do not match',
            path: ['passwordConfirmation']
        })
})

export const addPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(200)
})

export type TSignInSchema = z.infer<typeof signInSchema>

export type TSignUpSchema = z.infer<typeof signUpSchema>

export type TAddPostSchema = z.infer<typeof addPostSchema>
