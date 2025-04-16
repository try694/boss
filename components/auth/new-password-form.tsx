"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { NewPasswordSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import {
  Form,
  FormField,
  FormControl,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { newPassword } from "@/actions/new-password";
import { useSearchParams } from "next/navigation";

export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

    const onSubmit = (values: z.infer<typeof NewPasswordSchema>) =>{
      setError("");
      setSuccess("");
      console.log(values);
      
      startTransition(() => {
        newPassword(values, token)
         .then((data) => {
          setError(data.error);
          setSuccess(data.success)
         })
      })
    }
    return (
      <div>
        <CardWrapper
          headerLabel="Enter a new password?"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          disabled={isPending}
                          placeholder="******"
                          type="password"
                          className="bg-gray-900 w-full rounded-md p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
    
              <button
                disabled={isPending}
                type="submit"
                className="w-full bg-blue-700  text-white font-semibold rounded-2xl p-2 transition"
              >
                Reset Password
              </button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    );    
};
