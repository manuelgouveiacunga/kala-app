import { NextResponse } from 'next/server'

// Mock API endpoints - Firebase will be integrated later

export async function GET(request) {
  const { pathname } = new URL(request.url)

  // Get user messages
  if (pathname.includes('/api/messages')) {
    const userId = pathname.split('/').pop()
    
    return NextResponse.json({
      success: true,
      messages: [
        {
          id: '1',
          text: 'És uma pessoa incrível!',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          read: false
        },
        {
          id: '2',
          text: 'Admiro muito a tua dedicação',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          read: false
        }
      ]
    })
  }

  // Get user by username
  if (pathname.includes('/api/user/')) {
    const username = pathname.split('/').pop()
    
    return NextResponse.json({
      success: true,
      user: {
        username: username,
        displayName: username,
        isPremium: false,
        messageCount: 0
      }
    })
  }

  return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 })
}

export async function POST(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const body = await request.json()

    // Send message
    if (pathname.includes('/api/messages/send')) {
      const { username, message } = body

      // Mock validation
      if (!username || !message) {
        return NextResponse.json(
          { success: false, error: 'Dados inválidos' },
          { status: 400 }
        )
      }

      if (message.trim().length < 10) {
        return NextResponse.json(
          { success: false, error: 'Mensagem muito curta' },
          { status: 400 }
        )
      }

      // Mock: In real app, save to Firestore
      return NextResponse.json({
        success: true,
        messageId: 'msg_' + Date.now()
      })
    }

    // Create user
    if (pathname.includes('/api/user/create')) {
      const { email, username } = body

      // Mock: In real app, create in Firebase Auth + Firestore
      return NextResponse.json({
        success: true,
        user: {
          uid: 'user_' + Date.now(),
          email,
          username,
          isPremium: false,
          messageCount: 0,
          createdAt: new Date().toISOString()
        }
      })
    }

    return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro no servidor' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  const { pathname } = new URL(request.url)
  
  try {
    const body = await request.json()

    // Update user premium status
    if (pathname.includes('/api/user/premium')) {
      const { userId } = body

      // Mock: In real app, update in Firestore
      return NextResponse.json({
        success: true,
        isPremium: true
      })
    }

    return NextResponse.json({ success: false, error: 'Route not found' }, { status: 404 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Erro no servidor' },
      { status: 500 }
    )
  }
}