import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const proceedToQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-wrapper">
      <h2 className="welcome-text">
        Welcome to the <br /> Adeo Experience
      </h2>
      <p className='smoke'>
        You currently have <br />
        <strong className='white'>NO</strong> Subscription
      </p>
      <p className="first-take-phrase smoke">
        First take a diagnostic test
        <br />
        to determine the right course
        <br /> for you
      </p>
      <button className="home-btn" onClick={proceedToQuiz}>
        <span className="home-btn-text">Let's go</span>
      </button>
    </div>
  );
}
