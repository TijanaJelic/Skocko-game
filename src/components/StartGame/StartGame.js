import React from 'react';
import { Link } from 'react-router-dom';

const StartGame = () => {
  return (
    <div className="start-game-box">
      <h1>Skocko game</h1>
      <div className="description">
        <p>Skocko game is part of the most popular Serbian quiz "Slagalica".</p>
        <p>How to play?</p>
        <p>
          Guess the given combination of 4 characters in 6 tries with 6
          characters. Game time is limited to 60 seconds.
        </p>
      </div>
      <div className="symbols">
        <p>
          <div className="circle red"></div> - symbol is in the right place
        </p>
        <p>
          <div className="circle yellow"></div> - symbol is in the wrong place
        </p>
      </div>
      <Link to={'game'} className="start-game-bttn">
        Start Game
      </Link>
    </div>
  );
};

export default StartGame;
