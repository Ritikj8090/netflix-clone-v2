"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { IoMdClose } from "react-icons/io";


import AccountMenu from "@/components/AccountMenu";
import MobileMenu from "@/components/MobileMenu";
import NavbarItem from "@/components/NavbarItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import Image from "next/image";
import netflix from "@/public/svg/netflix.svg";
import Link from "next/link";

const TOP_OFFSET = 66;

const Visible = () => {
  return (
    <div className="my-20 text-white absolute w-full h-full bg-opacity-80 bg-black z-[300] ">
      <div className="flex flex-wrap justify-center">
        c
      </div>
    </div>
  )
}

const Navbar = () => {
  const [seachValue, setseachValue] = useState('')
  const [setsearchVisible, setSetsearchVisible] = useState(false)
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [searchResultVisible, setSearchResultVisible] = useState(false)

  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const User = await axios.get("/api/current");
      setCurrentUser(User.data);
    };
    if (currentUser.length <= 0) fetch();
  }, [currentUser]);

  const images = [
    "/images/1.png",
    "/images/2.png",
    "/images/3.png",
    "/images/4.png",
    "/images/5.png",
    "/images/6.png",
    "/images/7.png",
    "/images/8.png",
    "/images/9.png",
  ];

  

  const handleChange = (e) => {
    setseachValue(e.target.value)
    console.log(seachValue)
    if(seachValue.length >= 1){
      setSearchResultVisible(true)
    }
    else{
      setSearchResultVisible(false)
    }
  }
  return (
    <>
    <nav className="w-full fixed z-40">
      
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            className=""
            alt="Logo"
            width={100}
            height={30}
          />
        </Link>
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem url="/" label="Home" active />
          <NavbarItem url="/series" label="Series" />
          <NavbarItem url="/films" label="Films" />
          <NavbarItem url="/new" label="New & Popular" />
          <NavbarItem url="/mylist" label="My List" />
          <NavbarItem url="/language" label="Browse by Languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <ChevronDownIcon
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center relative">
          
          <div className="text-gray-200 flex items-center group hover:text-gray-300 cursor-pointer relative transition">
            {<MagnifyingGlassIcon className={`w-6 ${setsearchVisible ? ' opacity-5' : ''}`} onClick={() => setSetsearchVisible(true)}/>}
            <div className=" absolute -top-1/5 right-0 flex items-center">
              <input 
              type="text" 
              name="search"
              className={`${setsearchVisible ? 'border-[1px] w-72  px-2 py-2' : ''} w-0  ease-in-out duration-500 bg-black bg-opacity-70 flex items-center appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1 `}
              placeholder="Movies, TV Shows"
              value={seachValue}
              onChange={handleChange}
               />
              {setsearchVisible && <IoMdClose className=" absolute  right-2 text-2xl flex items-center top-2" onClick={() => setSetsearchVisible(false)}/>}

            </div>
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BellIcon className="w-6" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              {currentUser.length <= 0 ||
              typeof currentUser?.activeProfile === "undefined" ? (
                <></>
              ) : (
                <Image
                  src={images[Number(currentUser?.activeProfile[0])]}
                  alt=""
                  width={30}
                  height={30}
                />
              )}
            </div>
            <ChevronDownIcon
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu
              visible={showAccountMenu}
              name={currentUser?.profiles}
            />
          </div>
        </div>
      </div>
    </nav>
    {searchResultVisible && <Visible />}
    </>
  );
};

export default Navbar;
