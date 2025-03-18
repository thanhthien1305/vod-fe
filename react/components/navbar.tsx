/* eslint-disable prettier/prettier */
"use client";
import { Link, Button } from "@heroui/react";
import SVG from "react-inlinesvg";

export default function App() {
  return (
    <nav className="flex z-40 h-auto items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-background/70 w-full">
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]">
        <div className="flex gap-8">
          <div>
          <SVG src="./logo.svg"/>
            <p className="font-bold text-inherit">ACME</p>
          </div>
          <div className="flex gap-4 items-center">
            <div>
              <Link color="foreground" href="#">
                Features
              </Link>
            </div>
            <div >
              <Link aria-current="page" href="#">
                Customers
              </Link>
            </div>
            <div>
              <Link color="foreground" href="#">
                Integrations
              </Link>
            </div>
            <div className="hidden lg:flex">
              <Link href="#">Login</Link>
            </div>

          </div>
        </div>
        <div>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </div>
      </header>
    </nav>
  );
}
