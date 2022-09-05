import React from 'react';
import { icons } from '../../constants/gameConstants';
import './game-symbols.scss';

const GameSymbols = ({
  result,
  combination,
  placeholders,
  currentRow,
  setPlaceholders,
}) => {
  const handleGameSymbol = (e) => {
    if (result !== combination) {
      const changedPlaceholders = [...placeholders];
      for (let i = 0; i < changedPlaceholders[currentRow].length; i++) {
        if (!changedPlaceholders[currentRow][i]) {
          changedPlaceholders[currentRow][i] = e.target.alt;
          break;
        }
      }
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
          <img src={require('../../assets/' + icon + '.png')} alt={icon} />
        </button>
      ))}
    </div>
  );
};

export default GameSymbols;
