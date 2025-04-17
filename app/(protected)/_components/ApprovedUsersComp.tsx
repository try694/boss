"use client";

import React, { useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import EditApprovedUser from "./EditApprovedUser";
import { deleteUserById } from "@/actions/adminActions";
import { IUser } from "@/interface";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import { getApprovedUsers } from "@/actions/waitinglist-action";

// Map numeric group IDs to group names based on your select options.
const groupMapping: Record<number, string> = {
  1: "VIP",
  2: "TRADER 50",
  3: "TRADER 40",
  4: "TRADER 30",
  5: "TRADER 25",
  6: "TRADER 20",
  7: "TRADER 15",
  8: "TRADER 10",
  9: "TRADER 5",
  10: "ROBOTS",
  11: "WORKERS",
  12: "HIGH",
  13: "MEDIUM",
  14: "LOW",
};

// Helper function to get the group's name from groupId.
const getGroupName = (groupId?: number | string | null): string => {
  if (!groupId) return "-";
  const id = typeof groupId === "string" ? parseInt(groupId, 10) : groupId;
  return groupMapping[id] || "Unknown Group";
};

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

const ApprovedUsersComp = () => {
  const { data: users, mutate } = useSWR<IUser[]>("/admin/approveduser", getApprovedUsers);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  // activeSearch holds the term to filter on after clicking the search button.
  const [activeSearch, setActiveSearch] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const openEditPopup = (user: IUser) => setSelectedUser(user);

  const handleDelete = async (userId: string) => {
    const confirmed = await confirmToast("Are you sure you want to delete this user?");
    if (confirmed) {
      const response = await deleteUserById(userId);
      if (response.error) {
        toast.error(response.error, { autoClose: 2000 });
      } else {
        toast.success("User deleted successfully!", { autoClose: 2000 });
        mutate();
      }
    } else {
      toast.info("Deletion cancelled.", { autoClose: 2000 });
    }
  };

  // Filtering: Search in firstname, lastname, phone, email, and autotrade fields.
  const filteredUsers = (users ?? []).filter((user) => {
    const query = activeSearch.toLowerCase();
    return (
      user.firstname.toLowerCase().includes(query) ||
      user.lastname.toLowerCase().includes(query) ||
      (user.phone && user.phone.toLowerCase().includes(query)) ||
      (user.email && user.email.toLowerCase().includes(query)) ||
      (user.autotrade && user.autotrade.toLowerCase().includes(query))
    );
  });

  // Pagination details
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentPageUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setActiveSearch(searchQuery);
    setCurrentPage(1);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // If the data is not yet fetched, show a loading state (but still show the search bar)
  if (!users) {
    return (
      <div className="overflow-x-auto text-xs md:text-sm">
        {/* Search Bar */}
        <div className="flex items-center justify-end mb-4 px-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded-l-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none"
          />
          <button
            onClick={handleSearch}
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

  return (
    <div className="text-xs md:text-sm w-full">
      {/* Responsive & Fixed Search Bar */}
      <div className="w-full px-2 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-end gap-2">
          <div className="flex w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 w-full sm:w-[240px] rounded-l-md border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-blue-600 rounded-r-md hover:bg-blue-700 transition-colors"
              aria-label="Search users"
            >
              <FaSearch size={16} />
            </button>
          </div>
        </div>
      </div>
  
      {/* Scrollable Table */}
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full table-fixed rounded-lg shadow-lg bg-black-gradient border border-gray-700">
          <thead>
            <tr className="bg-gray-900 text-gray-400 border-b border-gray-700">
            <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">User Name</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">First Name</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Last Name</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Phone</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Country</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Metamask Acc</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Email</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Group</th>
              <th className="p-1 md:p-3 text-left max-w-[12ch] whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPageUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.username}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.firstname}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.lastname}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.phone}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.country}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.metamask}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">{user.email}</td>
                <td className="p-1 md:p-3 text-gray-200 whitespace-nowrap">
                  {getGroupName(user.groupId)}
                </td>
                <td className="p-1 md:p-3">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openEditPopup(user)}
                      className="p-2 text-blue-500 rounded-full transition-colors duration-200"
                      aria-label="Edit"
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="p-2 text-red-500 rounded-full transition-colors duration-200"
                      aria-label="Delete"
                    >
                      <FaTrash className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {currentPageUsers.length === 0 && (
              <tr>
                <td colSpan={8} className="p-4 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  
      {/* Pagination Controls */}
      {filteredUsers.length > itemsPerPage && (
        <div className="flex items-center justify-end mt-4 space-x-4 text-xs md:text-sm">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
  
      {/* Edit Modal */}
      {selectedUser && (
        <EditApprovedUser
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          mutate={mutate as unknown as KeyedMutator<IUser[]>}
        />
      )}
    </div>
  );
  
};

export default ApprovedUsersComp;
