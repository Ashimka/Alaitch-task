import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <header className="flex justify-items-normal gap-2">
        <Button variant="outline">About as</Button>
        <Button variant="outline">Sign in</Button>
      </header>
    </>
  );
};

export default Header;
