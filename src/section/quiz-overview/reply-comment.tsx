'use client'
import { createComment, createReplyComment } from "@/api/user/comment.rest";
import ButtonPrimary from "@/components/tags/button/button-primary";
import InputPrimary from "@/components/tags/input/input-primary";
import React, { useEffect, useState } from "react";
import { IComment } from "./comment-list";
import Image from "next/image";
import moment from "moment";

type Props = {
    quizId: string
    parentId: string
    replyList: IComment[]
};

const ReplyComment = ({quizId, parentId, replyList}: Props) => {
  const [commentValue, setCommentValue] = useState("");
  const [listComment, setListComment] = useState<IComment[]>([]);
  const [isReply, setIsReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  useEffect(() => {
    setListComment(replyList)
    return () => {
    }
  }, [])
  

  const handleSubmitComment = async () => {
    try {
      const res = await createReplyComment({ commentValue, quizId, parentId });
      setListComment((pre) => [
        {
          comment_id: res.comment_id,
          author: res.author,
          content: res.content,
          replies: res.replies,
          avatar_url: res.author.avatar_url,
          created_at: res.created_at,
          updated_at: res.updated_at,
        },
        ...pre,
      ]);
      setShowReplies(true)
      setCommentValue('')
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button onClick={() => setIsReply(!isReply)} className="text-blue-500 hover:underline text-sm mr-2">
        {isReply ? 'Cancel' : 'Reply'}
      </button>
      {isReply && (
        <div className="flex gap-2 items-center">
          <InputPrimary
            classNameBox="!min-w-[40%] max-lg:!min-w-[200px] " className="!h-[34px]"
            placeholder="Comment here"
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <ButtonPrimary
            onClick={handleSubmitComment}
            type="button"
            className="!bg-blend-hue !w-fit !h-[34px] !py-0"
          >
            Submit
          </ButtonPrimary>
        </div>
      )}
      <button onClick={() => setShowReplies(!showReplies)} className="text-blue-500 hover:underline text-sm">
        {showReplies ? 'Hide replies' : `${listComment?.length || 0} replies`}
      </button>
      {showReplies && (
        <div className="ml-4">
          {listComment?.map((comment: IComment) => {
            return (
              <div key={comment.comment_id} className="comment py-2 border-b border-gray-200">
                <div className="author flex items-center mb-2">
                  <Image
                    width={30}
                    height={30}
                    src={comment.author.avatar_url}
                    alt={comment.author.name}
                    className="avatar w-[30px] h-[30px] rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{comment.author.name}</h3>
                    <span className="text-gray-500 text-sm">
                      {moment(comment.created_at).format('DD/MM/YYYY HH:mm')}
                    </span>
                  </div>
                </div>
                <p className="text-primary mb-2">{comment.content}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ReplyComment;
