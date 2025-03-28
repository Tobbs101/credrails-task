/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import CookieManager from "./";

const useCookieManager = (key = null) => {
  const [cookieManager] = useState(new CookieManager());
  const [cookieValue, setCookieValue] = useState<string | null>(null);

  useEffect(() => {
    if (key) {
      const value = cookieManager.getCookie(key);
      setCookieValue(value);
    }
  }, [cookieManager, key]);

  const getAllCookies = () => cookieManager.getAllCookies();
  const getDomainCookies = (domain: any) =>
    cookieManager.getDomainCookies(domain);

  return key
    ? cookieValue
    : { ...cookieManager, getAllCookies, getDomainCookies };
};

export default useCookieManager;
