import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
  };

  const signInWithGoogle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full grid bg-slate-50">
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="flex flex-col justify-center items-center my-10">
        <Link href="/">
          <a>
            <h1 className="font-righteous text-3xl mb-8">
              <span className="text-yellow-500">Work</span>
              <span className="text-pink-500">Now</span>
            </h1>
          </a>
        </Link>
        <div className="flex flex-col w-1/3 p-14 border-2 border-slate-200 border-solid rounded-md shadow-[0_0px_5px_0px_rgba(0,0,0,0.1)]">
          <form className="flex flex-col mb-8">
            <h2 className="text-center mb-5 font-bold text-xl">
              Sign up for an account
            </h2>
            <label htmlFor="signUpEmail" className="hidden">
              Email
            </label>
            <input
              id="signUpEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="border-2 border-slate-200 border-solid rounded-full px-5 py-2 mb-8"
            />
            <label htmlFor="signUpPassword" className="hidden">
              Password
            </label>
            <input
              id="signUpPassword"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="border-2 border-slate-200 border-solid rounded-full px-5 py-2 mb-8"
            />
            <Button
              title="Sign Up"
              extraStyle="py-2"
              type="primary"
              onPress={signIn}
            />
            <p className="text-right text-sm mt-2">
              Already have an account?{" "}
              <Link href="/login">
                <a className="text-blue-800">Sign In</a>
              </Link>
            </p>
          </form>
          <div className="flex justify-center items-center">
            <div className="flex-1 border-solid border-slate-500 border" />
            <p className="text-slate-500 mx-2">OR</p>
            <div className="flex-1 border-solid border-slate-500 border" />
          </div>
          <div className="flex flex-col mt-8">
            <Button
              title="Continue with Google"
              type="secondary"
              icon="/images/google.png"
              onPress={signInWithGoogle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
