/* eslint-disable prettier/prettier */
"use client";
import { Link, Button } from "@heroui/react";
import SVG from "react-inlinesvg";

export default function Navbar() {
  return (
    <nav className="flex z-40 h-[64px] w-[80%] mx-auto bg-transparent" style={{height: "64px"}}>
      <header className="z-40 h-[64px] fixed top-0 left-0 right-0 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]">
        <div className="flex gap-8">
          <Link href="/">
            <SVG src="./logo.svg" width={148} height={32}/>
          </Link>
        </div>
        <div className="flex gap-2">
          <Button as={Link} href="/auth" variant="flat" className="rounded-none bg-red-primary text-regular-smallbody">
            Sign In
          </Button>
        </div>
      </header>
    </nav>
  );
}
