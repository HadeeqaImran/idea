import React, { createContext, useContext, useState } from 'react';

export type User = {
  name: string;
  location?: string;
  memberSince?: string;
  isPremium?: boolean;
};

type UserContextValue = {
  user: User;
  setUser: (user: User) => void;
};

const DEFAULT_USER: User = {
  name: 'Sarah Rahman',
  location: 'London',
  memberSince: 'Jan 2025',
  isPremium: true,
};

const UserContext = createContext<UserContextValue>({
  user: DEFAULT_USER,
  setUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser(): UserContextValue {
  return useContext(UserContext);
}

/** Returns just the first word of the user's name (e.g. "Sarah Rahman" → "Sarah") */
export function firstName(user: User): string {
  return user.name.split(' ')[0];
}

/** Returns the uppercase initial of the user's name (e.g. "Sarah Rahman" → "S") */
export function userInitial(user: User): string {
  return user.name.charAt(0).toUpperCase();
}
