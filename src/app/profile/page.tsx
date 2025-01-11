import { getUserInfoApiSsr } from '@/api/user/user.rest';
import ProfilePage from '@/section/profile';
import { cookies } from 'next/headers';
import React from 'react'


export const revalidate = 10;
const Page = async () => {
      const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value || "";
    const data = await getUserInfoApiSsr(token)

    return (
        <div className='bg-primary-main-background h-[calc(100vh-72px)] overflow-auto'>
            <ProfilePage userInfo={data.data} />
        </div>
    )
}

export default Page