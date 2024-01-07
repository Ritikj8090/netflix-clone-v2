import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {

    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

    return new NextResponse(JSON.stringify(movies),{status:200})
  } catch (error) {
    console.log({ error })
    return new NextResponse(JSON.stringify({error: `something worng ${error}`}),{status:500})
  }
}
