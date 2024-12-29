import { IUserInfo } from '@/api/user/user.rest'
import React from 'react'
import Image from 'next/image'

type Props = {
    userInfo: IUserInfo
}

const ProfilePage = ({ userInfo }: Props) => {
    return (
        <div className="flex flex-col items-center p-6  min-h-screen">
            <div className="shadow-md rounded-lg p-6 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <Image width={200} height={200} src={userInfo.avatar_url} alt="Avatar" className="rounded-full" />
                    <h1 className="text-2xl font-bold mt-4">{userInfo.name}</h1>
                </div>
                <div className="mt-6">
                    <p className="text-primary text-center"><strong>Email:</strong> {userInfo.email}</p>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage