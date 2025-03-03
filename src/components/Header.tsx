import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

import { Button } from "./ui/Button";
import { IApiResponse, ILogoutData } from "@/types";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, accessToken, logout } = useAuth();

  const handleLogout = async () => {
    const isLogout = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/logout?token=${accessToken}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // method: "DELETE",
      }
    );
    const isLogouted: IApiResponse<ILogoutData> = await isLogout.json();

    if (isLogouted.success) {
      logout();
      navigate("/");
    }
  };

  return (
    <>
      <header className="flex justify-items-normal gap-2">
        <Button variant="outline" size="sm">
          <Link to={"/"}>About as</Link>
        </Button>
        {isAuthenticated ? (
          <>
            <Button variant="outline" size="sm">
              <Link to={"/profile"}>Profile</Link>
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Sign out
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm">
            <Link to={"/login"}>Sign in</Link>
          </Button>
        )}
      </header>
    </>
  );
};

export default Header;
