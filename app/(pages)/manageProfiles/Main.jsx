'use client'

import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import Image from "next/image";
import add from '@/public/images/add.webp'
import axios from "axios";
import ProfileCreate from "../../../components/ProfileCreate";
import useManageProfile from "@/hooks/useMangeProfile"
import { FaPen } from "react-icons/fa6";
import ManageProfiles from '@/components/ManageProfiles';
import SelectedProfile from '@/hooks/SelectedProfile';


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



const UserCard = ({ name, img }) => {
  const index = Number(img)
  const imgSrc = images[index];

  return (
    <div className="group flex-row  mx-auto relative">
        <div className=" rounded-md flex items-center justify-center  group-hover:cursor-pointer  overflow-hidden">
          <Image draggable={false} className="w-max h-max object-contain border-2 border-transparent group-hover:border-white rounded-lg" width={80} height={60} src={imgSrc} alt="" />
          <div className="bg-black w-full h-full absolute bg-opacity-60">
            <div className="w-full h-full flex justify-center items-center">
            <FaPen className="text-white text-2xl flex justify-center items-center z-[100]"/>
            </div>
        </div>
        </div>
      <div className="mt-4 flex-nowrap absolute w-full justify-center text-gray-400 text-center group-hover:text-white">{name}</div>
   </div>
  );
}

const App = () => {
  const router = useRouter();
  const [profile, setprofile] = useState([])
  const [CurrentUser, setCurrentUser] = useState([])
  
  const FetchUser = async () => {
    try {
      const user = await useCurrentUser()
      setCurrentUser(user.data)
      setprofile(CurrentUser.profiles)
    } catch (error) {
      console.log(error)
    }
  }
  FetchUser()
 
  const {openModal, isOpen} = useManageProfile()
  const { selectedName, selectedImg, UpdateName, ExchangeIcon } = SelectedProfile()



  

  const ProfileClick = async (pro) => {
    console.log("name", pro)
    await axios.put('/api/profile', {name:pro})
    router.push('/');
  }

  


  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
        <div className="flex justify-center items-center gap-8 mt-10">
          {
            typeof(profile) === 'undefined' ? <></> : <>
            {
              profile.map((pro) => {
                return(
                  <div key={pro}><div className="flex items-center relative" onClick={() => {selectedName(pro.substring(1)); UpdateName(pro.substring(1)); selectedImg(pro[0]); ExchangeIcon(pro); openModal()}}>
                  <UserCard name={pro.substring(1)} img={pro[0]} />
                  
                  
                </div></div>
                )
              })
              
            }
            </>
          }
        </div>
        <div className="  flex justify-center pt-20">
          <button onClick={() => router.push("/profiles")} className="flex  bg-neutral-300 hover:bg-red-600 hover:text-white px-4 py-1 ">
            Done
          </button>
        </div>
      </div>
      {isOpen && <ManageProfiles />}
    </div>
  );
}

export default App;
