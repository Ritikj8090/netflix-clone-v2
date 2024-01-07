import { signOut } from "next-auth/react";
import React from "react";
import { FaPen } from "react-icons/fa";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoIosHelpCircleOutline } from "react-icons/io";
import manage from "@/public/svg/manage.svg";
import account from "@/public/svg/account.svg";
import help from "@/public/svg/help.svg";
import transfer from "@/public/svg/transfer.svg";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import Link from "next/link";

const images = [
  '/images/1.png',
  '/images/2.png',
  '/images/3.png',
  '/images/4.png',
  '/images/5.png',
  '/images/6.png',
  '/images/7.png',
  '/images/8.png',
  '/images/9.png',
]

const AccountMenu = ({ visible, name }) => {
  const { currentUser } = useCurrentUser();

  if (!visible) {
    return null;
  }

  console.log(name);

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          {typeof name === "undefined" ? (
            <></>
          ) : (
            <div className=" flex-col space-y-3">
              {name.map((pro) => {
                return (
                  <div key={pro} className="group flex items-center gap-3">
                    <img
                      className="w-8 rounded-md group-hover:border-[2px]"
                      src={images[Number(pro[0])]}
                      alt=""
                    />
                    <p className="text-white text-sm group-hover:underline">
                      {pro.substring(1)}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div className="text-white px-3 space-y-3">
        <Link href={'/manageProfiles'} className=" flex gap-3 group">
          <Image src={manage} alt="manage" />
          <span className="group-hover:underline">Manage Profile</span>
        </Link>
        <Link href={'/manageProfiles'} className=" flex gap-3 group">
          <Image src={transfer} alt="manage" className="" />
          <span className="group-hover:underline">Transfer Profile</span>
        </Link>
        <div className=" flex gap-3 group">
          <Image src={account} alt="manage" />
          <span className="group-hover:underline">Account</span>
        </div>
        <div className=" flex gap-3 group">
          <Image src={help} alt="manage" />
          <span className="group-hover:underline">Help Center</span>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div
        onClick={() => signOut()}
        className="px-3 text-center text-white text-sm hover:underline"
      >
        Sign out of Netflix
      </div>
    </div>
  );
};

export default AccountMenu;
