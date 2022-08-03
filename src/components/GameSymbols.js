import React from 'react';
import { icons } from '../constants/gameConstants';

const GameSymbols = ({
  result,
  combination,
  placeholders,
  currentRow,
  setPlaceholders,
}) => {
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
  return (
    <div className="game-icons">
      {icons.map((icon, index) => (
        <button
          className="icon-box"
          key={index}
          onClick={(e) => handleGameSymbol(e)}>
          <img src={require('../assets/' + icon + '.png')} alt={icon} />
        </button>
      ))}
    </div>
  );
};

export default GameSymbols;
