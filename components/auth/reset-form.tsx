"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResetSchema } from "@/schemas";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

    const onSubmit = (values: z.infer<typeof ResetSchema>) =>{
      setError("");
      setSuccess("");
      console.log(values);
      
      startTransition(() => {
        reset(values)
         .then((data) => {
          setError(data.error);
          setSuccess(data.success)
         })
      })
    }
    return (
      <div>
        <CardWrapper
          headerLabel="Forgot your password?"
          backButtonLabel="Back to login"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          disabled={isPending}
                          placeholder="john@example.com"
                          type="email"
                          className="bg-gray-900 w-full border border-gray-800 rounded-md p-2"
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
                Send reset email
              </button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    );    
};
