import React, { useEffect, useState } from 'react';
import {
  initialCurrentResult,
  initialPlaceholders,
} from '../../constants/gameConstants';
import { icons } from '../../constants/gameConstants';

const Game = () => {
  const [combination, setCombination] = useState([]);
  const [currentRow, setcurrentRow] = useState(0);
  const [placeholders, setPlaceholders] = useState(initialPlaceholders);
  const [currentResult, setCurrentResult] = useState(initialCurrentResult);

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
        {placeholders.map((row, index) => (
          <div className="placeholders-row" key={index}>
            {row.map((placeholder, index) => (
              <div className="single-placeholder" key={index}>
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
                      ? 'red'
                      : circle === 'yellow'
                      ? 'yellow'
                      : '',
                }}></div>
            ))}
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
      checkIsCorrect(); // dodati if true onda modal, else setcurrentrow
      setcurrentRow(currentRow + 1);
    } else {
      checkIsCorrect();
      console.log('kraj igre');
    }
  };

  const handleGameSymbol = (e) => {
    for (let i = 0; i < placeholders[currentRow].length; i++) {
      if (!placeholders[currentRow][i]) {
        placeholders[currentRow][i] = e.target.alt;
        break;
      }
    }
    const changedPlaceholders = [...placeholders];
    setPlaceholders(changedPlaceholders);
  };

  const checkIsCorrect = () => {
    let checker = [...placeholders[currentRow]];
    for (let i = 0; i < placeholders[currentRow].length; i++) {
      if (checker.includes(combination[i])) {
        if (combination[i] === checker[i]) {
          currentResult[currentRow][i] = 'red';
          checker[i] = null;
        } else {
          currentResult[currentRow][i] = 'yellow';
          const index = checker.indexOf(combination[i]);
          checker[index] = null;
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
    console.log(currentResult);
  };

  return (
    <div>
      <div className="game-box">
        <div>{renderPlaceholders(placeholders)}</div>
        <div>{renderCurrentResult()}</div>
        <div>{renderResult()}</div>
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
    </div>
  );
};

export default Game;
