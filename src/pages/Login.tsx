import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    document.title = "Sign in";
  }, []);
  return <div>Login</div>;
};

export default Login;
