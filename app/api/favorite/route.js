import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
      const { currentUser } = await serverAuth();
      
      const { movieId } = await req.json();

     console.log(movieId)
      
      

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });
      console.log("R",movieId)
      return new NextResponse(JSON.stringify(user),{status:200})
   
  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something worng ${error}`}),{status:500})
  }
};

export const DELETE = async (req) => {
  try {
    console.log("IN")
    const { currentUser } = await serverAuth(req, res);

      const { movieId } = await req.json();

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return new NextResponse(JSON.stringify(updatedUser),{status:200})
    
  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something worng ${error}`}),{status:500})
  }
}
