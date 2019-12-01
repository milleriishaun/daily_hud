import React from "react";
import styled from "styled-components";
import timer from "../../img/timer_logo.png";

export default function Timer(props) {
  // console.log(props.item);
  const { id, title, minutes, minutes_break } = props.item;
  // console.log("hit handleClick", props.handleClick);
  return (
    <TimerWrapper>
      <div className="flex-container">
        {/* Each respective "Quick Pomodoro Timer" Button and Label stacked */}
        <div className="column">
          <button
            className="timer-button"
            onClick={() => props.adjustCountdown(title)}
          ></button>
          <div className="timer-label">
            {minutes}/{minutes_break}
          </div>
        </div>
      </div>
    </TimerWrapper>
  );
}

const TimerWrapper = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  margin-top: 0.75rem;
  margin-bottom: 0.125rem;
  // color: orange;
  // border: 1px solid pink;
`;
