import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="w-full mx-auto py-3 bg-[#333] min-h-[300px] flex flex-col justify-center relative">
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
