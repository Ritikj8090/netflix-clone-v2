import Image from "next/image";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import useChoiceProfileIcon from '@/hooks/useChoiceProfileIcon';
import useSelectedIcon from '@/hooks/useSelectedIcon';
import SelectedIcon from '@/components/SelectedIcon';
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

const ChoiceProfileIcon = () => {
    const {closeIcon} = useChoiceProfileIcon()
    const {isSelected, openSelected} = useSelectedIcon()
    const {selectedIcon, Selected, Img, Name} = SelectedProfile()

  return (
    <div className=" absolute bg-black w-full h-full p-16">
        
      <div>
        <div className=" flex justify-between items-center">
          <div className="flex items-center justify-center gap-3" >
            <button onClick={() => closeIcon()}><MdArrowBack className=" text-4xl"/></button>
            <div  className=" font-bold">
              <p>Edit Profile</p>
              <p>Choose a profile icon.</p>
            </div>
          </div>
          <div  className=" flex items-center justify-center gap-3">
            <p>{Name}</p>
            <div><Image src={images[Img]} alt="profile" width={50} height={50} className=" rounded-lg" /></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 mt-20">
            {images.map((img, index) => {
                return <div key={img} className="" onClick={() => {selectedIcon(String(index));openSelected()}}>
                <Image src={img} alt="profile" width={90} height={50} className=" rounded-lg hover:border-2 cursor-pointer" />
            </div>
            })}
        </div>
      </div>
            {isSelected && <SelectedIcon />}

    </div>
  );
};

export default ChoiceProfileIcon;
