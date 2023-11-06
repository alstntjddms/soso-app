import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Link,
  Button,
} from "@nextui-org/react";
import Menu from "./Menu";
// import {AcmeLogo} from "./AcmeLogo.jsx";

export default function App() {
  return (
    <Navbar height={"40px"}>
      <NavbarBrand>
        <p className="font-bold text-inherit">Test111</p>
      </NavbarBrand>
    </Navbar>
  );
}
