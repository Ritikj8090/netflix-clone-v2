'use client'
import Loading from '@/components/Loading';
import MovieCard from '@/components/MovieCard';
import MovieList from '@/components/MovieList'
import useLoading from '@/hooks/useLoading';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useInfoModalStore from '@/hooks/useInfoModalStore';

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjllNzZhYjkxZDlkNTU1ZGNjOWM3MDdiNzk5NWM2YiIsInN1YiI6IjY0NGY4NGRmYzBhMzA4MDJkZDcwOWE0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Eww59esq8avGyBH4XGwfN30scYTfo1ca8Z2BjExuWt0'
    }
  };

const Series = () => {
    const {openLoading, closeLoading, loading} = useLoading()

  return (
    <div className=' text-white px-16 py-20'>
       <MovieList type='tv' language='en-US' page='1' name="Airing Today" url='airing_today' />
       <MovieList type='tv' language='en-US' page='1' name="On The Air" url='on_the_air' />
       <MovieList type='tv' language='en-US' page='1' name="Popular" url='popular' />
       <MovieList type='tv' language='en-US' page='1' name="Top Rated" url='top_rated' />
       <MovieList type='tv' language='en-US' page='1' name="Trending" url='trending' />
    </div>
  )
}

export default Series