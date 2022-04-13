import React from 'react';

export default function Result({ score, totalQuestions }) {
  console.log(totalQuestions);
  return (
    <div>
      <div>Score: {(score / totalQuestions) * 100}%</div>
      <div>Questions: {totalQuestions}</div>
    </div>
  );
}
