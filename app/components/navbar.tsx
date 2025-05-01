import { createClient } from "@utils/supabase/server"; 
import Link from "next/link";
import Logout from "./logout"; 
import React from "react";

const Navbar = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="relative w-full h-24 shadow-xl bg-orange-800 p-10">
      <div className="flex justify-between items-center h-full w-full">
        <div className=" items-center justify-between">
          <Link href="/dashboard" className="text-lg font-semibold text-white">
            DASHBOARD
          </Link>
        </div>
        <div className="flex items-center gap-x-28">
          {!user ? (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md">
              LOGIN
            </Link>
          ) : (
            <>
            <div className="flex items-center gap-x-28">
              <span className="text-white">{user?.email}</span>
              </div>
              <Logout /> {/* Logout button */}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
  

export default Navbar;
