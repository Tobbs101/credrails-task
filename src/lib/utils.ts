/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const responseModalDefaults = {
  show: false,
  title: "",
  info: "",
  primaryBtnLabel: "",
};

export function formatDate(date: Date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12; // Convert hour to 12-hour format

  return `${day} ${month}, ${year} ${hour}:${minute} ${period}`;
}

export const trimMessage = (message: string, maxLength: number) => {
  if (message.length <= maxLength) {
    return message;
  }
  return `${message.slice(0, maxLength)}...`;
};

export const formatFileSize = (sizeInBytes: number): string => {
  if (!sizeInBytes) return "";
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else if (sizeInBytes < 1024 * 1024 * 1024) {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};
