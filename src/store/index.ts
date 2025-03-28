import { SESSION_USERS_KEY } from "@/static";

export const users =
  localStorage.getItem(JSON.stringify(SESSION_USERS_KEY)) || [];
