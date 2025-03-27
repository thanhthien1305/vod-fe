// pages/login.js
"use client";
import { Button } from '@heroui/button';
import React, { useEffect } from 'react';
import { signin } from '../api/auth/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginApp } from '../actions/auth';

const AuthPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const router = useRouter();

  const handleLogin = async (code: string) => {
    try {
      const res = await signin(code)?.then((res) => res.data);

      if(res.access_token) {
        localStorage.setItem("video-on-demand", res.access_token);
        loginApp(res.access_token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const isLogin = localStorage.getItem("video-on-demand") != null;
    if (code && !isLogin) {
      handleLogin(code);
    }
  }, [code]);

  return <Button onPress={() => signin("")} disabled={!!code}>Login</Button>;
};

export default AuthPage;