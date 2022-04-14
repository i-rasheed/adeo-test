import React, { useState, useEffect } from 'react';
import Questions from '../../components/Questions/Questions';

export default function Quiz({ questions, score, setScore }) {
  const [options, setOptions] = useState();
  const [currQues, setCurrQues] = useState(0);

  useEffect(() => {
    setOptions(questions && [questions[currQues]?.answers]);
  }, [currQues, questions]);

  return (
    <div>
      {questions ? (
        <Questions
          currQues={currQues}
          setCurrQues={setCurrQues}
          questions={questions}
          options={options}
          correct={questions[currQues]?.answers.find((el) => el.value === 1)}
          score={score}
          setScore={setScore}
        />
      ) : (
        <h6>loading...</h6>
      )}
    </div>
  );
}
