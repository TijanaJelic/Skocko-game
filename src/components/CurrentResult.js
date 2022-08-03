import React from 'react';

const CurrentResult = ({ currentResult }) => {
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

export default CurrentResult;
