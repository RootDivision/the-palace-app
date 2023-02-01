import type { FC } from "react";
import CustomLink from "./customLink";

const Navbar: FC = () => {
  return (
    <nav className="flex bg-gray-800 p-3">
      <div className="flex-grow">
        <CustomLink url="/" text="Home" />
        <CustomLink url="/about" text="About" />
      </div>
      <div>
        <CustomLink url="/signin" text="Admin" />
      </div>
    </nav>
  );
};

export default Navbar;
