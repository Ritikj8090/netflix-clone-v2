import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";


export const POST = async (req) => {
    try {
        const { currentUser } = await serverAuth(req);
        const {name} = await req.json()

        const profiles = await prismadb.user.update({
            where: {
              email: currentUser.email || "",
            },
            data: {
              profiles: {
                push: name,
              },
            },
          });

        
        return new NextResponse(JSON.stringify({message: 'ok'}), {status:200})
    } catch (error) {
        return new NextResponse(JSON.stringify({error: `something went wonrg ${error}`}), {status:500})
    }
}

export const PUT = async (req) => {
  try {
      const { currentUser } = await serverAuth(req);
      const {name} = await req.json()
      

      const profiles = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          activeProfile: name
        },
      });

      console.log("P:", currentUser, name)
      return new NextResponse(JSON.stringify(profiles), {status:200})
  } catch (error) {
      return new NextResponse(JSON.stringify({error: `something went wonrg ${error}`}), {status:500})
  }
}
