import Image from 'next/image'
import React from 'react'
import { MdArrowForwardIos } from "react-icons/md";
import useSelectedIcon from '@/hooks/useSelectedIcon';
import SelectedProfile from '@/hooks/SelectedProfile';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useLoading from '@/hooks/useLoading';
import Loading from './Loading';

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

  
  const SelectedIcon = () => {
    const route = useRouter()
    const {closeSelected} = useSelectedIcon()

    const{Selected, Img, UpdatedName, Exchange} = SelectedProfile()
    const {loading, openLoading, closeLoading} = useLoading()

    const handleSubmit = async () => {
      try {
        openLoading()
        await axios.put('/api/manageProfile', {ex: Exchange, name: Selected + UpdatedName})
        .then(async() => {
          await axios.put('/api/profile', { name: Selected + UpdatedName})
        })
        .then(async() => {

          route.push('/')
          closeLoading()
        })
      } catch (error) {
        console.log('Error in Select icon', error)
      }
      console.log(Selected + UpdatedName)
    }
  return (
    <div className=' absolute bg-black w-full h-full left-0 top-0 flex items-center justify-center'>
        {loading && <Loading />}
        <div>
            <h1 className=' flex justify-center'>Change profile icon?</h1>
            <hr className=' border-neutral-700 my-5' />
            <div className=' gap-3 flex items-center'>
                <Image src={images[Img]} alt='prog' width={80} height={50} className=' rounded-lg hover:border-2' />
                <MdArrowForwardIos  className=' font=bold text-2xl'/>

                <Image src={images[Selected]} alt='prog' width={80} height={50} className=' rounded-lg hover:border-2' />
            </div>
            <hr className=' border-neutral-700 my-5' />
            <div className=' justify-center gap-5 flex'>
            <button onClick={handleSubmit} className=' bg-white hover:bg-red-600 hover:text-white text-black px-3'>Let{"'"}s Do it</button>
            <button onClick={() => closeSelected()} className=' border-neutral-400 border-[1px] text-neutral-400 hover:border-white hover:text-white px-3'>Not Yet</button>
        </div>
        </div>
    </div>
  )
}

export default SelectedIcon