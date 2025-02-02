import authConfig from "../auth.config"
import NextAuth from "next-auth"

import { publicRoutes, authRoutes, apiAuthPrefix, DEFAUL_LOGIN_REDIRECT} from "../routes"
import { NextResponse } from "next/server"


const {auth} = NextAuth(authConfig)

export default auth((req)=>{ 
    const {nextUrl} = req;
    const isLoggedIn  = !!req.auth;
 
    const isApiAuthRoute = nextUrl
    .pathname.startsWith(apiAuthPrefix);

    const isPublic = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return NextResponse.next();
    }

    if(isAuthRoute){
        if(isLoggedIn){
            return NextResponse.redirect(new URL(DEFAUL_LOGIN_REDIRECT, nextUrl));
        }

        return NextResponse.next()
    }
   
    if(!isLoggedIn && !isPublic){
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return NextResponse.next();
    

})


export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };