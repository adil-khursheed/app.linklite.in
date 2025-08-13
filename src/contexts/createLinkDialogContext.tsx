"use client";

import React, { createContext, useContext, useEffect } from "react";

interface TDialogContext {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateLinkDialogContext = createContext<TDialogContext>({
  open: false,
  setOpen: () => {},
});

export const CreateLinkDialogProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "c") {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <CreateLinkDialogContext.Provider value={{ open, setOpen }}>
      {children}
    </CreateLinkDialogContext.Provider>
  );
};

export const useCreateLinkDialog = () => {
  const ctx = useContext(CreateLinkDialogContext);
  if (!ctx) {
    throw new Error(
      "useCreateLinkDialog must be used within CreateLinkDialogProvider"
    );
  }
  return ctx;
};
