"use client";

import React, { useRef, useState, useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import { CardWrapper } from "./card-wrapper";
import { PhoneInput, PhoneInputRefType } from "react-international-phone";
import { useRouter } from "next/navigation";
import "react-international-phone/style.css";
import countryList from "country-list";
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
import { register } from "@/actions/register";
import { FiLoader } from "react-icons/fi";

export const RegisterForm: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const countries = countryList.getData();

  const phoneRef = useRef<PhoneInputRefType>(null);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      country: "NG", // default ISO2 code
      phone: "",
      metamask: "",
      autotrade: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const selectedCountryCode = useWatch({
    control: form.control,
    name: "country",
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await register(values);
        if (data.error) {
          setError(data.error);
        } else if (data.success) {
          setSuccess(data.success);
          setTimeout(() => {
            router.push("/auth/login");
          }, 3000);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again later.");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex items-center justify-center px-2 py-4">
      <div className="w-full max-w-6xl">
        <CardWrapper
          headerLabel="Create an account"
          backButtonLabel="Already have an account?"
          backButtonHref="/auth/login"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          disabled={isPending}
                          placeholder="user123"
                          className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Firstname */}
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          disabled={isPending}
                          placeholder="John"
                          className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Lastname */}
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          disabled={isPending}
                          placeholder="Doe"
                          className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          disabled={isPending}
                          onChange={(e) => {
                            const code = e.target.value;
                            field.onChange(code);
                            phoneRef.current?.setCountry(code.toLowerCase());
                          }}
                          className="bg-gray-900 text-white w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        >
                          <option value="">Select a country</option>
                          {countries.map((country) => (
                            <option key={country.code} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

<FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem className="col-span-1 md:col-span-2">
      <FormLabel>Phone Number</FormLabel>
      <FormControl>
        <PhoneInput
          ref={phoneRef}
          value={field.value}
          onChange={field.onChange}
          defaultCountry={(selectedCountryCode || "ng").toLowerCase()}
          key={(selectedCountryCode || "ng").toLowerCase()}
          disabled={isPending}
          placeholder="812 345 6789"
        
          inputStyle={{
            width: "100%",
            backgroundColor: "#111827", // Tailwind's bg-gray-900
            color: "white",
            border: "1px solid #1f2937",  // Tailwind's border-gray-800
            borderRadius: "0.375rem",     // rounded-md
            padding: "0.25rem 0.5rem",     // p-1 and px-2
            fontSize: "0.875rem",         // text-sm
          }}
          // Ensure no additional classes interfere.
          inputClassName="!bg-[#111827] !text-white"
          countrySelectorStyleProps={{
            // Set the flag (country selector button) background to gray-800 (#1f2937)
            buttonClassName:
              "bg-[#1f2937] text-white px-2 p-1 rounded-l-md",
            dropdownStyleProps: {
              className: "bg-[#1f2937] text-white",
            },
          }}
          className="!w-full !bg-[#111827]"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>




                {/* Metamask */}
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="metamask"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Metamask Wallet Address</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            disabled={isPending}
                            placeholder="0x..."
                            className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* AutoTrade */}
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="autotrade"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>AutoTrade</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            disabled={isPending}
                            placeholder="BrainStorm"
                            className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Email */}
                <div className="col-span-1 md:col-span-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <input
                            {...field}
                            type="email"
                            disabled={isPending}
                            placeholder="john@example.com"
                            className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="password"
                          disabled={isPending}
                          placeholder="********"
                          className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="password"
                          disabled={isPending}
                          placeholder="Confirm Password"
                          className="bg-gray-900 w-full rounded-md px-2 p-1 border border-gray-800 text-sm placeholder:text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isPending}
                  className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-2xl px-6 py-2 transition text-sm md:text-base disabled:opacity-50"
                >
                  {isPending && <FiLoader className="animate-spin mr-2" size={20} />}
                  Create an account
                </button>
              </div>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </div>
  );
};
