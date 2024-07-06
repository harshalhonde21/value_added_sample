import React from 'react';
import "../Css/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to TaskSpark - Empowering Your Productivity</h1>
      <h2>Unleash Your Inner Hero</h2>
      <button className="cta-button">Set your todo's now</button>
      <p>
        Are you ready to take charge of your tasks and conquer your to-do list? Look no further! DoltHero is here to help you become the hero of your own productivity journey.
      </p>
      <p>
        <span role="img" aria-label="star">⭐</span> Achieve More, Stress Less <span role="img" aria-label="star">⭐</span>
      </p>

    </div>
  );
}

export default Home;
