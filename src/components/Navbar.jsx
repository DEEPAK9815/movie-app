import React, { useState, useEffect } from 'react';
import { Search, Bell } from 'lucide-react';

const Navbar = () => {
    const [show, handleShow] = useState(false);

    useEffect(() => {
        const scrollHandler = () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else {
                handleShow(false);
            }
        };
        window.addEventListener("scroll", scrollHandler);
        return () => window.removeEventListener("scroll", scrollHandler);
    }, []);

    return (
        <div className={`fixed top-0 w-full h-16 p-5 flex justify-between items-center z-50 transition-all duration-500 ease-in ${show ? 'bg-[#111]' : 'bg-transparent'}`}>
            <div className="flex items-center gap-8 ml-5">
                <img
                    className="h-6 md:h-8 object-contain cursor-pointer"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                    alt="Netflix Logo"
                />
                <ul className="hidden md:flex gap-6 text-sm text-[#e5e5e5] font-light">
                    <li className="font-bold cursor-pointer">Home</li>
                    <li className="cursor-pointer hover:text-[#b3b3b3] transition">TV Shows</li>
                    <li className="cursor-pointer hover:text-[#b3b3b3] transition">Movies</li>
                    <li className="cursor-pointer hover:text-[#b3b3b3] transition">New & Popular</li>
                    <li className="cursor-pointer hover:text-[#b3b3b3] transition">My List</li>
                </ul>
            </div>

            <div className="flex items-center gap-6 mr-5 text-white">
                <Search className="w-5 h-5 cursor-pointer hover:text-[#b3b3b3] transition" />
                <p className="hidden md:block cursor-pointer hover:text-[#b3b3b3] transition text-sm">Kids</p>
                <Bell className="w-5 h-5 cursor-pointer hover:text-[#b3b3b3] transition" />
                <img
                    className="h-8 w-8 rounded cursor-pointer"
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                    alt="User Avatar"
                />
            </div>
        </div>
    );
};

export default Navbar;
