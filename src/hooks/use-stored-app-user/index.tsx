import { AppUser } from "@/@types";
import { useEffect, useState } from "react";

export const useStoredAppUser = (): [
  AppUser | null,
  (user: AppUser) => void
] => {
  const [user, setUser] = useState<AppUser | null>(() => {
    const storedUser = localStorage.getItem("app_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUserInLocalStorage = (user: AppUser): void => {
    setUser(user);
    localStorage.setItem("app_user", JSON.stringify(user));
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent): void => {
      if (event.key === "app_user") {
        setUser(event.newValue ? JSON.parse(event.newValue) : null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return [user, setUserInLocalStorage];
};
