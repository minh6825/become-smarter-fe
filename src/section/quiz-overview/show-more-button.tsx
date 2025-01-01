'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import CommentList, { IComment } from './comment-list'
import { getCommentsForQuiz } from '@/api/user/comment.rest'
import CommentListClient from './comment-list-client'

type Props = {
    quizId: string
    page: number
    limit: number
}

const ShowMoreButton = ({quizId, page, limit}: Props) => {
    const [commentList, setCommentList] = useState<IComment[]>([])
    const [pageNext, setPageNext] = useState(page)
    const handleShowMore = async () => {
        const data = (await getCommentsForQuiz(quizId, pageNext+1, limit)).data
        setCommentList(pre => [...pre, ...data.comments])
        setPageNext(pre => pre + 1)
        if(data.comments == 0) {
            alert('No more comments')
        }
    }

    return (
    <div className='pb-4'>
        {commentList && <CommentListClient quizId={quizId} commentList={commentList} />}
        <Link onClick={handleShowMore} href={`/quiz/${quizId}?page=${pageNext + 1}&limit=${limit}` } className="bg-primary-blue text-white mt-2 px-4 py-2 rounded-md">
            Show More
        </Link>
    </div>
  )
}

export default ShowMoreButton