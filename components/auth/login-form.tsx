"use client"

import CardWrapper from "./CardWrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'; 
import { LoginSchema } from "../../schemas";
import { useState, useTransition } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSucess } from "../form-success";
import { login } from "../../Actions/login";
import { useSearchParams } from "next/navigation";
import Link from "next/link";



export const LoginForm = () => { 
    const [isPending, startTransition] = useTransition();
    const [error , setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const searchParams = useSearchParams();  
    const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";


    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema), 
        defaultValues : {
           email: "", 
           password: "",
            
        }
    }); 

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("")
        startTransition(() => {
            login(values).then((data) => {
                setError(data?.error); 
                setSuccess(data?.success); 

            })
        })
       
    }


    return (
        <CardWrapper
        headerLabel="Welcome to Login"
        backButtonLabel="Dont have an account? "
        backButtonHref="/auth/register"
        showSocial 
        >
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <FormField control={form.control} name="email" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input  placeholder="email" {...field} type = "email" disabled = {isPending} />

                            </FormControl>
                            <FormMessage />

                        </FormItem>
    )}/>

<FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Password
                            </FormLabel>
                            <FormControl>

                                <Input  placeholder="your password" {...field} type = "password" disabled = {isPending} />

                            </FormControl>
                            <Button size= "sm" variant="link" asChild className="px-0 font-normal"><Link href = "/auth/reset"> forgot password? </Link></Button>
                            <FormMessage />

                        </FormItem>
    )}/>
    <FormSucess message = {success}/>
     <FormError message= {error || urlError} />
                </div>
                <Button variant="outline" type="submit" className="w-full  hover:bg-green-400" disabled = {isPending}>
                    Login
                </Button>


            </form>

          </Form>

        </CardWrapper>
    )
}