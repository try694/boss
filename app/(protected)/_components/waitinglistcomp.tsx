"use client";

import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import ApproveUserPopup from "./ApproveUserPopup";
import { IUser } from "@/interface";
import { deleteUserById, getAllUsers } from "@/actions/waitinglist-action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaTimesCircle, FaSearch } from "react-icons/fa";

// Custom confirmation toast helper
const confirmToast = (message: string): Promise<boolean> =>
  new Promise((resolve) => {
    const toastId = toast.info(
      <div>
        <p>{message}</p>
        <div style={{ marginTop: 10, display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
            onClick={() => { resolve(true); toast.dismiss(toastId); }}
            style={{ backgroundColor: "green", color: "white", border: "none", padding: "5px 10px" }}
          >
            Yes
          </button>
          <button
            onClick={() => { resolve(false); toast.dismiss(toastId); }}
            style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px" }}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false, closeOnClick: false }
    );
  });

const WaitingListComp: React.FC = () => {
  // Fetch all users (server‑side only returns unapproved ones)
  const { data: users, mutate } = useSWR<IUser[]>(
    "/admin/waitinglist",
    getAllUsers
  );

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  if (!users) {
    // Still loading
    return (
      <div className="overflow-x-auto text-xs md:text-sm">
        <div className="flex items-center justify-end mb-4 px-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-l-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none"
          />
          <button
            onClick={() => { setActiveSearch(searchQuery); setCurrentPage(1); }}
            className="p-2 bg-blue-600 rounded-r-md hover:bg-blue-700 transition-colors"
            aria-label="Search users"
          >
            <FaSearch size={16} />
          </button>
        </div>
        <div className="py-6 text-center text-gray-300">Loading...</div>
      </div>
    );
  }

  // Only the pending (approved===false) users come from the fetcher, but just in case:
  const pendingUsers = users.filter((u) => !u.approved);

  // Filter by activeSearch across username, firstname, lastname, phone, email
  const filtered = pendingUsers.filter((u) => {
    const q = activeSearch.toLowerCase();
    return (
      u.username.toLowerCase().includes(q) ||
      u.firstname.toLowerCase().includes(q) ||
      u.lastname.toLowerCase().includes(q) ||
      (u.phone?.toLowerCase().includes(q) ?? false) ||
      (u.email?.toLowerCase().includes(q) ?? false)
    );
  });

  // Pagination math
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const pageUsers = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleReject = async (id: string) => {
    const ok = await confirmToast("Are you sure you want to reject this user?");
    if (!ok) return toast.info("Rejection cancelled", { autoClose: 2000 });

    const res = await deleteUserById(id);
    if (res.error) toast.error(res.error, { autoClose: 2000 });
    else {
      toast.success(res.success || "User rejected!", { autoClose: 2000 });
      mutate();
    }
  };

  return (
    <div className="text-xs md:text-sm w-full">
      {/* Search Bar */}
      <div className="w-full px-2 mb-4">
        <div className="flex justify-end gap-2">
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full sm:w-[240px] rounded-l-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button
              onClick={() => { setActiveSearch(searchQuery); setCurrentPage(1); }}
              className="p-2 bg-blue-600 rounded-r-md hover:bg-blue-700 transition-colors"
              aria-label="Search users"
            >
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700">
          <thead>
            <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
              <th className="p-1 md:p-3 text-left">Username</th>
              <th className="p-1 md:p-3 text-left">First Name</th>
              <th className="p-1 md:p-3 text-left">Last Name</th>
              <th className="p-1 md:p-3 text-left">Phone</th>
              <th className="p-1 md:p-3 text-left">Country</th>
              <th className="p-1 md:p-3 text-left">Email</th>
              <th className="p-1 md:p-3 text-left">MetaMask Add</th>
              <th className="p-1 md:p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((u) => (
              <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.username}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.firstname}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.lastname}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.phone}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.country}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.email}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{u.metamask}</td>
                <td className="p-1 md:p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedUser(u)}
                      className="p-2 text-green-500 rounded-full"
                      aria-label="Approve"
                    >
                      <FaCheckCircle className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleReject(u.id)}
                      className="p-2 text-red-500 rounded-full"
                      aria-label="Reject"
                    >
                      <FaTimesCircle className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {pageUsers.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filtered.length > itemsPerPage && (
        <div className="flex items-center justify-end mt-4 space-x-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Approve Modal */}
      {selectedUser && (
        <ApproveUserPopup
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            mutate();
          }}
        />
      )}
    </div>
  );
};

export default WaitingListComp;
