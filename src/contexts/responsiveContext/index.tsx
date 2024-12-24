"use client";

import React, { useContext, useState, createContext } from "react";

const ResponsiveContext = createContext<any>(null);

const useResponsive = () => {
  return useContext(ResponsiveContext);
};

const ResponsiveProvider = ({ children }: { children: React.ReactNode }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  const value: any = { openSidebar, setOpenSidebar };

  return (
    <ResponsiveContext.Provider value={value}>
      {children}
    </ResponsiveContext.Provider>
  );
};

export { ResponsiveProvider, useResponsive };
