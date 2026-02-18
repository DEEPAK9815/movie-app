import React, { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

const Navbar = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className={`fixed top-0 w-full h-16 p-5 px-10 z-50 transition-all duration-300 ease-in ${show ? 'bg-black' : 'bg-transparent bg-gradient-to-b from-black/80 to-transparent'}`}>
            <div className="flex justify-between items-center h-full">
                <div className="flex items-center gap-8">
                    <img
                        className="h-8 object-contain cursor-pointer"
                        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                        alt="Netflix Logo"
                    />
                    <ul className="hidden md:flex gap-5 text-sm text-gray-200">
                        <li className="cursor-pointer hover:text-white transition">Home</li>
                        <li className="cursor-pointer hover:text-white transition">TV Shows</li>
                        <li className="cursor-pointer hover:text-white transition">Movies</li>
                        <li className="cursor-pointer hover:text-white transition">New & Popular</li>
                        <li className="cursor-pointer hover:text-white transition">My List</li>
                    </ul>
                </div>

                <div className="flex items-center gap-5 text-white">
                    <Search className="w-5 h-5 cursor-pointer" />
                    <Bell className="w-5 h-5 cursor-pointer" />
                    <div className="flex items-center gap-2 cursor-pointer">
                        <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center">
                            <User className="w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
