import React from 'react';
import '../pages/Game/game.scss';

const Placeholders = ({ placeholders, curRow }) => {
  return (
    <div>
      {placeholders.map((row, indexRow) => (
        <div className="placeholders-row" key={indexRow}>
          {row.map((placeholder, index) => (
            <div
              className="single-placeholder"
              key={index}
              style={{
                backgroundColor: indexRow === curRow ? '#F0FBFF' : null,
              }}>
              {placeholder && (
                <img
                  src={require('../assets/' + placeholder + '.png')}
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

export default Placeholders;
