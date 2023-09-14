import { z } from 'zod'

// Create profile zod validation schema
export const createProfileZod = z.object({
  body: z.object({
    about: z.string({
      required_error: 'Z: About is required',
    }),
    designation: z.string().optional(),
    resumeUrl: z.string().optional(),
    address: z.string({
      required_error: 'Z: Address is required',
    }),
    bloodGroup: z.string().optional(),
    contactEmail: z.string().optional(),
    occupation: z.string().optional(),
    photoUrl: z.string().optional(),
    facebook: z.string().optional(),
    github: z.string().optional(),
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    behance: z.string().optional(),
    skype: z.string().optional(),
    twitter: z.string().optional(),
    telegram: z.string().optional(),
    whatsapp: z.string().optional(),
    youtube: z.string().optional(),
  }),
})
