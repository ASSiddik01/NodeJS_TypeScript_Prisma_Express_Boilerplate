import { z } from 'zod'

export const signUpZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Z: Name is required',
    }),
    email: z.string({
      required_error: 'Z: Email is required',
    }),
    phone: z.string({
      required_error: 'Z: Phone number is required',
    }),
    password: z.string({
      required_error: 'Z: Password is required',
    }),
  }),
})

export const signInZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Z: Email is required',
    }),
    password: z.string({
      required_error: 'Z: Password is required',
    }),
  }),
})

export const refreshTokenZod = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Z: Refresh Token is required',
    }),
  }),
})

export const changePasswordZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Z: Old password is required',
    }),
    newPassword: z.string({
      required_error: 'Z: New password is required',
    }),
  }),
})

export const forgetPasswordZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Z: Email is required',
    }),
  }),
})

export const resetPasswordZod = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Z: Password is required',
    }),
  }),
})
