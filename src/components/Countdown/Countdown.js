import React from 'react';
import { useEffect } from 'react';
import './countdown.scss';

const Countdown = ({ result, combination, setResult, seconds, setSeconds }) => {
  useEffect(() => {
    let timer;
    if (seconds === 0) {
      setResult(combination);
    } else if (result === combination) {
      setSeconds(0);
    } else if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <div className={seconds ? 'countdown' : 'countdown completed'}>
      {seconds}
    </div>
  );
};

export default Countdown;
