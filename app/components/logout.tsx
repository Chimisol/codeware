"use client"; // Client Component

import { logout } from "../../../actions/auth"; // Import Supabase logout action
import { useState } from "react";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const handleLogout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await logout();
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogout}>
      <button type="submit" disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded-md">
        {loading ? "Signing out..." : "Logout"}
      </button>
    </form>
  );
};

export default Logout;
