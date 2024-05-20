/* eslint-disable prettier/prettier */

import { NextRequest, NextResponse } from "next/server"

export default function middleware(req: NextRequest) {

    const token = req.cookies.get('postify.token')?.value

    const signInUrl = new URL('/signin', req.url).toString()
    const homeUrl = new URL('/home', req.url).toString()

    if (!token) {
        if (req.nextUrl.pathname === '/') {
            return NextResponse.next()
        }

        return NextResponse.redirect(signInUrl)
    }

    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(homeUrl)
    }
}

export const config = {
    matcher: ['/', '/home']
}
