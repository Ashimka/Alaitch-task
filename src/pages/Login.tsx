import AuthForm from "@/components/login/AuthForm";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);
  return (
    <>
      <AuthForm />
    </>
  );
};

export default Login;
