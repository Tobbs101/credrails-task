import { ReactNode } from "react";

export interface AppUser {
  email: string;
  fullName: string;
  picture: string;
  role: string;
  teams: string[];
}

export interface NewUserProps {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  mobileNumber: string;
}

export type ResponseModal = {
  show: boolean;
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
};
