'use client'
import MovieCard from '@/components/MovieCard';
import MovieList from '@/components/MovieList'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0'
    }
  };

const New = () => {
    const [data, setData] = useState([])

  const fetchMovies = () => {
    axios.get(`https://api.themoviedb.org/3/trending/all/day?language=en-US&page=1`, options)
  .then((res) => {
    setData(res.data.results)

  })
  }
  
  useEffect(() => {
    fetchMovies()
  },[name])
  return (
    <div className="py-20 flex w-full">
      {data.length === 0 ? <>loading...</> :
      <>
      <div  className=' '>
        <p className="text-white mt-16 text-md md:text-xl lg:text-2xl font-semibold mb-4 px-4">New & Popular</p>
        <div   id='main' className="flex gap-2 flex-wrap justify-center">
        
          {data.map((movie) => ( 
            <div key={movie.id} className='w-[300px] h-[450px] '><MovieCard  data={movie} /></div>
          ))}

        </div>
      </div>
      </>}
    </div>
  )
}

export default New