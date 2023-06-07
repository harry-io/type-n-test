import React, { useEffect, useRef, useState } from "react";
import randomWords from "random-words";
import "./Home.css";
import AllWords from "./AllWords";
import Result from "./Result";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed_rec } from "../../Redux/Auth/auth.api";
import { getLsData } from "../../Utils/ls";

const Home = () => {
  const { speed_rec } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  //
  const [time, setTime] = useState(1);
  const [words, setWords] = useState([]);
  const [counter, setCounter] = useState(time * 60);
  const [currentInput, setCurrentInput] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentAlphIndex, setCurrentAlphIndex] = useState(-1);
  const [currentAlph, setCurrentAlph] = useState("");
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [status, setStatus] = useState("pause");
  const inputRef = useRef(null);
  // useEffect to focus the input on the start
  useEffect(() => {
    inputRef.current.focus();
  }, [status]);
  // useEffect to control the side-effects
  useEffect(() => {
    setWords(generateWords());
  }, []);

  // A function to generate random words using a react library (random-words)
  function generateWords() {
    return new Array(time * 60).fill(null).map(() => randomWords());
  }
  // A function to start the counter
  const start = () => {
    // Changing the state when the counter ends
    if (status === "end") {
      setWords(generateWords());
      setCurrentWordIndex(0);
      setRight(0);
      setWrong(0);
      setCurrentAlphIndex(-1);
      setCurrentAlph("");
    }
    // Changing the state on clicking the start button only if it is not already started.
    if (status !== "start") {
      setStatus("start");
      let counterInterval = setInterval(() => {
        setCounter((prevCount) => {
          if (prevCount === 0) {
            clearInterval(counterInterval);
            setStatus("end");
            setCurrentInput("");
            if (right > speed_rec) {
              dispatch(
                updateSpeed_rec(getLsData("user_id_type_n_test"), {
                  speed_rec: right,
                })
              );
            }
            return counter;
          } else {
            return prevCount - 1;
          }
        });
      }, 1000);
    }
  };
  // A function to handle evey key press
  const handleKeyPress = ({ keyCode, key }) => {
    if (keyCode === 32) {
      compareMatch();
      setCurrentInput("");
      // setCurrentWordIndex(currentWordIndex + 1);
      setCurrentAlphIndex(-1);
      words.splice(currentWordIndex, 1);
      // If the backspace key is pressed
    } else if (keyCode === 8) {
      setCurrentAlphIndex(currentAlphIndex - 1);
      setCurrentAlph("");
    } else {
      setCurrentAlphIndex(currentAlphIndex + 1);
      setCurrentAlph(key);
    }
  };
  // A function to compare the input
  const compareMatch = () => {
    const wordToMatch = words[currentWordIndex];
    const doMatch = wordToMatch === currentInput.trim();
    // If the words are matching the right count will increase
    if (doMatch) setRight(right + 1);
    // If the words are not matching the wrong count will increase
    if (!doMatch) setWrong(wrong + 1);
  };
  //A function to handle the classname to change the style of right and wrong-typed alphabets
  const handleClasName = (index_word, index_alph, alphabet) => {
    if (
      index_word === currentWordIndex &&
      index_alph === currentAlphIndex &&
      currentAlph &&
      status !== "end"
    ) {
      if (alphabet === currentAlph) {
        return "alph_right_detected";
      } else {
        return "alph_wrong_detected";
      }
    } else if (
      index_word === currentWordIndex &&
      currentAlphIndex >= words[currentWordIndex].length
    ) {
      return "alph_wrong_detected";
    } else {
      return "alph_normal_style";
    }
  };
  // A function to restart the type n test
  const restart = () => {
    window.location.reload();
  };
  return (
    <div className="home_main">
      <div className="home_main_wrapper">
        {/* INPUT FIELD */}
        <div className="input_field_and_counter_wrapper">
          {/* COUNTER AND SELECT-COUNTER*/}
          <div className="counter_and_select_counter">
            {/* COUNTER */}
            <div className="counter_wrapper">
              <div className="counter">{counter}</div>
              <div className="counter_unit">Seconds</div>
            </div>
            {/* SELECT COUNTER */}
            <select
              className="select_counter"
              value={time.toString()}
              onChange={(e) => {
                setTime(+e.target.value);
                setCounter(+e.target.value * 60);
              }}
            >
              <option value="1">1 Min</option>
              <option value="2">2 Min</option>
              <option value="3">3 Min</option>
              <option value="4">4 Min</option>
              <option value="5">5 Min</option>
            </select>
          </div>
          {/* INPUT */}
          <div className="input_wrapper">
            <input
              ref={inputRef}
              disabled={status !== "start"}
              type="text"
              className="input_field"
              onKeyDown={handleKeyPress}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              autoComplete="off"
              placeholder="type n test"
            />
            {/* START BUTTON */}
            {(status === "pause" || status === "end") && (
              <button className="start_button" onClick={start}>
                START
              </button>
            )}
            {/* RESTART BUTTON */}
            {status === "start" && (
              <button className="restart_button" onClick={restart}>
                RESTART
              </button>
            )}
          </div>
        </div>
        {/* START PAGE */}
        {status !== "start" && status !== "end" && (
          <div className="image_and_text">
            <img
              className="start_image"
              src="https://i.ibb.co/ctZbc0Y/undraw-Maker-launch-re-rq81.png"
              alt="start_img"
            />
            <p className="start_heading">
              Press start to <span className="text">type n test</span>
            </p>
          </div>
        )}
        {/* ALL WORDS */}
        {status === "start" && (
          <AllWords words={words} handleClassName={handleClasName} />
        )}

        {/* RESULT */}
        {status === "end" && <Result right={right} wrong={wrong} time={time} />}
      </div>
    </div>
  );
};

export default Home;
