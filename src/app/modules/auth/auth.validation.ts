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
