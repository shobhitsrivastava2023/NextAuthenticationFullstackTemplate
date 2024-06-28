import * as z from 'zod'; 

export const LoginSchema = z.object({
    email : z.string().email({
         message: "email is invalid"
    }), 
    password : z.string().min(1, {
        message: "password is require (dev)"
    }), 

})

export const ResetSchema = z.object({
    email : z.string().email({
         message: "email is invalid"
    }), 
   

})


export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
  });


export const RegisterSchema = z.object({
    email : z.string().email({
         message: "email is invalid"
    }), 
    password : z.string().min(6, {
        message: "minimum 6 characters required"
    }), 

    name : z.string().min(2, {
        message: "username is required"
    }), 

})

