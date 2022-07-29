import React, { useEffect, useState } from 'react';

const Game = () => {
  const [currentRow, setcurrentRow] = useState(0);
  const initialPlaceholders = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];
  const [placeholders, setPlaceholders] = useState(initialPlaceholders);

  let currentResult = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
  ];

  const icons = [
    'skocko-skocko',
    'skocko-tref',
    'skocko-pik',
    'skocko-srce',
    'skocko-karo',
    'skocko-zvezda',
  ];

  useEffect(() => {
    renderPlaceholders(placeholders);
  }, [placeholders]);

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
              <div className="circle" key={index}>
                {circle}
              </div>
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
    console.log('prihvati');
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

  return (
    <div>
      <div className="game-box">
        <div>{renderPlaceholders(placeholders)}</div>
        <div>{renderCurrentResult()}</div>
      </div>
      {gameSymbols()}
      <button className="accept-bttn" onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
};

export default Game;
