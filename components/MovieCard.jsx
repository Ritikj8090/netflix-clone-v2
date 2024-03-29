import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";


import useInfoModalStore from "@/hooks/useInfoModalStore";
import axios from "axios";
import FavoriteButton from "./FavoriteButton";



const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0",
  },
};

const MovieCard = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModalStore();

  const redirectToWatch = useCallback(
    () => router.push(`/watch/${data.id}`),
    [router, data.id]
  );

  return (
    <div className="group relative">
      <img
        onClick={redirectToWatch}
        src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
        alt="Movie"
        draggable={false}
        className="
        cursor-pointer
        
        transition
        duration
        shadow-xl
        rounded-md
        delay-300
        w-full
        relative object-fill
      "
      />

      <div className="  bg-neutral-800 p-2 w-full bottom-0 left-0 opacity-0 transition duration-200 delay-300 group-hover:opacity-100 absolute z-[500]">
        <div className="flex flex-row items-center gap-3 mt-2">
          <div
            onClick={redirectToWatch}
            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
          >
            <PlayIcon className="text-black w-4 lg:w-6" />
          </div>
          <FavoriteButton movieId={String(data.id)} />
          <div
            onClick={() => openModal(data?.id)}
            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
          >
            <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
          </div>
        </div>
        <div  className="flex justify-between w-full mt-3  items-center">
        <p className="text-green-400 font-semibold ">
          New <span className="text-white">2023</span>
        </p>
          <span className=" text-neutral-500 h-full border-neutral-300 border-[1px] px-1">U/A 17+</span>
          <span className=" text-neutral-400 ">2h 19m</span>
          <span className=" text-neutral-500 h-full border-neutral-300 border-[1px] px-1">HD</span>
        </div>
        <div className="flex justify-between w-full mt-3 text-neutral-400  items-center">
        •Horror •Drama •Nuduty
        </div>
        <div className="flex flex-row mt-4 gap-2 items-center">
          <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
          <p>{data.genre}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

/*    <div className="group min-w-[250px] top-0 left-0   bg-zinc-900 col-span absolute z-[1000]">
      <div className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:top-0
        group-hover:left-0
        group-hover:opacity-100
      ">
        <img onClick={redirectToWatch} src={data.thumbnailUrl} alt="Movie" draggable={false} className="
          cursor-pointer
          object-cover
          transition
          duration
          shadow-xl
          rounded-t-md
          w-full
          h-[12vw]
        " />
        <div className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          ">
          <div className="flex flex-row items-center gap-3">
            <div onClick={redirectToWatch} className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300">
              <PlayIcon className="text-black w-4 lg:w-6" />
            </div>
            <FavoriteButton movieId={data.id} />
            <div onClick={() => openModal(data?.id)} className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
              <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center"> 
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{data.genre}</p>
          </div>
        </div>
      </div>
    </div> */
