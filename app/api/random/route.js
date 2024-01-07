import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {

    await serverAuth(req); 

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });

    return new NextResponse(JSON.stringify(randomMovies[0]),{status:200})
  } catch (error) {
    console.log(error);

    return new NextResponse(JSON.stringify({error: `in random something worng ${error}`}),{status:500})
  }
}
