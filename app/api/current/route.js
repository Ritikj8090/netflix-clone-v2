
import serverAuth from "@/libs/serverAuth";
import { NextResponse } from "next/server";


export const GET = async (req) => {
  try {
    const { currentUser } = await serverAuth();
    console.log('in current', currentUser)
    return new NextResponse(JSON.stringify(currentUser),{status:200})
  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something worong${error}`}),{status:200})
  }
}