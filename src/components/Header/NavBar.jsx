"use client"
import { usePathname } from 'next/navigation'
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { AcmeLogo } from "./Acme.jsx";

import { useState } from "react";

export default function NavBar() {
  const menuItems = [
    ["Inference", "/predict"],
    ["Code (GitHub)", "https://github.com/Taha0229/UNetR_MC_Full-stack"],
    ["Contact", "/contact"],
  ];

  const pathname = usePathname()

  return (
    <Navbar disableAnimation isBordered>
      <NavbarContent className="sm:hidden" justify="">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="">
        <NavbarBrand>
          <AcmeLogo />

          <Link href="/" className="font-bold text-inherit">
            ACME
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <AcmeLogo />
          <Link href="/" className="font-bold text-inherit">
            ACME
          </Link>
        </NavbarBrand>
        <NavbarItem isActive={false}>
          <Link color="foreground" href="/predict">
            Inference
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://github.com/Taha0229/UNetR_MC_Full-stack"
            target="_blank"
            aria-current="page"
            color="foreground"
          >
            Code (GitHub)
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${index}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item[1]}
              target={index !== 1 ? "_blank" : "_target"}
              size="lg"
            >
              {item[0]}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
