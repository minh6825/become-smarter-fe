"use client";
import { googleRedirectApi } from "@/api/user/auth.rest";
import React, { useEffect } from "react";

type Props = {};

const CallBackLogin = (props: Props) => {
  useEffect(() => {
    const handleLoginWithGoogle = async () => {
      const res = await googleRedirectApi();
    };
    handleLoginWithGoogle();

    return () => {};
  }, []);

  return <div>CallBackLogin</div>;
};

export default CallBackLogin;
