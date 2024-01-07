"use client";

import axios from "axios";
import { useCallback, useState } from "react";
import { NextPageContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";
import Image from "next/image";
import hero from '@/public/images/logo.png';
import Link from "next/link";
import useLoading from "@/hooks/useLoading";
import Loading from "@/components/Loading";


const Auth = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, seterror] = useState('')
  const [setshowerror, setSetshowerror] = useState(false)
  const [variant, setVariant] = useState("login");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {loading, openLoading, closeLoading} = useLoading()

  const login = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    try {
      if (!emailRegex.test(formData.email)) {
        setSetshowerror(true);
        seterror("enter a valid email");
        return;
      } 
      else if (formData.password.length < 1) {
        setSetshowerror(true);
        seterror("password can not be empty");
        return;
      } 
      else{
        openLoading()
        await signIn("credentials", {
          ...formData,
          redirect: false,
         
        })
        .then((callback) => {
          if(callback?.error){
            seterror(callback.error)
            setSetshowerror(true)
            closeLoading()
            console.log('Invalid Credentials in auth', callback.error)
          }
  
          if(callback?.ok && !callback?.error){
            router.push("/profiles"); 
            closeLoading()
          }
        })
      }
      
      
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setSetshowerror(false)
  }
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      {loading && <Loading />}
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={hero} className="h-12 w-40" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
             Sign in
            </h2>
            <div className="flex flex-col gap-4">
             
              <Input
                id="email"
                type="email"
                name='email'
                label="Email address or phone number"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                type="password"
                id="password"
                name='password'
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            {setshowerror && <div className=" text-red-500">{error}</div>}
            <button
              onClick={login}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              Login
            </button>
            <div className="flex flex-row text-black items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={32} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={32} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              
                First time using Netflix?
                
              <Link href={'register'}
               
                className="text-white ml-1 hover:underline cursor-pointer"
              >
               Create an account
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
