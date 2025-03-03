import Cookies from "js-cookie";

export const getToken = () => {
  const token = Cookies.get("token");
  return token || null;
};

export const saveTokenStorage = (token: string) => {
  Cookies.set("token", token, {
    path: "/",
    sameSite: "Strict",
    expires: 10,
    secure: import.meta.env.VITE_MODE === "production",
  });
};

export const removeTokenFromStorage = () => {
  Cookies.remove("token");
};
