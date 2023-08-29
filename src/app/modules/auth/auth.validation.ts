import { z } from 'zod'

export const signUpZod = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Zod: Name is required',
    }),
    email: z.string({
      required_error: 'Zod: Email is required',
    }),
    phone: z.string({
      required_error: 'Zod: Phone number is required',
    }),
    password: z.string({
      required_error: 'Zod: Password is required',
    }),
  }),
})

export const signInZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Zod: Email is required',
    }),
    password: z.string({
      required_error: 'Zod: Password is required',
    }),
  }),
})

export const refreshTokenZod = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Zod: Refresh Token is required',
    }),
  }),
})

export const changePasswordZod = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Zod: Old password is required',
    }),
    newPassword: z.string({
      required_error: 'Zod: New password is required',
    }),
  }),
})

export const forgetPasswordZod = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Zod: Email is required',
    }),
  }),
})
