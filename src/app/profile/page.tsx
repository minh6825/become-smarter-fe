import { getUserInfoApiSsr } from '@/api/user/user.rest';
import ProfilePage from '@/section/profile';
import { cookies } from 'next/headers';
import { UserInfo } from 'os'
import React from 'react'


const revalidate = 60
const Page = async () => {
      const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value || "";
    const data = await getUserInfoApiSsr(token)

    return (
        <div>
            <ProfilePage userInfo={data.data} />
        </div>
    )
}

export default Page