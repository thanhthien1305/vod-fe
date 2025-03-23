// pages/login.js
"use client";
import { Button } from '@heroui/button';
import React, { useEffect } from 'react';
import { signin } from '../api/auth/auth';

const Login = () => {
  const getCodeFromUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get('code');
  };

  useEffect(() => {
    const code = getCodeFromUrl();
    if (code) {
      signin(code);
    }
  }, []);
  return <Button onPress={() => signin()}>Login</Button>;
};

export default Login;