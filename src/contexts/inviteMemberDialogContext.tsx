"use client";

import React, { createContext, useContext, useEffect } from "react";

interface TInviteMemberDialogContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const InviteMemberDialogContext = createContext<TInviteMemberDialogContext>({
  open: false,
  setOpen: () => {},
});

export const InviteMemberDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open && e.key.toLowerCase() === "m") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <InviteMemberDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </InviteMemberDialogContext.Provider>
  );
};

export const useInviteMemberDialog = () => {
  const ctx = useContext(InviteMemberDialogContext);
  if (!ctx) {
    throw new Error(
      "useInviteMemberDialog must be used within InviteMemberDialogProvider"
    );
  }
  return ctx;
};
