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
import useProfileVisible from "@/hooks/useProfileVisible";
import { FaPen } from "react-icons/fa6";
import Loading from "@/components/Loading";
import useLoading from "@/hooks/useLoading";



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
          <Image draggable={false} className="w-max rounded-lg h-max object-contain border-2 border-transparent group-hover:border-white" width={80} height={60} src={imgSrc} alt="" />
        </div>
      <div className="mt-4 flex-nowrap absolute w-full justify-center text-gray-400 text-center group-hover:text-white">{name}</div>
   </div>
  );
}

const App = () => {
  const {loading, openLoading, closeLoading} = useLoading()
  const router = useRouter();
  const [profile, setprofile] = useState([])
  const [CurrentUser, setCurrentUser] = useState([])
  
  const FetchUser = async () => {
    try {
      const user = await useCurrentUser()
      setCurrentUser(user.data)
      setprofile(CurrentUser.profiles)
      console.log(user.data)
    } catch (error) {
      console.log(error)
    }
  }
  FetchUser()
 
  const {openModal, isOpen} = useProfileVisible()

  

  const ProfileClick = async (pro) => {
    console.log("name", pro)
    await axios.put('/api/profile', {name:pro})
    router.push('/');
    closeLoading()
  }

  


  return (
    <div className="flex items-center h-full justify-center">
      {loading && <Loading />}
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">Who&#39;s watching?</h1>
        <div className="flex justify-center items-center gap-8 mt-10">
          {
            typeof(profile) === 'undefined' ? <></> : <>
            {
              profile.map((pro) => {
                return(
                  <div key={pro}><div className="flex items-center " onClick={() => {ProfileClick(pro); openLoading()}}>
                  <UserCard name={pro.substring(1)} img={pro[0]} />
                
                  
                </div></div>
                )
              })
              
            }
            </>
          }
          {profile?.length < 4  && (
            <button onClick={() => openModal()} className="text-white relative group">
            <Image src={add} alt="add" className="w-24 h-24 object-fill relative rounded-lg hover:bg-neutral-200 "   />
            <div className="text-gray-400 text-center w-full absolute mt-4 group-hover:text-white">Add New</div>
            </button>
          )}
            <ProfileCreate number={profile?.length} />
        </div>
        <div className="  flex justify-center pt-20">
          <button onClick={() => router.push("/manageProfiles")} className="flex text-neutral-500 border-neutral-500 hover:text-white hover:border-white px-4 py-1 border-2">
            Manage Profiles
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default App;
