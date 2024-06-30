"use server"
// import { cookies } from 'next/headers'
import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
const secret = "1234"
const key = new TextEncoder().encode(secret)
export const encrypt = async (payload) => {
    return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("10m").sign(key)
}
export const decrypt = async (input) => {
    try {
        
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"]
        })
        return payload
    } catch (e) {
        if (e instanceof jwtVerify.errors.TokenExpired) {
            // handle expired token error
            console.log("Token has expired");
    
        } else {
            // handle other errors
            console.error("Token verification failed:", e.message);
        }
    }

}
export async function login(formdata) {

    const user = formdata.get("email")
    const expires = new Date(Date.now() + 10 * 1000)
    const session = await encrypt({ user, expires })
    cookies().set('session', session, { secure: true })
    redirect("/dashboard")
}
export async function logout() {

    cookies().set('session', "", { expires: new Date(0) })
}
export async function getSession() {

    const session = cookies().get('session')?.value
    if (!session) return null
    // return await decrypt(session)
    return true
}
export async function updateSession(request) {

    const session = request.cookies().get('session')?.value
    if (!session) return null
    const parsed = await decrypt(session)
    parsed.expires = new Date(Date.now() + 10 * 1000)
    const res = NextResponse.next()
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires

    })
    return res
}