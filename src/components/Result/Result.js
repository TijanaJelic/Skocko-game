import React from 'react';

const Result = ({ result }) => {
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

export default Result;
