'use client'
import useManageProfile from '@/hooks/useMangeProfile';
import Image from 'next/image'
import React, { useState } from 'react'
import { FaPen } from "react-icons/fa6";
import ChoiceProfileIcon from '@/components/ChoiceProfileIcon';
import useChoiceProfileIcon from '@/hooks/useChoiceProfileIcon';
import SelectedProfile from '@/hooks/SelectedProfile';
import axios from 'axios';
import useLoading from '@/hooks/useLoading';
import Loading from './Loading';
import { useRouter } from 'next/navigation';

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

const ManageProfiles = () => {
    const route = useRouter()
    const {closeModal} = useManageProfile()
    const{openIcon, isIcon} = useChoiceProfileIcon()
    const {Name, Img, UpdateName, UpdatedName, Selected, ExchangeIcon, Exchange} = SelectedProfile()
    const {openLoading, closeLoading, loading} = useLoading()
    
    const handleChange = (e) => {
        UpdateName(e.target.value)
    }

    const handleSubmit = async () => {
        try {
            openLoading()
            await axios.put('/api/manageProfile', {ex: Exchange, name: Exchange[0] + UpdatedName})
            .then(async() => {
              await axios.put('/api/profile', { name: Exchange[0] + UpdatedName})
            })
            .then(async() => {
    
              location.reload()
              closeLoading()
              closeModal()
            })
          } catch (error) {
            console.log('Error in Select icon', error)
          }
    }

    const handleDelete = async () => {
        openLoading()
        await axios.delete('/api/manageProfile', {data: {name:Exchange}})
        .then(() => {
            location.reload()
            closeLoading()
            closeModal()
        })
        
    }
  return (
    <div className=' absolute w-full h-full flex-col text-white flex items-center justify-center bg-neutral-900 z-[200]'>
        {loading && <Loading />}
        <div>
        <h1 className=' text-4xl text-left'>Edit Profile</h1>
        <hr  className=' border-neutral-600 py-3'/>
        <div className=' flex gap-4 '>
            <div>
                <div className=' relative'>

            <Image src={images[Img]} alt='' width={90} height={20} />
            <button onClick={() => openIcon()} className=' absolute bottom-1 left-1 bg-black bg-opacity-50 rounded-full p-1 text-xs' >
            <FaPen />
            </button>
                </div>
            </div>
            <div>
                <input 
                type="text" 
                className=' bg-neutral-500 w-full rounded-sm px-2 appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1'
                value={UpdatedName}
                onChange={handleChange}
                />
                <div className=' flex-col py-3 space-y-2'>
                    <div className=' text-neutral-300'>Language:</div>
                    <div className="border-2 px-1 w-fit">English</div>
                </div>
                <div className='space-y-2'>
                    <div className='text-neutral-300'>Game Handle:</div>
                    <p className='text-xs'>Your handle is a unique name that will be used for playing with other Netflix members across all Netflix Games.</p>
                    <input 
                    type="text"
                    className=' bg-neutral-500 rounded-sm px-2 w-full appearance-none focus:outline-none focus:ring-0 peer invalid:border-b-1'
                    value={'s'}
                     />
                </div>
                <div>

                </div>
            </div>
        </div>
       <hr className=' border-neutral-600 my-3'/>
        <div className=' text-start gap-5 flex'>
            <button onClick={handleSubmit} className=' bg-white hover:bg-red-600 hover:text-white text-black px-3'>Save</button>
            <button onClick={() => closeModal()} className=' border-neutral-400 border-[1px] text-neutral-400 hover:border-white hover:text-white px-3'>Cancel</button>
            <button onClick={handleDelete} className=' border-neutral-400 border-[1px] text-neutral-400 hover:border-white hover:text-white px-3'>Delete Profile</button>
        </div>
        </div>
       {isIcon && <ChoiceProfileIcon />}
    </div>
  )
}

export default ManageProfiles