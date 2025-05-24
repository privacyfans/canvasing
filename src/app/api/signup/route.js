import { prisma } from '@src/lib/db'
import { isStrongPassword, isValidEmail } from '@src/lib/validation'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    // Get request body
    const { name, email, password } = await request.json()

    // Validate required fields
    if (!name || !email || !password || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Missing required fields or invalid email',
          user: null,
        }),
        { status: 400 }
      )
    }

    // Validate password strength
    if (!isStrongPassword(password)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Password must be at least 8 characters long',
          user: null,
        }),
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    })

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email already registered',
          user: null,
        }),
        { status: 409 }
      )
    }

    // Hash password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'User created successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }),
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)

    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
        user: null,
      }),
      { status: 500 }
    )
  }
}
