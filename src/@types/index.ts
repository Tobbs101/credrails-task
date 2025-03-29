import { ReactNode } from "react";

export type NewUserProps = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  mobileNumber: string;
};

export type ResponseModal = {
  show: boolean;
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
};

export type NewFileProps = {
  startDate: Date;
  endDate: Date;
  dateType: string;
  dateUploaded: Date;
  file: { name?: string; size?: number; type?: string; base64: any } | null;
  recordCount: number;
};
