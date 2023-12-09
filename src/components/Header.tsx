import * as React from "react";
import Logo from "../assets/icons/Logo.svg";
import { Button } from "../modules/Button";
import { scrollToAnchor } from "../utils/scrollToAnchor";

export const Header = () => {
  return (
    <header>
      <div className="container">
        <nav className="flex justify-between py-[13px]">
          <a href="/">
            <img src={Logo} alt="Logo" />
          </a>

          <ul className="flex gap-x-[10px]">
            <li className="w-[100px]">
              <Button onClick={() => scrollToAnchor('users')}>Users</Button>
            </li>
            <li>
              <Button onClick={() => scrollToAnchor('regForm')}>Sign up</Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
