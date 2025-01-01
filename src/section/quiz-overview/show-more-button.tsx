'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import CommentList, { IComment } from './comment-list'
import { getCommentsForQuiz } from '@/api/user/comment.rest'
import CommentListClient from './comment-list-client'
import ButtonPrimary from '@/components/tags/button/button-primary'

type Props = {
    quizId: string
}

const ShowMoreButton = ({quizId}: Props) => {
    const [commentList, setCommentList] = useState<IComment[]>([])
    const [pageNext, setPageNext] = useState(2)
    const handleShowMore = async () => {
        const data = (await getCommentsForQuiz(quizId, pageNext, 20)).data
        if(data.comments == 0) {
            alert('No more comments')
            return
        }
        else {
            setCommentList(pre => [...pre, ...data.comments])
            setPageNext(pre => pre + 1)
        }
    }

    return (
    <div className='pb-4'>
        {commentList && <CommentListClient quizId={quizId} commentList={commentList} />}
        <ButtonPrimary type='button' onClick={handleShowMore} className="bg-primary-blue text-white mt-2 px-4 py-2 rounded-md">
            Show More
        </ButtonPrimary>
    </div>
  )
}

export default ShowMoreButton