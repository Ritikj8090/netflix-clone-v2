import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req, {params:{movieId}}) => {
  try {
    console.log("movieId", movieId)

    if (typeof movieId !== 'string') {
      throw new Error('Invalid Id');
    }

    if (!movieId) {
      throw new Error('Missing Id');
    }
 
    const movies = await prismadb.movie.findUnique({
      where: {
        id: movieId
      }
    });
    return new NextResponse(JSON.stringify(movies), {status:200})
  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something went wrong ${error}`}),{status:500})
  }
}
