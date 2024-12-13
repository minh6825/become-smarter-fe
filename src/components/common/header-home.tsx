'use client'
import React, { useEffect, useState } from 'react'
import Drawer from './header-drawer'
import AuthForm from '../../section/auth/auth-form'
import { getUserInfoApi } from '@/api/user/user.rest'
import UserInfo from '../../section/auth/user-info'
import Link from 'next/link'

const HeaderHome = () => {
  const [userInfo, setUserInfo] = useState()
  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    const handleGetUserInfo = async () => {
      try {
        const res = await getUserInfoApi()
        if(res.success) {
          setUserInfo(res.data)
        }
      } catch (error) {
        
      }
    }
    setIsClient(true)
    handleGetUserInfo()
  }, [])

  if(!isClient) return null
  return (
    <div className='h-[64px] top-0 fixed z-[100] w-full bg-primary-background justify-between border-b border-primary/100 flex items-center px-[2%]'>
        <Drawer />
        <div className='flex gap-4'>
          <Link href={'/'} >List quiz</Link>
          {userInfo ? <UserInfo userInfo={userInfo} /> : <AuthForm />}
        </div>
    </div>
  )
}

export default HeaderHome