"use client"; 

import { useState } from "react";
import { login } from './action'
import { useRouter } from "next/navigation";

export default function LoginPage() {
 const router = useRouter();
   const [error, setError] = useState<string | null>(null);
 
   async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result?.error) {
      setError(result.error); 
    } else {
      router.push("/dashboard"); 
    }
  }
  

  return (
    <div className="bg-image flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white">    
      <div className="bg-black/90 h-2/3 max-w-2xl flex flex-col items-center justify-center p-20 rounded-[10px]">
        <div className="h-2/3 max-w-2xl flex flex-col items-center justify-center pb-11">
          <h1 className="text-5xl font-extrabold text-redOrange pb-3">SCENEWEAVER</h1>
          <h2 className="text-xl text-white mt-2 text-center">
            Welcome to SCENEWEAVER – your ultimate tool for bringing ideas to life!
          </h2>
        </div>
        <form className="w-10/12 flex flex-col gap-8" action={handleSubmit}>
          <div className="flex flex-col">
            <label className="text-redOrange">Email</label>
            <input 
              type="email"
              name="email"
              required
              autoComplete="off"
              placeholder="Enter your Email"
              className="border bg-slate-50 text-xl rounded-[10px] text-redOrange mb-2 p-6 h-11"

            />
          </div>
          <div className="flex flex-col">
            <label className="text-redOrange">Password</label>
            <input 
              type="password"
              name="password"
              required
              autoComplete="off"
              placeholder="Enter your Password"
              className="bg-slate-50 text-xl text-redOrange mb-2 h-11 p-6 rounded-[10px]"

            />
          </div>
          <div className="relative w-full flex flex-col items-center">
            <a href="#" className="absolute top-[-40px] right-6 text-red-500 text-sm font-semibold">
              Forgot Password?
            </a>
            <button 
              type="submit"
              className="bg-[rgb(255,69,0)] text-white w-2/3 py-2 rounded-[13px] font-semibold"
            >
              LOG IN
            </button>
            <a href="/signup" className="mt-3 text-white text-sm underline">
              SignUp Here!
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
