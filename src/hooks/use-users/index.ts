import { NewUserProps } from "@/@types";
import { SESSION_USERS_KEY, SESSION_CURRENT_USER_KEY } from "@/static";
import useCrypto from "../use-crypto";

// Retrieve users from localStorage
const getStoredUsers = (): NewUserProps[] => {
  const storedUsers = localStorage.getItem(SESSION_USERS_KEY);
  return storedUsers ? JSON.parse(storedUsers) : [];
};

const getCurrentUser = (): Omit<NewUserProps, "password"> => {
  const user = localStorage.getItem(SESSION_CURRENT_USER_KEY);
  if (!user) return {} as Omit<NewUserProps, "password">;

  const { password, ...userWithoutPassword } = JSON.parse(user);
  return userWithoutPassword;
};

const useUsers = () => {
  const { decrypt } = useCrypto();

  let users: NewUserProps[] = getStoredUsers();

  const addUser = async (user: NewUserProps): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = users.some((u) => u.email === user.email);

        if (userExists) {
          reject("You have an account already!");
          return;
        }

        // Add new user
        users.push(user);

        // Update localStorage
        localStorage.setItem(SESSION_USERS_KEY, JSON.stringify(users));

        resolve("Added successfully, proceed to login!");
      }, 2000); // 2 seconds delay
    });
  };

  const login = async (email: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find((u) => u.email === email);

        if (!user) {
          reject("User not found!");
          return;
        }

        // Decrypt stored password before comparing
        const decryptedPassword = decrypt(user.password);

        if (decryptedPassword !== password) {
          reject("Incorrect password!");
          return;
        }

        localStorage.setItem(SESSION_CURRENT_USER_KEY, JSON.stringify(user));

        resolve("Login successful!");
      }, 2000); // Simulating API delay
    });
  };

  let currentUser = getCurrentUser();

  return { addUser, login, currentUser };
};

export default useUsers;
