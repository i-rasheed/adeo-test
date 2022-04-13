import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Quiz from './pages/Quiz/Quiz';
import Result from './pages/Result/Result';

export default function App() {
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await Axios.get(
          'https://adeo.app/api/questions/get?level_id=1&course_id=1&limit=20'
        );
        setQuestions(data.data);
        setTotalQuestions(data.data.length);

        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route
            path="/quiz"
            element={
              <Quiz questions={questions} score={score} setScore={setScore} />
            }
          />
          <Route
            path="/result"
            element={<Result score={score} totalQuestions={totalQuestions} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
