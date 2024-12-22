import React from 'react'

type Props = {
    children: React.ReactNode
    className?: string
}

const WrapBox = ({children, className}: Props) => {
  return (
    <div className={`container mx-auto pt-6 ${className}`}>{children}</div>
  )
}

export default WrapBox