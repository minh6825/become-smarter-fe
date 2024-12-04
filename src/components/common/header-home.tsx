import React from 'react'
import Drawer from './header-drawer'
import AuthForm from '../auth/auth-form'


const HeaderHome = () => {
  return (
    <div className='h-[64px] justify-between border-b border-primary/100 flex items-center px-[2%]'>
        <Drawer />
        <AuthForm />
    </div>
  )
}

export default HeaderHome