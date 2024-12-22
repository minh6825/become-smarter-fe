import React from "react";
import style from "./button-choose-question.module.css";
type Props = {
  children: React.ReactNode;
};

const ButtonChooseQuestion = ({ children }: Props) => {
  return (
    <div className={`${style["container"]} cursor-pointer`}>
      <div className={`${style["btn"]}`}>
        {children}
      </div>
    </div>
  );
};

export default ButtonChooseQuestion;
