"use client";
import { signIn } from "next-auth/react";
import { CpuChipIcon } from "@heroicons/react/24/solid";

function Login() {
  return (
    <div className="bg-[#343541] h-screen flex flex-col items-center justify-center text-center text-gray-100 gap-2 pb-10">
      <CpuChipIcon className="h-14 w-14" />
      <p>Welcome to ChatGPT</p>
      <p>Log in with your OpenAI account to continue</p>
      <div className="flex flex-row mt-2 gap-3">
        <button onClick={() => signIn("google")} className="myButton">
          Log in
        </button>
        <button onClick={() => signIn("google")} className="myButton">
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Login;
