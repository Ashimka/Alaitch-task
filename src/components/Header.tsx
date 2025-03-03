import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();

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
            <Button variant="outline" size="sm">
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
