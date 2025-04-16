"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  // You can add your own logic for onClick
  const handleGoogleLogin = () => {
    // e.g., signIn("google")
  };

  const handleGithubLogin = () => {
    // e.g., signIn("github")
  };

  return (
    <div className="flex items-center w-full gap-2">
      <button
        className="w-full flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-700 transition p-2 rounded-2xl"
        onClick={handleGoogleLogin}
      >
        <FcGoogle size={20} />
        <span className="text-white font-semibold">Google</span>
      </button>
    </div>
  );
};
