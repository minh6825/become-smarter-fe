"use client";
import { createComment } from "@/api/user/comment.rest";
import ButtonPrimary from "@/components/tags/button/button-primary";
import InputPrimary from "@/components/tags/input/input-primary";
import moment from "moment";
import React, { useState } from "react";
import ReplyComment from "./reply-comment";
import { IComment } from "./comment-list";

type Props = {
  quizId: string;
};

const ButtonSubmitComment = ({ quizId }: Props) => {
  const [commentValue, setCommentValue] = useState("");
  const [listComment, setListComment] = useState<any[]>([]);

  const handleSubmitComment = async (e: any) => {
    e.preventDefault();
    try {
      const res = await createComment({ commentValue, quizId });
      setListComment((pre) => [
        {
          comment_id: res.comment_id,
          author: res.author,
          content: res.content,
        },
        ...pre,
      ]);
      setCommentValue("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Ô nhập luôn cố định ở đầu */}
      <div className="sticky top-0 bg-primary-background z-50 p-4 shadow-md border-b border-gray-300">
        <h1 className="text-2xl font-bold mb-4">Comments</h1>
        <form onSubmit={handleSubmitComment} className="flex gap-2 items-center">
          <InputPrimary
            required
            classNameBox="flex-grow"
            placeholder="Comment here"
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <ButtonPrimary type="submit" className="!w-fit px-4 py-2">
            Submit
          </ButtonPrimary>
        </form>
      </div>

      {/* Danh sách bình luận */}
      <div className="mt-4">
        {!!listComment?.length &&
          listComment.map((comment: IComment) => {
            return (
              <div
                key={comment.comment_id}
                className="comment py-4 border-b border-gray-200"
              >
                <div className="author flex items-center mb-2">
                  <img
                    src={comment.author.avatar_url}
                    alt={comment.author.name}
                    className="avatar w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{comment.author.name}</h3>
                    <span className="text-gray-500 text-sm">
                      {moment(comment.created_at).format("DD/MM/YYYY HH:mm")}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                <ReplyComment
                  parentId={comment.comment_id}
                  replyList={comment.replies}
                  quizId={quizId}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ButtonSubmitComment;
