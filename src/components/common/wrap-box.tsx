import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

const WrapBox = ({children, className}: Props) => {
  return (
    <div className={`mx-[5%] pt-6 ${className}`}>{children}</div>
  )
}

export default WrapBox