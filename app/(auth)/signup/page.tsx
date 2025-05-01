"use client"; // Enables client-side rendering

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Signup } from "./action";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await Signup(formData); // Call server action

    if (result?.error) {
      setError(result.error); // Show error message to user
    } else {
      router.push("/login"); // Redirect after successful signup
    }
  }

  return (
    <div className="bg-image flex flex-col min-h-screen items-center justify-center bg-gray-900 text-white">
      <div className="bg-black/90 h-2/3 max-w-2xl flex flex-col items-center justify-center p-18 rounded-[10px]">
        <div className="h-2/3 max-w-2xl flex flex-col items-center justify-center p-11">
          <h1 className="text-5xl font-extrabold text-redOrange pb-3">SCENEWEAVER</h1>
          <h2 className="text-xl text-white mt-2 text-center">
            Welcome to SCENEWEAVER Maker – your ultimate tool for bringing ideas to life!
          </h2>
        </div>
        <form className="w-10/12 flex flex-col gap-14 p-5" action={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>} {/* Show error if exists */}

          <div className="flex flex-col">
            <label className="text-redOrange">Username</label>
            <input
              type="text"
              required
              name="username"
              autoComplete="off"
              placeholder="Enter your Username"
              className="border bg-slate-50 text-xl rounded-[10px] text-redOrange mb-2 p-6 h-11"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-redOrange">Email</label>
            <input
              type="email"
              required
              name="email"
              autoComplete="off"
              placeholder="Enter your Email"
              className="border bg-slate-50 text-xl rounded-[10px] text-redOrange mb-2 p-6 h-11"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-redOrange">Password</label>
            <input
              type="password"
              required
              name="password"
              autoComplete="off"
              placeholder="Enter your Password"
              className="bg-slate-50 text-xl text-redOrange mb-2 h-11 p-6 rounded-[10px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-redOrange">Re-Enter your password</label>
            <input
              type="password"
              required
              name="confirmPassword"
              autoComplete="off"
              placeholder="Re-Enter Password"
              className="bg-slate-50 text-xl text-redOrange mb-2 h-11 p-6 rounded-[10px]"
            />
          </div>

          <div className="relative w-full flex items-center">
            <button type="submit" className="bg-redOrange text-white w-2/3 py-2 rounded-[13px] font-semibold">
              SIGN UP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
