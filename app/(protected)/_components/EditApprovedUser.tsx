"use client";

import * as z from "zod";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { KeyedMutator } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditApprovedUserSchema } from "@/schemas";
import { updateApprovedUser } from "@/actions/waitinglist-action";
import { IUser } from "@/interface";
import GROUP_PRESETS from "@/const/grouppreset";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type EditApprovedUserSchemaType = z.infer<typeof EditApprovedUserSchema>;

interface EditApprovedUserProps {
  user: IUser;
  onClose: () => void;
  mutate: KeyedMutator<IUser[]>;
}

const EditApprovedUser: React.FC<EditApprovedUserProps> = ({ user, onClose, mutate }) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<EditApprovedUserSchemaType>({
    resolver: zodResolver(EditApprovedUserSchema),
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
      country: user.country,
      metamask: user.metamask,
      autotrade: user.autotrade,
      email: user.email,
      approved: user.approved,
      whitelisted: user.whitelisted ?? false,
      groupId: user.groupId ?? "",
      allowedTradingAmountFrom: user.allowedTradingAmountFrom ?? 0,
      allowedTradingAmountTo: user.allowedTradingAmountTo ?? 0,
      adminFee: user.adminFee ?? 0,
      userProfit: user.userProfit ?? 0,
      introducerFee: user.introducerFee ?? 0,
    },
  });

  // Custom handler to auto-populate related fields when the group is changed.
  const handleGroupChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const groupId = e.target.value;
    form.setValue("groupId", groupId);
    if (GROUP_PRESETS[groupId]) {
      const preset = GROUP_PRESETS[groupId];
      form.setValue("adminFee", preset.adminFee);
      form.setValue("userProfit", preset.userProfit);
      form.setValue("introducerFee", preset.introducerFee);
      form.setValue("allowedTradingAmountFrom", preset.allowedTradingAmountFrom);
      // Cast the preset value for allowedTradingAmountTo to number | "Unlimited"
      form.setValue("allowedTradingAmountTo", preset.allowedTradingAmountTo as number | "Unlimited");
    }
  };

  const onSubmit = (values: EditApprovedUserSchemaType) => {
    setError("");
    startTransition(async () => {
      try {
        const response = await updateApprovedUser(user.id, values);
        if (response?.error) {
          setError(response.error);
          toast.error(response.error);
        } else {
          toast.success("User updated successfully!");
          onClose();
          mutate();
        }
      } catch (err) {
        console.error("Update error:", err);
        setError("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-md w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl text-gray-400 font-bold mb-4">
          Edit User: {user.firstname} ({user.email})
        </h2>
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid text-gray-400 grid-cols-2 gap-4">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
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
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Metamask */}
              <FormField
                control={form.control}
                name="metamask"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metamask</FormLabel>
                    <FormControl>
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* AutoTrade */}
              <FormField
                control={form.control}
                name="autotrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AutoTrade</FormLabel>
                    <FormControl>
                      <input {...field} className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <input {...field} type="email" className="bg-gray-800 text-gray-200 w-full p-2 rounded" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Approved Checkbox */}
              <FormField
                control={form.control}
                name="approved"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    <FormLabel className="text-gray-200">Approved</FormLabel>
                  </FormItem>
                )}
              />
              {/* Whitelisted Checkbox */}
              <FormField
                control={form.control}
                name="whitelisted"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                    <FormLabel className="text-gray-200">Whitelisted</FormLabel>
                  </FormItem>
                )}
              />
              {/* Group Select with auto-populate */}
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        onChange={(e) => {
                          handleGroupChange(e);
                        }}
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded"
                      >
                        <option value="">Select group</option>
                        <option value="1">VIP</option>
                        <option value="2">TRADER 50</option>
                        <option value="3">TRADER 40</option>
                        <option value="4">TRADER 30</option>
                        <option value="5">TRADER 25</option>
                        <option value="6">TRADER 20</option>
                        <option value="7">TRADER 15</option>
                        <option value="8">TRADER 10</option>
                        <option value="9">TRADER 5</option>
                        <option value="10">ROBOTS</option>
                        <option value="11">WORKERS</option>
                        <option value="12">HIGH</option>
                        <option value="13">MEDIUM</option>
                        <option value="14">LOW</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Allowed Trading Amount From */}
              <FormField
                control={form.control}
                name="allowedTradingAmountFrom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed Trading Amount From</FormLabel>
                    <FormControl>
                      <input 
                        type="number" 
                        {...field} 
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Allowed Trading Amount To */}
              <FormField
                control={form.control}
                name="allowedTradingAmountTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed Trading Amount To</FormLabel>
                    <FormControl>
                      {/* Using type "text" so that it can handle numbers or "Unlimited" */}
                      <input 
                        type="text" 
                        {...field} 
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Admin Fee */}
              <FormField
                control={form.control}
                name="adminFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Fee</FormLabel>
                    <FormControl>
                      <input 
                        type="number" 
                        {...field} 
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* User Profit */}
              <FormField
                control={form.control}
                name="userProfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Profit (%)</FormLabel>
                    <FormControl>
                      <input 
                        type="number" 
                        {...field} 
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Introducer Fee */}
              <FormField
                control={form.control}
                name="introducerFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Introducer Fee (%)</FormLabel>
                    <FormControl>
                      <input 
                        type="number" 
                        {...field} 
                        className="bg-gray-800 text-gray-200 w-full p-2 rounded" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                disabled={isPending}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Confirm
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EditApprovedUser;
