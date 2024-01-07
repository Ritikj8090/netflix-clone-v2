'use client'
import useProfileVisible from "@/hooks/useProfileVisible";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import useLoading from '@/hooks/useLoading';
import Loading from "./Loading";


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

const ProfileCreate = ({number}) => {
   const {isOpen, closeModal} = useProfileVisible()
    const [Name, setName] = useState('')
   const handleChange = (e) => {
    setName(e.target.value)
  }
  const num = String(number)
  const route = useRouter()
  const {loading, openLoading, closeLoading} = useLoading()
  const handleSubmit = async () => {
    console.log(loading)
    openLoading()
    await axios.post('/api/profile', {name: num+Name})
    await axios.put('/api/profile', {name: num+Name})
    .then(async () => {

      route.push('/')
      closeLoading()
      closeModal()
      
    })
    
  }
   
  return (
    <div className={` ${isOpen ? 'flex' : 'hidden'} bg-neutral-900 text-white top-0 left-0 absolute w-full h-screen flex justify-center items-center`}>
      {loading && <Loading />}
      <div className=" space-y-4">
        <div className="text-lg font-semibold md:text-2xl">Add Profile</div>
        <p className=" text-neutral-600">
          Add a profile for another watching Netflix.
        </p>
        <div className=" border-b-[1px] border-neutral-600"></div>
        <div className=" flex gap-3 items-center">
          <Image src={images[number]} width={80} height={20} alt="profile" />
          <input
            type="text"
            name="name"
            value={Name}
            onChange={handleChange}
            placeholder="Name"
            className="p-2 bg-neutral-500 rounded-sm h-full"
          />
          <div className="flex items-center gap-1">
            <input type="checkbox" id="child" />
            <label htmlFor="child">Child?</label>
          </div>
        </div>
        <div className=" border-b-[1px] border-neutral-600"></div>
        <div className=" flex gap-3">
          <button onClick={handleSubmit} className=" rounded-sm bg-white py-1 px-2 text-black">
            Continue
          </button>
          <button onClick={() => closeModal()} className={` rounded-sm bg-transparent text-neutral-600 border-[1px] border-neutral-500 py-1 px-2`}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCreate;
