import * as z from "zod"


export const SignupValidation = z.object({
    name: z.string().min(2,{message: "Too short Name"}),
    username: z.string().min(2,{message: "Too short User Name"}),
    email: z.string().email({message: "Use a correct mail"}),
    password: z.string().min(8,{message: "C'mon try better"}),
  })


  export const SigninValidation = z.object({
    email: z.string().email({message: "Use a correct mail"}),
    password: z.string().min(8,{message: "C'mon try better"}),
  })

  export const PostValidation = z.object({
    caption: z.string().min(5).max(2000),
    file: z.custom<File[]>(),
    location: z.string().min(2).max(100),
    tags: z.string(),
  })
  