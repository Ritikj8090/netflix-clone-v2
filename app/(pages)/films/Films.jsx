import MovieList from '@/components/MovieList'
import React from 'react'

const Films = () => {
  return (
    <div className=' text-white px-16 py-20'>
       <MovieList type='movie' language='en-US' page='1' name="Upcoming" url='upcoming' />
       <MovieList type='movie' language='en-US' page='1' name="Now Playing" url='now_playing' />
       <MovieList type='movie' language='en-US' page='1' name="Popular" url='popular' />
       <MovieList type='movie' language='en-US' page='1' name="Top Rated" url='top_rated' />
    </div>
  )
}

export default Films