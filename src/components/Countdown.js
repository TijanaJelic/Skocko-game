import React from 'react';
import Countdown from 'react-countdown';

const CountdownTimer = ({
  result,
  setResult,
  combination,
  showModal,
  setshowModal,
}) => {
  const startDate = React.useRef(Date.now());
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      setResult(combination);
      setshowModal(true);
      return <span className="countdown completed">{seconds}</span>;
    } else if (result === combination) {
      return <span className="countdown">0</span>;
    } else if (showModal) {
      return <span className="countdown">0</span>;
    } else {
      return <span className="countdown">{seconds}</span>;
    }
  };

  return <Countdown date={startDate.current + 60000} renderer={renderer} />;
};

export default CountdownTimer;