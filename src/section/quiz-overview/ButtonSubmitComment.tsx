"use client";
import { createComment } from "@/api/user/comment.rest";
import ButtonPrimary from "@/components/tags/button/button-primary";
import InputPrimary from "@/components/tags/input/input-primary";
import moment from "moment";
import React, { useState } from "react";

type Props = {
  quizId: string;
};

const ButtonSubmitComment = ({ quizId }: Props) => {
  const [commentValue, setCommentValue] = useState("");
  const [listComment, setListComment] = useState<any[]>([]);
  const handleSubmitComment = async () => {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="fixed top-[89px] w-[40%] z-[50] bg-primary-background ">
        <h1 className="text-2xl font-bold mb-4 mt-2">Comments</h1>
        <div className="flex gap-2">
          <InputPrimary classNameBox="!min-w-[40%] max-lg:!min-w-[200px]" placeholder="Comment here"
            onChange={(e) => setCommentValue(e.target.value)}
            value={commentValue}
          />
          <ButtonPrimary
            onClick={handleSubmitComment}
            type="button"
            className="!bg-blend-hue !w-fit"
          >
            Submit
          </ButtonPrimary>
        </div>
      </div>
      <div className="mt-[100px]">
        {!!listComment.length &&
          listComment.map((comment: any) => {
            return (
              <div
                key={comment.comment_id}
                className="comment py-2 border-b border-gray-200"
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
                      {moment(comment.created_at).format('DD/MM/YYYY HH:mm')}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ButtonSubmitComment;
