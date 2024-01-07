'use client'
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Billboard from './Billboard'
import MovieList from './MovieList'
import InfoModal from './InfoModal'
import useInfoModalStore from '@/hooks/useInfoModalStore'
import FavoriteList from '@/components/FavoriteList';
import useCurrentUser from '@/hooks/useCurrentUser'

const Main = () => {
 
        const fav = useCurrentUser()
  

  const {isOpen, closeModal} = useInfoModalStore();
  return (
    <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <Billboard />
        
        <div className="pb-40">
        <MovieList type='movie' language='en-US' page='1' name="Upcoming" url='upcoming' />
        <MovieList type='movie' language='en-US' page='1' name="Popular" url='popular' />
        <MovieList type='movie' language='en-US' page='1' name="Top Rated" url='top_rated' />
        <MovieList type='movie' language='en-US' page='1' name="Now Playing" url='now_playing' />
        
      </div>
    </>
  )
}

export default Main

/*<FavoriteList data={fav?.data?.favoriteIds} /> */