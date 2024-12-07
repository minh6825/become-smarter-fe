import React from 'react'

type Props = {
  userInfo: any
}

const UserInfo = ({userInfo}: Props) => {
  return (
    <div>{
      userInfo.name
    }</div>
  )
}

export default UserInfo