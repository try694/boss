"use client";

import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import ApproveUserPopup from "./ApproveUserPopup";
import { IUser } from "@/interface";
import { deleteUserById, getAllUsers } from "@/actions/waitinglist-action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Custom confirmation toast helper using React Toastify
const confirmToast = (message: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const toastId = toast.info(
      <div>
        <p>{message}</p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
          }}
        >
          <button
            onClick={() => {
              resolve(true);
              toast.dismiss(toastId);
            }}
            style={{
              backgroundColor: "green",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Yes
          </button>
          <button
            onClick={() => {
              resolve(false);
              toast.dismiss(toastId);
            }}
            style={{
              backgroundColor: "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  });
};

const WaitingListComp: React.FC = () => {
  const { data: users, mutate } = useSWR<IUser[]>("/pendingusers", getAllUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Filter pending users (approved === false)
  const pendingUsers = users?.filter((u) => !u.approved) || [];

  const openApprovePopup = (user: IUser) => setSelectedUser(user);

  // Custom reject handler using react-toastify for confirmation
  const handleReject = async (userId: string) => {
    const confirmed = await confirmToast("Are you sure you want to reject this user?");
    if (confirmed) {
      const res = await deleteUserById(userId);
      
      if (res.error) {
        toast.error(res.error, { autoClose: 2000 });
      } else {
        toast.success(res.success || "User rejected!", { autoClose: 2000 });
        mutate(); // revalidate list after deletion
      }
    }
  };

  const closeApprovePopup = () => {
    setSelectedUser(null);
    mutate(); // Revalidate after approval/rejection
  };

  return (
    <div className="overflow-x-auto mt-6 text-xs md:text-sm">
      <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700">
        <thead>
          <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              First Name
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Last Name
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Phone
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Country
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Email
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              MetaMask Add
            </th>
            <th className="p-1 md:p-3 text-left max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pendingUsers.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-700 hover:bg-gray-800"
            >
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.firstname}
              </td>
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.lastname}
              </td>
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.phone}
              </td>
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.country}
              </td>
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.email}
              </td>
              <td className="p-1 md:p-3 text-gray-200 max-w-[12ch] overflow-hidden whitespace-nowrap text-ellipsis">
                {user.metamask}
              </td>
              <td className="p-1 md:p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => openApprovePopup(user)}
                    className="p-2 text-green-500 rounded-full transition-colors duration-200"
                    aria-label="Approve"
                  >
                    <FaCheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(user.id)}
                    className="p-2 text-red-500 rounded-full transition-colors duration-200"
                    aria-label="Reject"
                  >
                    <FaTimesCircle className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <ApproveUserPopup user={selectedUser} onClose={closeApprovePopup} />
      )}
    </div>
  );
};

export default WaitingListComp;
