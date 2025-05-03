"use client";
import { usePathname } from "next/navigation";
import { Link, Button, Avatar } from "@heroui/react";
import SVG from "react-inlinesvg";
import DropdownUser from "./dropdown-user";
import { useMemo } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const isAuth = useMemo(() => pathname.includes("auth"), [pathname]);
  const isWatching = useMemo(() => pathname.includes("watch"), [pathname]);

  return (
    <nav className={`flex z-40 fixed w-[100%] mx-auto bg-transparent p-6 ${isWatching && "hidden"}`}>
      <header className="z-40 h-[64px] w-[80%] px-10 mx-auto top-0 left-0 right-0 flex gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)]">
        <div className="flex gap-8">
          <Link href="/">
            <SVG src="./logo.svg" width={148} height={32} />
          </Link>

          <Link href="/room" className="regular-headline1 text-white">
            Room
          </Link>
        </div>
        {isAuth ? (
          <div className="flex gap-2">
            <Button as={Link} href="/auth" variant="flat" className="rounded-none bg-red-primary text-regular-smallbody">
              Sign In
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <SVG src="./main/search.svg" width={24} height={24} />
            <div className="avatar flex gap-2 items-center">
              <DropdownUser />
            </div>
          </div>
        )}
      </header>
    </nav>
  );
}
