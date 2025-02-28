import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

const Header = () => {
  return (
    <>
      <header className="flex justify-items-normal gap-2">
        <Button variant="outline">
          <Link to={"/"}>About as</Link>
        </Button>
        <Button variant="outline">
          <Link to={"/login"}>Sign in</Link>
        </Button>
      </header>
    </>
  );
};

export default Header;
