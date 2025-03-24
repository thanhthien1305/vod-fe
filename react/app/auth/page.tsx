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

  useEffect(() => {
    if (code) {
      console.log('Mã code:', code);
      signin(code);
    }
  }, [code]);

  return <Button onPress={() => signin()}>Login</Button>;
};

export default Login;