"use client"

import CardWrapper from "./CardWrapper"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from 'zod'; 

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
 
import { reset } from "../../Actions/reset";
import { ResetSchema } from "../../schemas";



export const ResetForm = () => { 
    const [isPending, startTransition] = useTransition();
    const [error , setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
 
      


    const form = useForm<z.infer<typeof ResetSchema>>({
        resolver: zodResolver(ResetSchema), 
        defaultValues : {
           email: "", 
          
            
        }
    }); 

    const onSubmit = (values: z.infer<typeof ResetSchema>) => {
        setError("");
        setSuccess("");
    
        startTransition(() => {
          reset(values).then((data) => {
            setError(data?.error);
            setSuccess(data?.success);
          });
        });
       
    }


    return (
        <CardWrapper
        headerLabel="reset your password"
        backButtonLabel="back to login"
        backButtonHref="/auth/login"
     
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


    <FormSucess message = {success}/>
     <FormError message= {error} />
                </div>
                <Button variant="outline" type="submit" className="w-full  hover:bg-green-400" disabled = {isPending}>
                   Reset
                </Button>


            </form>

          </Form>

        </CardWrapper>
    )
}