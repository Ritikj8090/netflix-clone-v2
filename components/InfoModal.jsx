import React, { useCallback, useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import PlayButton from "@/components/PlayButton";
import FavoriteButton from "@/components/FavoriteButton";
import useInfoModalStore from "@/hooks/useInfoModalStore";

import axios from "axios";


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0",
  },
};

const InfoModal = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const [data, setdata] = useState([]);

  const { movieId } = useInfoModalStore();

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
        options
      )
      .then((res) => {
        setdata(res.data);
      });
  }, [movieId]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }
  return (
    <div className="z-[7000]  overflow-y-hidden transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
        {data.length <= 0 ? (
          <>loading</>
        ) : (
          <>
            <div
              className={`${
                isVisible ? "scale-100" : "scale-0"
              } transform duration-300 relative z-[1000] flex-auto bg-zinc-900 drop-shadow-md`}
            >
              <div className="relative h-96">
                <video
                  poster={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                  autoPlay
                  muted
                  loop
                  src={data?.videoUrl}
                  className="w-full brightness-[60%] object-cover h-full"
                />
                <div
                  onClick={handleClose}
                  className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
                >
                  <XMarkIcon className="text-white w-6" />
                </div>
                <div className="absolute bottom-[10%] left-10">
                  <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                    {data?.title}
                  </p>
                  <div className="flex flex-row gap-4 items-center">
                    <PlayButton movieId={data?.id} />
                    <FavoriteButton movieId={data?.id} />
                  </div>
                </div>
              </div>

              <div className="px-12 py-8 relative">
                <div className="flex flex-row items-center gap-2 mb-8">
                  <p className="text-green-400 font-semibold text-lg">New</p>
                  <p className="text-white text-lg">{data?.runtime} min</p>
                  <p className="text-white text-lg flex gap-3">
                    {data.genres.map((index) => {
                      return <div key={index.id}>•{index.name}</div>;
                    })}
                  </p>
                </div>
                <p className="text-white text-lg">{data?.overview}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoModal;
