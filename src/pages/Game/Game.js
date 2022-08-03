import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AcceptButton from '../../components/AcceptButton/AcceptButton';
import CountdownTimer from '../../components/Countdown/Countdown';
import CurrentResult from '../../components/CurrentResult/CurrentResult';
import GameSymbols from '../../components/GameSymbols/GameSymbols';
import Placeholders from '../../components/Placeholders/Placeholders';
import Result from '../../components/Result/Result';
import {
  initialCurrentResult,
  initialPlaceholders,
  initialResult,
} from '../../constants/gameConstants';
import { icons } from '../../constants/gameConstants';

const Game = () => {
  const [combination, setCombination] = useState([]);
  const [currentRow, setcurrentRow] = useState(0);
  const [result, setResult] = useState(initialResult);
  const [placeholders, setPlaceholders] = useState(initialPlaceholders);
  const [currentResult, setCurrentResult] = useState(initialCurrentResult);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getCombination();
    console.log(combination);
  }, []);

  const getCombination = () => {
    while (combination.length <= 3) {
      const randomNum = Math.floor(Math.random() * (icons.length - 1));
      combination.push(icons[randomNum]);
    }
    setCombination(combination);
  };

  const undoMove = () => {
    const index = placeholders[currentRow].findLastIndex((item) => item);
    placeholders[currentRow].splice(index, 1, null);
    const changedPlaceholders = [...placeholders];
    setPlaceholders(changedPlaceholders);
  };

  const playAgain = () => {
    setShowModal(false);
    window.location.reload();
  };

  const backHome = () => {
    navigate('/');
    window.location.reload();
  };

  return (
    <div>
      <div className="game-box">
        <div className="countdown-and-bttns">
          <button onClick={backHome} className="back-home-bttn">
            Back Home
          </button>
          <CountdownTimer
            result={result}
            setResult={setResult}
            combination={combination}
            showModal={showModal}
            setshowModal={setShowModal}
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
        setShowModal={setShowModal}
        combination={combination}
      />
    </div>
  );
};

export default Game;
