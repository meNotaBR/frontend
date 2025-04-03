import { Bell, Bookmark, Home, Mail, Search, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const MobileFooter = (props: Props) => {
    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-black w-full py-3 px-4">
            <div className="flex justify-between items-center max-w-md mx-auto">
                <Link href="/feed" className="flex items-center justify-center text-blue-500">
                    <Home className="h-6 w-6" />
                    <span className="sr-only">Home</span>
                </Link>
                <Link href="/search" className="flex items-center justify-center text-gray-400 hover:text-gray-300">
                    <Search className="h-6 w-6" />
                    <span className="sr-only">Search</span>
                </Link>
                <Link href="/notifications" className="flex items-center justify-center text-gray-400 hover:text-gray-300">
                    <Bell className="h-6 w-6" />
                    <span className="sr-only">Notifications</span>
                </Link>
                <Link href="/liked" className="flex items-center justify-center text-gray-400 hover:text-gray-300">
                    <Star className="h-6 w-6" />
                    <span className="sr-only">Bookmarks</span>
                </Link>
            </div>
        </footer>
    )
}

export default MobileFooter