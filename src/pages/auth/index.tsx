/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import AuthLayout from "@/layouts/auth";
import LoginForm from "@/components/auth/login-form";

const AuthLogin = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default AuthLogin;
