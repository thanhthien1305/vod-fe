"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React, { useMemo } from 'react'

export default function Footer() {
    const pathname = usePathname(); 

    const isWatching = useMemo(() => {
        return pathname.includes("watch") || pathname.includes("room/");
    }, [pathname]);

    return (
        <footer className={`w-full mx-auto py-3 bg-[#333] min-h-[300px] flex flex-col justify-center relative ${isWatching && "hidden"}`}>
            <div className="mx-auto w-[80%] flex flex-col">
                <div className="text-white mb-4">
                    Questions? Contact us.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Link href="/#" className="text-white underline">
                        FAQ
                    </Link>
                    <Link href="/#" className="text-white underline">
                        Help Center
                    </Link>
                    <Link href="/#" className="text-white underline">
                        Terms of Use
                    </Link>
                    <Link href="/#" className="text-white underline">
                        Privacy
                    </Link>
                    <Link href="/#" className="text-white underline">
                        Cookie Preferences
                    </Link>
                    <Link href="/#" className="text-white underline">
                        Corporate Information
                    </Link>
                </div>
            </div>
        </footer>
    )
}
