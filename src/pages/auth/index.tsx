/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import { useNavigate } from "react-router-dom";

import AuthLayout from "@/layouts/auth";

const AuthLogin = () => {
  const navigate = useNavigate();

  return <AuthLayout></AuthLayout>;
};

export default AuthLogin;
