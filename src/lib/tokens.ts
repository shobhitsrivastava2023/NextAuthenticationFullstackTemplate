import {v4 as uuidv4} from 'uuid'
import { db } from './db';
import { getVerificationTokenByEmail} from '../../data/verification-token';
import { getPasswordResetTokenEmail } from '../../data/password-token';


export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenEmail(email); 

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }



  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
} 








export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
    const existingToken = await getVerificationTokenByEmail(email);
    console.log(`${existingToken} this is`)
  
    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      }
    );

    console.log('existing it is')

    }
  
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
  
    return verificationToken;
  };
  