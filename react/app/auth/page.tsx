// pages/login.js
"use client";
import { Button } from '@heroui/button';
import React, { useEffect } from 'react';
import { signin } from '../api/auth/auth';
import { useSearchParams } from 'next/navigation';

const Login = () => {
  //pass : ULjg.YZuUkqbzq7
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleGetAccessToken = async (code?: string) => {
    try {
      const result = await signin(code)?.then((res) => res.data);
      console.log(result)
      if(result.data.accessToken) {
        localStorage.setItem("video-on-demand", result.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   if (code) {
  //     console.log('Mã code:', code);
  //     handleGetAccessToken(code);
  //   }
  // }, [code]);

  return <Button onPress={() => handleGetAccessToken(code || "")}>Login</Button>;
};

export default Login;