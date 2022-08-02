import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import {
  initialCurrentResult,
  initialPlaceholders,
  initialResult,
} from '../../constants/gameConstants';
import { icons } from '../../constants/gameConstants';
import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const startDate = React.useRef(Date.now());
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

  useEffect(() => {
    renderPlaceholders(placeholders);
  }, [placeholders]);

  const getCombination = () => {
    while (combination.length <= 3) {
      const randomNum = Math.floor(Math.random() * (icons.length - 1));
      combination.push(icons[randomNum]);
    }
    setCombination(combination);
  };

  const renderPlaceholders = (placeholders) => {
    return (
      <div>
        {placeholders.map((row, indexRow) => (
          <div className="placeholders-row" key={indexRow}>
            {row.map((placeholder, index) => (
              <div
                className="single-placeholder"
                key={index}
                style={{
                  backgroundColor: indexRow === currentRow ? '#F0FBFF' : null,
                }}>
                {placeholder && (
                  <img
                    src={require('../../assets/' + placeholder + '.png')}
                    alt={placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderCurrentResult = () => {
    return (
      <div>
        {currentResult.map((resultRow, index) => (
          <div className="current-result-row" key={index}>
            {resultRow.map((circle, index) => (
              <div
                className="circle"
                key={index}
                style={{
                  backgroundColor:
                    circle === 'red'
                      ? '#F8443A'
                      : circle === 'yellow'
                      ? '#FFC401'
                      : '',
                }}></div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const renderResult = () => {
    return (
      <div className="placeholders-row">
        {result.map((result, index) => (
          <div className="single-placeholder" key={index}>
            {result && (
              <img
                src={require('../../assets/' + result + '.png')}
                alt={result}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const gameSymbols = () => {
    return (
      <div className="game-icons">
        {icons.map((icon, index) => (
          <button
            className="icon-box"
            key={index}
            onClick={(e) => handleGameSymbol(e)}>
            <img src={require('../../assets/' + icon + '.png')} alt={icon} />
          </button>
        ))}
      </div>
    );
  };

  const handleAccept = () => {
    if (!(currentRow >= placeholders.length - 1)) {
      checkIsCorrect();
      if (currentResult[currentRow].every((item) => item === 'red')) {
        setResult(combination);
        setTimeout(() => {
          setShowModal(true);
        }, 3000);
      } else {
        setcurrentRow(currentRow + 1);
      }
    } else {
      checkIsCorrect();
      setResult(combination);
      setTimeout(() => {
        setShowModal(true);
      }, 3000);
    }
  };

  const handleGameSymbol = (e) => {
    if (result !== combination) {
      for (let i = 0; i < placeholders[currentRow].length; i++) {
        if (!placeholders[currentRow][i]) {
          placeholders[currentRow][i] = e.target.alt;
          break;
        }
      }
      const changedPlaceholders = [...placeholders];
      setPlaceholders(changedPlaceholders);
    }
  };

  const checkIsCorrect = () => {
    let checkerComb = [...combination];
    let checkerGuess = [...placeholders[currentRow]];

    for (let i = 0; i < checkerComb.length; i++) {
      if (checkerComb[i] === checkerGuess[i]) {
        currentResult[currentRow].splice(i, 1, 'red');
        checkerComb[i] = null;
        checkerGuess[i] = null;
      }
    }

    for (let i = 0; i < checkerComb.length; i++) {
      if (checkerComb[i]) {
        for (let k = 0; k < checkerGuess.length; k++) {
          if (checkerGuess[k]) {
            if (checkerComb[i] === checkerGuess[k]) {
              currentResult[currentRow].splice(k, 1, 'yellow');
              checkerComb[i] = null;
              checkerGuess[k] = null;
            }
          }
        }
      }
    }

    currentResult[currentRow].sort((a, b) => {
      if (a === null) {
        return 1;
      } else if (b === null) {
        return -1;
      } else if (a === b) {
        return 0;
      }

      return a < b ? -1 : 1;
    });
    const changedCurrentResult = [...currentResult];
    setCurrentResult(changedCurrentResult);
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

  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setResult(combination);
      return <span className="countdown completed">{seconds}</span>;
    } else if (result === combination) {
      return <span className="countdown">0</span>;
    } else if (showModal) {
      return <span className="countdown">0</span>;
    } else {
      return <span className="countdown">{seconds}</span>;
    }
  };

  return (
    <div>
      <div className="game-box">
        <Countdown date={startDate.current + 60000} renderer={renderer} />
        <div className="game">
          <div>{renderPlaceholders(placeholders)}</div>
          <div>{renderCurrentResult()}</div>
        </div>
        <div className="result-and-undo">
          <div className="result">{renderResult()}</div>
          <button className="undo" onClick={undoMove}>
            Undo
          </button>
        </div>
      </div>
      {gameSymbols()}
      <button
        className="accept-bttn"
        disabled={
          placeholders[currentRow] &&
          placeholders[currentRow].some((placeholder) => !placeholder)
            ? true
            : false
        }
        onClick={handleAccept}>
        Accept
      </button>
      {showModal ? (
        <Modal>
          <button className="play-again" onClick={playAgain}>
            Play Again
          </button>
          <button className="back-home" onClick={backHome}>
            Back Home
          </button>
        </Modal>
      ) : null}
    </div>
  );
};

export default Game;
