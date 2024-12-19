import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { IoSettings, IoPerson, IoLogOut } from "react-icons/io5";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-80 transition-all"
          >
            <p className="font-bold text-2xl">RTC for SIBERS</p>
          </Link>

          {/* Actions Section */}
          <div className="flex items-center gap-4">
            {/* Settings Button */}
            <Link
              to="/settings"
              className="btn btn-sm flex items-center gap-2 transition-colors"
            >
              <IoSettings className="text-3xl" />
              <span className="font-medium">Settings</span>
            </Link>

            {/* Profile Button */}
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm flex items-center gap-2 transition-colors"
                >
                  <IoPerson className="text-xl" />
                  <span className="font-medium">Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-sm flex items-center gap-2 transition-colors"
                >
                  <IoLogOut className="text-xl" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
