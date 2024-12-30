import WordPage from '@/section/word-list'
import WordListManager from '@/section/word-list'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <div className='bg-primary-main-background h-[calc(100vh-64px)]'>
        <WordPage />
    </div>
  )
}

export default page