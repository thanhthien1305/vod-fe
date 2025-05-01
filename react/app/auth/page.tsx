// pages/login.js
"use client";
import { Button } from '@heroui/button';
import React, { useEffect } from 'react';
import { signin, signup } from '../api/auth/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginApp } from '../actions/auth';
import { Input } from '@heroui/input';
import { CircularProgress } from '@heroui/react';

const AuthPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  const handleLogin = async (code: string) => {
    if (!code) return;
    try {
      const res = await signin(code)?.then((res) => res.data);
      console.log(res);
      if (res.access_token) {
        localStorage.setItem("video-on-demand", res.access_token);
        loginApp(res.access_token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (code) {
      handleLogin(code);
    }
  }, [code]);

  return <div className="relative h-screen w-screen">
    <div
      className="inset-0 bg-no-repeat bg-cover w-full h-full flex justify-center items-center"
      style={{ backgroundImage: "url('./landing-page/bg-landing-page.png')" }}
    >
      <div className="absolute inset-0 layer-landing from-transparent to-black/50 z-10" />
      {
        code ? (
          <>
            <div className="font-bold text-bold-title1 text-white">
              Waiting for authentication...
            </div>
            <CircularProgress aria-label="Loading..." />
          </>
        ) : (
          <div className="text-center z-20 space-y-8">
            <div>
              <div className="font-bold text-bold-title1 text-white">
                Unlimited movies, TV shows, and more
              </div>
              <div className="text-regular-title2 text-white">Starts at 70,000 ₫. Cancel anytime.</div>
            </div>

            <div className="space-y-4 w-[80%] mx-auto">
              <div className="text-regular-title4 text-white">Ready to watch? Create your membership.</div>
              <div className="flex gap-3 h-[60px] items-center justify-around">

                <Button onPress={() => signin()} variant="flat" className="rounded-xl bg-red-primary font-medium text-medium-title3 w-1/4">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  </div>;
};

export default AuthPage;