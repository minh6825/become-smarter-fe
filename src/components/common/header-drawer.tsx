"use client";
import { useState } from "react";
import ThemeToggles from "./ThemeToggles";
import { MdMenuOpen } from "react-icons/md";

export default function Drawer() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className="bg-primary-background flex">
        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 shadow-lg bg-primary-background border-r border-r-primary/90 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 z-20`}
        >
          <div className="p-4 flex flex-col h-screen">
            <h2 className="text-xl font-semibold">Menu</h2>
            <ul className="mt-4 flex-1">
              <li className="py-2">
                <a href="#" className="hover:underline">
                  Dashboard
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:underline">
                  Settings
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:underline">
                  Profile
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="hover:underline">
                  Logout
                </a>
              </li>
            </ul>
            <div>
                <ThemeToggles />
            </div>
          </div>
        </div>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"
            onClick={closeDrawer}
          ></div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex">
        <button
          onClick={toggleDrawer}
          className="px-4 py-2"
        >
          <MdMenuOpen className="size-6" />
        </button>
      </div>
    </div>
  );
}