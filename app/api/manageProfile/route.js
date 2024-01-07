import { NextResponse } from "next/server"
import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";


export const DELETE = async (req) => {
  try {
    const { currentUser } = await serverAuth();
    const {name} = await req.json()
    console.log(name)
    const fun = async () => {
      const profiles = await prismadb.user.findUnique({
        where: {
          email: currentUser.email || "",
        },
        select:{
          profiles:true
        }
      })
      return profiles
    }
    fun()
    .then(async(res) => {
      const AfterDelete = []
      for(let i=0;i<res.profiles.length;i++){
        if(res.profiles[i] != name){
          AfterDelete.push(res.profiles[i])
        }
      }
      await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data:{
          profiles:AfterDelete
        }
      })
    })
    const profiles = await prismadb.user.findUnique({
      where: {
        email: currentUser.email || "",
      },

    })
    return new NextResponse(JSON.stringify(profiles), {status:200})

  } catch (error) {
    return new NextResponse(JSON.stringify({error: `something went wonrg ${error}`}), {status:500})
  }
}

export const PUT = async (req) => {
  try {
      const { currentUser } = await serverAuth();
      const {ex, name} = await req.json()
      const fun = async () => {
        const profiles = await prismadb.user.findUnique({
          where: {
            email: currentUser.email || "",
          },
          select:{
            profiles:true
          }
        })
        return profiles
      }
      fun()
      .then(async(res) => {
        console.log(res.profiles)
        for(let i=0;i<res.profiles.length;i++){
          if(res.profiles[i] === ex){
            res.profiles[i] = name
          }
        }
        await prismadb.user.update({
          where: {
            email: currentUser.email || "",
          },
          data:{
            profiles:res.profiles
          }
        })
      })

      const profiles = await prismadb.user.findUnique({
        where: {
          email: currentUser.email || "",
        },

      })

      return new NextResponse(JSON.stringify(profiles), {status:200})
  } catch (error) {
      return new NextResponse(JSON.stringify({error: `something went wonrg ${error}`}), {status:500})
  }
}
