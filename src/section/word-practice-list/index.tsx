import Link from 'next/link'
import React from 'react'
import moment from 'moment'

type Props = {
    data: {
        created_at: string,
        description: string,
        name: string,
        updated_at: string,
        word_list_id: number
    }[]
}

const WordPracticeListPage = ({data}: Props) => {
  console.log(data)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Word Practice List Page</h1>
      <ul className="space-y-4">
        {data.map((item, index) => (
            <li  key={index} className='p-4 bg-primary-background w-full border rounded-lg shadow-md'>
          <Link href={`/word-practice/${item.word_list_id}`}  className="">
            <p className="text-xl font-semibold">Name: {item.name}</p>
            <p className="text-gray-700">Description: {item.description}</p>
            <p className="text-gray-700">Word List ID: {item.word_list_id}</p>
            <p className="text-gray-500 text-sm">Created At: {moment(item.created_at).format('DD-MM-YYYY HH:MM:ss')}</p>
            <p className="text-gray-500 text-sm">Updated At: {moment(item.updated_at).format('DD-MM-YYYY HH:MM:ss')}</p>
          </Link>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default WordPracticeListPage