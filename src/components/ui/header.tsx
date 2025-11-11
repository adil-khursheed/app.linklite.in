import React from "react";
import { SidebarTrigger } from "./sidebar";
import UserButton from "./user-button";
import ThemeToggle from "./theme-toggle";

const Header = () => {
  return (
    <header className="bg-background border-border flex items-center justify-between gap-3 rounded-2xl border p-3 shadow">
      <SidebarTrigger />

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
