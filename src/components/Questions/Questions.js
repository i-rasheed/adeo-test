import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimer } from 'react-timer-hook';
import { decode } from 'html-entities';
import './Questions.css';

export default function Questions({
  currQues,
  setCurrQues,
  questions,
  options,
  correct,
  setScore,
  score,
}) {
  console.log(correct);
  console.log(options);

  const [selected, setSelected] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (i) => {
    if (selected === i && selected === correct) return 'select';
    else if (selected === i && selected !== correct) return 'wrong';
    else if (i === correct) return 'select';
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currQues > questions.length - 2) {
      navigate('/result');
    } else if (selected) {
      setCurrQues(currQues + 1);
      setCurrentIndex(currentIndex + 1);
      setSelected();
    } else {
      setCurrQues(currQues + 1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrQues(currQues - 1);
    setCurrentIndex(currentIndex - 1);
  };

  const MINUTES = 20 * 60;
  const time = new Date();
  time.setSeconds(time.getSeconds() + MINUTES);

  const { seconds, minutes, hours } = useTimer({
    expiryTimestamp: time,
    onExpire: () => navigate('/result'),
  });

  return (
    <div className="question">
      <div className="progress-bar">
        <p className="question-progress">
          {questions.map((item, index) => (
            <div
              key={index}
              className="font-weight-bold"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                width: 40,
                marginRight: 5,
                marginBottom: 5,
                fontSize: 24,
                borderRadius: 5,
                pointerEvents: 'none',
                color:
                  index === currentIndex
                    ? 'white '
                    : item?.selected
                    ? 'white'
                    : 'grey',
              }}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </div>
          ))}
        </p>
        <p className="timer">
          {hours}:{minutes}:{seconds}
        </p>
      </div>
      <p className="question-sentence d-flex">
        {decode(questions[currQues].text)}
      </p>
      <p className="instruction-text d-flex">
        Choose the right answer to the question above
      </p>
      {/* <p>Question {currQues + 1}</p>
        <p>Score : {score}</p> */}
      {questions.resource && <img src={questions[currQues].resource} alt="" />}
      <div className="options d-flex">
        {options &&
          options[0].map((i) => (
            <button
              className={`singleOption  ${selected && handleSelect(i)}`}
              key={i.id}
              onClick={() => handleCheck(i)}
              disabled={selected}
            >
              <span>
                {selected === i && selected === correct ? (
                  <img
                    src={require('../../assets/correct.png')}
                    alt="correct-icon"
                  />
                ) : selected === i && selected !== correct ? (
                  <img
                    src={require('../../assets/incorrect.png')}
                    alt="incorrect-icon"
                  />
                ) : selected && i === correct ? (
                  <img
                    src={require('../../assets/correct.png')}
                    alt="wrong-icon"
                  />
                ) : (
                  ''
                )}
              </span>
              {decode(i.text)}
            </button>
          ))}
      </div>
      <div className="controls">
        <button
          className="btn-control"
          href="/"
          onClick={() => handlePrevious()}
        >
          Previous
        </button>
        <button className="btn-control margin-left-1px" onClick={handleNext}>
          {currQues === questions.length - 1 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}
