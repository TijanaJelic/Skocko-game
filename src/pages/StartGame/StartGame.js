import React from 'react';
import { Link } from 'react-router-dom';
import { icons } from '../../constants/gameConstants';

const StartGame = () => {
  return (
    <div className="start-game-box">
      <h1>Skocko game</h1>
      <div className="description">
        <p>Skocko game is part of the most popular Serbian quiz "Slagalica".</p>
        <p>How to play?</p>
        <p>
          Guess the combination of 4 symbols in 6 tries. Game time is limited to
          60 seconds.
        </p>
      </div>

      <div className="symbols">
        <p>You can choose between these 6 symbols:</p>
        <div className="game-icons">
          {icons.map((icon, index) => (
            <div className="icon-box" key={index}>
              <img src={require('../../assets/' + icon + '.png')} alt={icon} />
            </div>
          ))}
        </div>
        <p>
          <span className="circle red"></span> - symbol is in the right place
        </p>
        <p>
          <span className="circle yellow"></span> - symbol is in the wrong place
        </p>
      </div>
      <Link to={'game'} className="start-game-bttn">
        Start Game
      </Link>
    </div>
  );
};

export default StartGame;
