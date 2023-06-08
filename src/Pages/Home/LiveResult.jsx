import React from "react";
import "./LiveResult.css";
const LiveResult = ({ right, wrong, time = 1 }) => {
  let accuracy = Math.round((right / (right + wrong)) * 100);
  return (
    <div className="live_result_main">
      <div className="live_result_wrapper">
        {/* right words*/}
        <div className="live_right_words">
          <div className="live_right_words_wrapper">{right}</div>
          <p className="live_title">{`WPM`}</p>
        </div>
        {/* wrong words */}
        <div className="live_wrong_words">
          <div className="live_wrong_words_wrapper">{wrong}</div>
          <p className="live_title">wrong</p>
        </div>
        {/* Accuracy */}
        <div className="live_accuracy">
          <div className="live_accuracy_wrapper">
            {isNaN(Math.round((right / (right + wrong)) * 100))
              ? "0%"
              : `${accuracy}%`}
          </div>
          <p className="live_title">accuracy.</p>
        </div>
      </div>
    </div>
  );
};

export default LiveResult;
