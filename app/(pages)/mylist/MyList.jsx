"use client";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import useCurrentUser from "@/hooks/useCurrentUser";
import useLoading from "@/hooks/useLoading";
import axios from "axios";
import React, { useEffect, useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0",
  },
};

const MyList = () => {
  const [data, setdata] = useState(false);
  const FavItems = [{}];
  const FetchUser = async () => {
    const CurrentUser = useCurrentUser();
    return CurrentUser;
  };

  useEffect(() => {
    const time = setTimeout(() => {
      setdata(true)
    }, 5000);
    return () => {clearTimeout(time)}
  })

  FetchUser().then(async (res) => {
    const fav = res?.data?.favoriteIds;
    console.log(fav);
    fav?.map(async (f) => {
      await axios( `https://api.themoviedb.org/3/movie/${f}?language=en-U`, options)
      .then((res) => {
        FavItems.push(res?.data);
      })
    })
  });

  return (
    <div className=" text-white py-20 px-16 flex justify-center">
      {!data ? <>Loading...</> :
        <>
          <div className=" relative">
            <p className="text-white mt-16 text-md md:text-xl lg:text-2xl font-semibold mb-4">
              Favorites
            </p>
            <div id="main" className="flex gap-2 flex-wrap">
              {FavItems.length}
            </div>
          </div>
        </>
      }
    </div>
  );
};

export default MyList;
