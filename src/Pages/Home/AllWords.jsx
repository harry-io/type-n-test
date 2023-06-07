import React from "react";
import "./AllWords.css";

const AllWords = ({ words, handleClassName }) => {
  return (
    <div className="all_words_container">
      <div className="all_words_wrapper">
        {words &&
          words.map((word, index_word) => (
            <span className="word_container_span" key={index_word}>
              {word &&
                word.split("").map((alphabet, index_alph) => (
                  <span
                    key={index_alph}
                    className={handleClassName(
                      index_word,
                      index_alph,
                      alphabet
                    )}
                  >
                    {alphabet}
                  </span>
                ))}
            </span>
          ))}
      </div>
    </div>
  );
};

export default AllWords;
