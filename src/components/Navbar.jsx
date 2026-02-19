import React, { useState, useEffect } from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 timing-ease-in-out ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="flex items-center justify-between px-4 md:px-12 py-4">
                <div className="flex items-center gap-8">
                    {/* Logo - Text for now, or could use an image URL if one existed */}
                    <h1 className="text-[#E50914] text-2xl md:text-3xl font-bold cursor-pointer font-sans tracking-tight">NETFLIX</h1>

                    <ul className="hidden md:flex gap-6 text-sm text-[#e5e5e5]">
                        <li className="font-medium cursor-pointer hover:text-gray-300 transition">Home</li>
                        <li className="cursor-pointer hover:text-gray-300 transition">TV Shows</li>
                        <li className="cursor-pointer hover:text-gray-300 transition">Movies</li>
                        <li className="cursor-pointer hover:text-gray-300 transition">New & Popular</li>
                        <li className="cursor-pointer hover:text-gray-300 transition">My List</li>
                    </ul>
                </div>

                <div className="flex items-center gap-6 text-white">
                    <Search className="w-5 h-5 cursor-pointer hover:opacity-80" />
                    <span className="hidden md:block text-sm cursor-pointer hover:opacity-80">KIDS</span>
                    <Bell className="w-5 h-5 cursor-pointer hover:opacity-80" />
                    <div className="flex items-center gap-2 cursor-pointer group">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                            alt="Profile"
                            className="w-8 h-8 rounded"
                        />
                        <div className="w-0 h-0 border-l-4 border-l-transparent border-t-[6px] border-t-white border-r-4 border-r-transparent group-hover:rotate-180 transition md:block hidden"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
