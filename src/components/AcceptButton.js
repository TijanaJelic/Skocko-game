import React from 'react';

const AcceptButton = ({
  placeholders,
  currentRow,
  setcurrentRow,
  currentResult,
  setCurrentResult,
  setResult,
  setShowModal,
  combination,
}) => {
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
    setCurrentResult([...currentResult]);
  };
  return (
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
  );
};

export default AcceptButton;

// <button
//         className="accept-bttn"
//         disabled={
//           placeholders[currentRow] &&
//           placeholders[currentRow].some((placeholder) => !placeholder)
//             ? true
//             : false
//         }
//         onClick={handleAccept}>
//         Accept
//       </button>
