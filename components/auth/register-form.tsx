"use client"

import CardWrapper from "./CardWrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'; 
import { RegisterSchema } from "../../schemas";
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
import { register } from "../../Actions/register";





export const RegisterForm = () => { 
    const [isPending, startTransition] = useTransition();
    const [error , setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>(""); 



    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema), 
        defaultValues : {
           email: "", 
           password: "",
           name: "", 
            
        }
    }); 

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("")
        startTransition(() => {
            register(values).then((data) => {
                setError(data.error); 
                setSuccess(data.success); 

            })
        })
       
    }


    return (
        <CardWrapper
        headerLabel="Create an account"
        backButtonLabel="already have an account? "
        backButtonHref="/auth/login"
        showSocial 
        >
          <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem>
                            <FormLabel>
                               Username
                            </FormLabel>
                            <FormControl>

                                <Input  placeholder="your username" {...field} type = "text" disabled = {isPending} />

                            </FormControl>
                            <FormMessage />

                        </FormItem>
    )}/>
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
                            <FormMessage />

                        </FormItem>
    )}/>


    <FormSucess message = {success}/>
     <FormError message= {error} />
                </div>
                <Button variant="outline" type="submit" className="w-full  hover:bg-green-400" disabled = {isPending}>
                    Create an Account
                </Button>


            </form>

          </Form>

        </CardWrapper>
    )
}