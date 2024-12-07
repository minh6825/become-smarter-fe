'use client'
import React, { useEffect, useState } from 'react'
import Drawer from './header-drawer'
import AuthForm from '../../section/auth/auth-form'
import { getUserInfoApi } from '@/api/user/user.rest'
import UserInfo from '../../section/auth/user-info'

const HeaderHome = () => {
  const [userInfo, setUserInfo] = useState()
  useEffect(() => {
    const handleGetUserInfo = async () => {
      const res = await getUserInfoApi()
      if(res.success) {
        setUserInfo(res.data)
      }
    }

    handleGetUserInfo()
  }, [])
  console.log(userInfo)

  return (
    <div className='h-[64px] justify-between border-b border-primary/100 flex items-center px-[2%]'>
        <Drawer />
        {userInfo ? <UserInfo /> : <AuthForm />}
    </div>
  )
}

export default HeaderHome