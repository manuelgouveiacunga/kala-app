import { NextResponse } from 'next/server'
import User from '@/models/User'
import UserController from '@/controllers/userController'

export async function GET() {
    const results = []
    const log = (msg, pass) => results.push({ msg, pass })

    try {
        const user = new User({ uid: 'test', username: 'tester' })
        log('User created', !!user)
        
        user.linkConfig = {
            token: 'valid-token',
            expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
            createdAt: new Date().toISOString()
        }

        log('Has active link (no args)', user.hasActiveLink() === true)
        log('Has active link (valid token)', user.hasActiveLink('valid-token') === true)
        log('Has active link (invalid token)', user.hasActiveLink('wrong-token') === false)

        const remaining = user.getLinkTimeRemaining()
        log('Time remaining is approx 48h', remaining > 47 * 60 * 60 * 1000)

        
        user.linkConfig.expiresAt = new Date(Date.now() - 1000).toISOString() 
        log('Expired link (no args) is false', user.hasActiveLink() === false)
        log('Expired link (valid token) is false', user.hasActiveLink('valid-token') === false)

        return NextResponse.json({ success: true, results })
    } catch (e) {
        return NextResponse.json({ success: false, error: e.message })
    }
}
