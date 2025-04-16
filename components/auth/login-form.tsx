"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
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
import { login } from "@/actions/login";
import Link from "next/link";
import { FiLoader } from "react-icons/fi";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setLoading(true);
  
    try {
      const data = await login(values);
      if (data.error) {
        setError(data.error);
      } else if (data.success) {
        setSuccess(data.success);
        setTimeout(() => {
          router.push("/settings");
        }, 1500);
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-18 flex flex-col items-center bg-gray-900 px-1 sm:px-6 md:px-8 lg:px-10">
      <CardWrapper
        headerLabel="Welcome!"
        backButtonLabel="Don’t have an account?"
        backButtonHref="/auth/register"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
            <FormField
  control={form.control}
  name="username"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Username</FormLabel>
      <FormControl>
        <input
          {...field}
          disabled={loading}
          placeholder="username123"
          className="bg-gray-900 border border-gray-800 w-full rounded-md p-2 text-sm md:text-base placeholder-gray-400 disabled:opacity-75"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        disabled={loading}
                        placeholder="********"
                        type="password"
                        className="bg-gray-900 w-full border border-gray-800 rounded-md p-2 text-sm md:text-base placeholder-gray-400 disabled:opacity-75"
                      />
                    </FormControl>
                    <div className="relative p-4">
                      <button
                        type="button"
                        disabled={loading}
                        className="absolute left-0 text-sm text-blue-200 disabled:opacity-75"
                      >
                        <Link href="/auth/reset">Forgot Password?</Link>
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <div className="flex justify-center">
              <button
                disabled={loading}
                type="submit"
                className="flex items-center justify-center w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-2xl p-2 transition text-sm md:text-base disabled:bg-yellow-600 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <FiLoader className="animate-spin mr-2" size={24} />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
