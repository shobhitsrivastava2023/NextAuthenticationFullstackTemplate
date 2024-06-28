import NextAuth from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";

import GitHub from 'next-auth/providers/github'
import { getUserById } from "./data/user";
export const { handlers: {GET,POST}, auth, signIn,signOut} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  

  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const userId = user.id as string;

      const existingUser = await getUserById(userId);

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      
      return true;
    },
    async session({token,session}){

      console.log({sessionToken: token, session})
      if(token.sub && session.user){
        session.user.id = token.sub
      }
      if(token.role && session.user){
        session.user.role = token.role as "ADMIN" | "USER";

      }
      
      
    

      return session

    },


    async jwt ({token}){
     if(!token.sub) return token;

     const existingUser = await getUserById(token.sub); 
     if(!existingUser) return token;

     token.role = existingUser.role; 
      return token;
    },

    


  },
  pages : { 
    signIn : "/auth/login", 
    error : "auth/error"
  },


  

  adapter : PrismaAdapter(db),
  session : { strategy : "jwt"},




  ...authConfig,
 
})