"use server"
import * as z from 'zod'
import { RegisterSchema} from '../schemas';
import bcrypt from 'bcryptjs'; 
import { db } from '@/lib/db';
import { generateVerificationToken } from '@/lib/tokens';
import { sendVerificationEmail } from '@/lib/mail';
export const register = async (values : z.infer<typeof RegisterSchema>) => {

    const validatedFields = RegisterSchema.safeParse(values); 
    if(!validatedFields.success){
        return { error : " Invalid fields "};
    }

    const { email, password, name } =validatedFields.data;
    const hashPassword = await bcrypt.hash(password, 10); 

    const existingUser = await db.user.findUnique({
        where : {
            email, 
        }
    })

    if(existingUser){ 
        return {error : "user already exist"}; 
    }

    await db.user.create({
        data: {
            email: email, 
            password : hashPassword, 
            name : name, 

        }
    })

    // TODO: Send verification token email;
    

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    if(verificationToken){
        console.log(verificationToken)
    }

    




    return { success : "confirmation email sent"}
}