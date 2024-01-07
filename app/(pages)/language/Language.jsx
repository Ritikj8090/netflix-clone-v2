'use client'
import MovieCard from '@/components/MovieCard';
import MovieList from '@/components/MovieList';
import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useEffect, useState } from 'react'



const Language = () => {


  return (
    <div className=' text-white px-16 py-20'>
       <MovieList type='trending/all' language='en-US' page='1' name="English" url='day' />
       <MovieList type='trending/all' language='hi' page='1' name="Hindi" url='day' />
       <MovieList type='trending/all' language='ar' page='1' name="Arabic" url='day' />
       <MovieList type='trending/all' language='it' page='1' name="Italian" url='day' />
       <MovieList type='trending/all' language='ml' page='1' name="Malayalam" url='day' />
       <MovieList type='trending/all' language='bn' page='1' name="Bengali" url='day' />
       <MovieList type='trending/all' language='ru' page='1' name="Russian" url='day' />
       <MovieList type='trending/all' language='es' page='1' name="Spanish" url='day' />
       <MovieList type='trending/all' language='ko' page='1' name="Korean" url='day' />
    </div>
  )
}

export default Language