
"use client";
import { Link, Button } from "@heroui/react";
import SVG from "react-inlinesvg";

export default function Navbar() {
  const isAuth = window.location.pathname.includes("auth");
  return (
    <nav className="flex z-40 fixed w-[100%] mx-auto bg-transparent p-6">
      <header className="z-40 h-[64px] w-[80%] px-10 mx-auto top-0 left-0 right-0 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]">
        <div className="flex gap-8">
          <Link href="/">
            <SVG src="./logo.svg" width={148} height={32}/>
          </Link>

          <div className={`flex gap-4 text-white ${isAuth ? "hidden" : ""}`}>
            <Link href="/" className="text-bold-headline2">
              Home
            </Link>

            <Link href="/" className="text-bold-headline2">
              New & Popular
            </Link>

            <Link href="/" className="text-bold-headline2">
              My List
            </Link>
          </div>
        </div>
        {
          isAuth ? 
          <div className={`flex gap-2`}>
          <Button as={Link} href="/auth" variant="flat" className="rounded-none bg-red-primary text-regular-smallbody">
            Sign In
          </Button>
        </div> :
        <div className="flex gap-4 items-center">
          <SVG src="./main/search.svg" width={24} height={24}/>

          <div className="avatar flex gap-2 items-center">
            <SVG src="./main/avatar.svg" width={30} height={30}/>
            <SVG src="./main/drop-down.svg" width={15} height={15}/>
          </div>
        </div>
        }
      </header>
    </nav>
  );
}
