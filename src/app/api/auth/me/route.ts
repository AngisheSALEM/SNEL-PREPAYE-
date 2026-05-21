import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get('snel-pay-session')?.value

    if (!userId) {
      return NextResponse.json({ user: null })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!user) {
      return NextResponse.json({ user: null })
    }

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
    }
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
