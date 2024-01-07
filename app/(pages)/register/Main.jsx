"use client";

import axios from "axios";
import { useReducer, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import Input from "@/components/Input";
import Image from "next/image";
import hero from "@/public/images/logo.png";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLoading from "@/hooks/useLoading";
import Loading from "@/components/Loading";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";



const Main = () => {
  const router = useRouter()
  const [passwordshow, setPasswordshow] = useState(false);
  const [error, seterror] = useState("");
  const [setshowerror, setSetshowerror] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {loading, openLoading, closeLoading} = useLoading()

  const register = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const UpperCharacterRegex = /[A-Z]/;

    try {
      if (formData.name.includes(" ")) {
        setSetshowerror(true);
        seterror("remove spaces");
        return;
      } else if (formData.name.length < 5) {
        setSetshowerror(true);
        seterror("username atleast contain 5 character");
        return;
      } else if (!emailRegex.test(formData.email)) {
        setSetshowerror(true);
        seterror("enter a valid email");
        return;
      } else if (formData.password.length < 8) {
        setSetshowerror(true);
        seterror("Minimun 8 characters");
        return;
      } else if (!specialCharacterRegex.test(formData.password)) {
        setSetshowerror(true);
        seterror("Atleast one special character in password");
        return;
      } else if (!UpperCharacterRegex.test(formData.password)) {
        setSetshowerror(true);
        seterror("Atleast one uppercase character  in password");
        return;
      } else {
        openLoading()
        await axios.post("/api/register", {
          ...formData,
        })
        .then((callback) => {
          if(callback?.error){
            seterror(callback.error)
            setSetshowerror(true)
            console.log('Invalid Credentials in auth', callback.error)
            closeLoading()
          }
        })
        .finally(() => {
          signIn("credentials", {
            ...formData,
            redirect: false,
          })
          .then((callback) => {
            if(callback?.error){
              seterror(callback.error)
              setSetshowerror(true)
              console.log('Invalid Credentials in auth', callback.error)
            }
    
            if(callback?.ok && !callback?.error){
              
              router.push("/profiles");
              closeLoading()
            }
          })
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSetshowerror(false);
  };
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      {loading && <Loading />}
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={hero} className="h-12 w-40" alt="Logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">Register</h2>
            <div className="flex flex-col gap-4">
              <Input
                id="name"
                type="text"
                name="name"
                label="Username"
                value={formData.name}
                onChange={handleChange}
              />

              <Input
                id="email"
                type="email"
                name="email"
                label="Email address or phone number"
                value={formData.email}
                onChange={handleChange}
              />
              <div className=" relative">
              <Input
                type={`${!passwordshow ? 'password' : 'text'}`}
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <span onClick={() => setPasswordshow(!passwordshow)} className=" cursor-pointer text-white absolute top-[35%] right-5 text-xl">
                {passwordshow ? <IoEye className=" "/> : <IoMdEyeOff className=" "/>}
                </span>
              </div>
            </div>
            {setshowerror && <div className=" text-red-500">{error}</div>}
            <button
              onClick={register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
            >
              Sign up
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
              Already have an account?
              <Link
                href={"/auth"}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
