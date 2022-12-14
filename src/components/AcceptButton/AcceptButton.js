import React from 'react';
import './accept-button.scss';

const AcceptButton = ({
  placeholders,
  currentRow,
  setcurrentRow,
  currentResult,
  setCurrentResult,
  setResult,
  combination,
}) => {
  const handleAccept = () => {
    if (!(currentRow >= placeholders.length - 1)) {
      checkIsCorrect();
      if (currentResult[currentRow].every((item) => item === 'red')) {
        setResult(combination);
      } else {
        setcurrentRow(currentRow + 1);
      }
    } else {
      checkIsCorrect();
      setResult(combination);
    }
  };

  const checkIsCorrect = () => {
    let checkerComb = [...combination];
    let checkerGuess = [...placeholders[currentRow]];

    // Checking if the user's combination has symbols in the rigth place
    for (let i = 0; i < checkerComb.length; i++) {
      if (checkerComb[i] === checkerGuess[i]) {
        currentResult[currentRow].splice(i, 1, 'red');
        checkerComb[i] = null;
        checkerGuess[i] = null;
      }
    }

    // Checking if the user's combination has symbols in the wrong place
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
    setCurrentResult([...currentResult]);
  };

  return (
    <button
      className="accept-btn"
      disabled={
        placeholders[currentRow] &&
        placeholders[currentRow].some((placeholder) => !placeholder)
          ? true
          : false
      }
      onClick={handleAccept}>
      Accept
    </button>
  );
};

export default AcceptButton;
