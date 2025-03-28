/* eslint-disable @typescript-eslint/no-explicit-any */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function formatLocaleDate(date: Date) {
  // Get components of the date
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  let hour = date.getHours();
  const minute = ("0" + date.getMinutes()).slice(-2);
  const ampm = hour >= 12 ? "pm" : "am";

  // Convert hour to 12-hour format
  hour = hour % 12;
  hour = hour ? hour : 12;

  // Format the date string
  const formattedDate = `${month}/${day}/${year}, ${hour}:${minute}${ampm}`;

  return formattedDate;
}

export const getColorSchemeForStatus = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return "bg-[#dcffec7c] text-[#48D38A]";
    case "deactivated":
      return "bg-[#FFDBDB4D] text-[#F7685B]";
    case "suspended":
      return "bg-[#FFDBDB4D] text-[#F7685B]";
    case "pending":
      return "bg-[#FFF5DB] text-[#FFC83E]";
  }
};

export const formatCurrencyNGN = (value: number | string) => {
  const nigerianNaira = new Intl.NumberFormat("en-ng", {
    style: "currency",
    currency: "NGN",
  });

  return nigerianNaira.format(value as number);
};

export const trimMessage = (message: string, maxLength: number) => {
  if (message.length <= maxLength) {
    return message;
  }
  return `${message.slice(0, maxLength)}...`;
};

export function addSpaceBetweenLowerAndUpper(str: string): string {
  if (!str) return "";
  return str.replace(/_/g, " ").replace(/([a-z])([A-Z])/g, "$1 $2");
}

export function replaceUnderscoreWithSpace(str: string): string {
  if (!str) return "";
  return str.replace(/_/g, " ");
}

export function deepCompare(obj1: any, obj2: any): any {
  // Check if both arguments are objects
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return obj1 === obj2;
  }

  const diff: any = {};

  // Get keys from both objects
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // Find keys that are unique to obj1
  obj1Keys.forEach((key) => {
    if (!obj2Keys.includes(key)) {
      diff[key] = {
        oldValue: obj1[key],
        newValue: undefined,
      };
    }
  });

  // Find keys that are unique to obj2
  obj2Keys.forEach((key) => {
    if (!obj1Keys.includes(key)) {
      diff[key] = {
        oldValue: undefined,
        newValue: obj2[key],
      };
    }
  });

  // Find keys that exist in both objects
  obj1Keys.forEach((key) => {
    if (obj2Keys.includes(key)) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (typeof value1 === "object" && typeof value2 === "object") {
        const nestedDiff = deepCompare(value1, value2);
        if (Object.keys(nestedDiff).length > 0) {
          diff[key] = nestedDiff;
        }
      } else if (value1 !== value2) {
        diff[key] = {
          oldValue: value1,
          newValue: value2,
        };
      }
    }
  });

  return diff;
}

export function generateSearchParams(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();

  // Iterate over the keys of the params object
  Object.keys(params).forEach((key) => {
    // Get the value corresponding to the key
    const value = params[key];

    // Append the key-value pair to the URLSearchParams object
    searchParams.append(key, String(value));
  });

  // Return the search parameter string
  return (searchParams.size > 0 ? "?" : "") + searchParams.toString();
}

export const getDateInfo = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  lastDayOfMonth.setHours(23, 59, 59, 999);

  return {
    today,
    lastDayOfMonth,
  };
};
