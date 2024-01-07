'use client'

import React, { useEffect, useRef, useState } from 'react';
import { isEmpty } from 'lodash';
import MovieCard from '@/components/MovieCard';
import { FaCircleArrowLeft, FaCircleArrowRight  } from "react-icons/fa6";
import axios from 'axios';


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0'
  }
};

const MovieList= ({name, url, type, language, page}) => {

  const [data, setData] = useState([])

  const fetchMovies = () => {
    axios.get(`https://api.themoviedb.org/3/${type}/${url}?language=${language}&page=${page}`, options)
  .then((res) => {
    setData(res.data.results)

  })
  }
  
  useEffect(() => {
    fetchMovies()
  },[name])
  
  const scro = useRef(null);

  if (isEmpty(data)) {
    return null;
  }

  const navigate = async (direction) => {
    const curr = scro.current
    
    if(curr){
      const scrollAmount = direction === "left" ? curr.scrollLeft - (curr.offsetWidth + 20) : curr.scrollLeft + (curr.offsetWidth + 20)

      curr.scrollTo({left: scrollAmount, behavior: "smooth"})
    }


  }

  return (
    <div className=" mt-4 space-y-8">
      {data.length === 0 ? <>loading...</> :
      <>
      <div  className=' relative'>
        <p className="text-white mt-16 text-md md:text-xl lg:text-2xl font-semibold mb-4">{name}</p>
        <div  ref={scro} id='main' className="flex gap-2 overflow-hidden">
          <button className=' absolute z-50 text-white flex items-center text-3xl px-2 h-[450px]' onClick={() => navigate('left')}><FaCircleArrowLeft /></button>
          {data.map((movie) => ( 
            <div key={movie.id} className='min-w-[300px] h-[450px] '><MovieCard  data={movie} /></div>
          ))}
          <button className=' absolute z-50 text-white flex items-center text-3xl px-2 h-[450px] right-0' onClick={() => navigate('right')}><FaCircleArrowRight />
</button>
        </div>
      </div>
      </>}
    </div>
  );
}

export default MovieList;
