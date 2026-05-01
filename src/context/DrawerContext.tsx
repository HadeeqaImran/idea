import React, { createContext, useContext } from 'react';

type DrawerContextValue = {
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const DrawerContext = createContext<DrawerContextValue>({
  isDrawerOpen: false,
  openDrawer: () => {},
  closeDrawer: () => {},
});

export function DrawerProvider({
  value,
  children,
}: {
  value: DrawerContextValue;
  children: React.ReactNode;
}) {
  return <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>;
}

export function useDrawer(): DrawerContextValue {
  return useContext(DrawerContext);
}
