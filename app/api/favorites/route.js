import { NextApiRequest, NextApiResponse } from "next";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {

    const { currentUser } = await serverAuth(req, res);

    const favoritedMovies = await prismadb.user.findUnique({
      where: {
        email: currentUser?.email || ''
      }
    });

    return new NextResponse(JSON.stringify(favoritedMovies?.favoriteIds),{status:200})
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({error: `something worng ${error}`}),{status:500})
  }
}
