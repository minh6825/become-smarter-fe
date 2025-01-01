'use client'
import React from "react";
import ButtonSubmitComment from "./ButtonSubmitComment";
import { IUserInfo } from "@/api/user/user.rest";
import moment from "moment";
import Image from "next/image";
import ReplyComment from "./reply-comment";

export interface IComment {
  comment_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  author: IUserInfo;
  replies: IComment[];
}

type Props = {
  commentList: IComment[];
  quizId: string;
};

const CommentListClient = ({ commentList, quizId }: Props) => {
  return (
    <div>
      <div>
        {commentList.map((comment: IComment) => {
          return (
            <div key={comment.comment_id} className="comment py-4 border-b border-gray-200">
              <div className="author flex items-center mb-2">
                <Image width={40} height={40}
                  src={comment.author.avatar_url}
                  alt={comment.author.name}
                  className="avatar w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold">{comment.author.name}</h3>
                  <span className="text-gray-500 text-sm">
                    {moment(comment.created_at).format('DD/MM/YYYY HH:mm')}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <ReplyComment replyList={comment.replies} parentId={comment.comment_id} quizId={quizId} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommentListClient;
