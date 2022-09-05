import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcceptButton from '../../components/AcceptButton/AcceptButton';
import Countdown from '../../components/Countdown/Countdown';
import CurrentResult from '../../components/CurrentResult/CurrentResult';
import GameSymbols from '../../components/GameSymbols/GameSymbols';
import Placeholders from '../../components/Placeholders/Placeholders';
import Result from '../../components/Result/Result';
import { icons } from '../../constants/gameConstants';

const Game = () => {
  const [combination, setCombination] = useState([]);
  const [currentRow, setcurrentRow] = useState(0);
  const [result, setResult] = useState([]);
  const [placeholders, setPlaceholders] = useState([]);
  const [currentResult, setCurrentResult] = useState([]);
  const [seconds, setSeconds] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    setDefaultValues();
    getCombination();
  }, []);

  const setDefaultValues = () => {
    setCombination([null, null, null, null]);
    setResult([null, null, null, null]);
    setPlaceholders([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
    setCurrentResult([
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  };

  const getCombination = () => {
    const newCombination = [];
    for (let i = 0; i <= 3; i++) {
      const randomNum = Math.floor(Math.random() * (icons.length - 1));
      newCombination.push(icons[randomNum]);
    }
    setCombination(newCombination);
  };

  const undoMove = () => {
    const changedPlaceholders = [...placeholders];
    const index = changedPlaceholders[currentRow].findLastIndex((item) => item);
    changedPlaceholders[currentRow].splice(index, 1, null);
    setPlaceholders(changedPlaceholders);
  };

  const playAgain = () => {
    setSeconds(60);
    setDefaultValues();
    setcurrentRow(0);
    getCombination();
  };

  const backHome = () => {
    navigate('/');
  };

  return (
    <div>
      <div className="game-box">
        <div className="countdown-and-bttns">
          <button onClick={backHome} className="back-home-bttn">
            Back Home
          </button>
          <Countdown
            result={result}
            combination={combination}
            setResult={setResult}
            seconds={seconds}
            setSeconds={setSeconds}
          />
          <button onClick={playAgain} className="play-again-bttn">
            Play Again
          </button>
        </div>
        <div className="game">
          <Placeholders placeholders={placeholders} curRow={currentRow} />
          <CurrentResult currentResult={currentResult} />
        </div>
        <div className="result-and-undo">
          <Result className="result" result={result} />
          <button className="undo" onClick={undoMove}>
            Undo
          </button>
        </div>
      </div>
      <GameSymbols
        result={result}
        combination={combination}
        placeholders={placeholders}
        currentRow={currentRow}
        setPlaceholders={setPlaceholders}
      />
      <AcceptButton
        placeholders={placeholders}
        currentRow={currentRow}
        setcurrentRow={setcurrentRow}
        currentResult={currentResult}
        setCurrentResult={setCurrentResult}
        setResult={setResult}
        combination={combination}
      />
    </div>
  );
};

export default Game;
