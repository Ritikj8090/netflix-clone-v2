import React from "react";
import loading from '@/public/svg/loading.svg';
import Image from "next/image";

const Loading = () => {
  return (
    <div className=" bg-black top-0 left-0 bg-opacity-50 w-full h-full absolute items-center justify-center z-[200] text-white">
      <div className=" flex items-center justify-center w-full h-full">
        <Image src={loading} alt="loading" />
      </div>
    </div>
  );
};

export default Loading;
