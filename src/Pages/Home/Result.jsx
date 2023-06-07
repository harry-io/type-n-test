import React from "react";
import "./Result.css";
const Result = ({ right, wrong, time = 1 }) => {
  let accuracy = Math.round((right / (right + wrong)) * 100);
  return (
    <div className="result_main">
      <div className="result_wrapper">
        {/* right words*/}
        <div className="right_words">
          <div className="right_words_wrapper">{right}</div>
          <p className="title">{`words per ${time} minute.`}</p>
        </div>
        {/* wrong words */}
        <div className="wrong_words">
          <div className="wrong_words_wrapper">{wrong}</div>
          <p className="title">wrong entries.</p>
        </div>
        {/* Accuracy */}
        <div className="accuracy">
          <div className="accuracy_wrapper">
            {isNaN(Math.round((right / (right + wrong)) * 100))
              ? "0%"
              : `${accuracy}%`}
          </div>
          <p className="title">accuracy.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;
