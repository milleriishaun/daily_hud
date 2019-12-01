import React, { Component } from "react";

export default class Stopwatch extends Component {
  render() {
    const {
      setPomo,
      timerOn,
      timerStart,
      timerTime,
      countdownOn,
      countdownStart,
      countdownTime,
      currentTime,
      selectedClock,
      recentAll,
    } = this.props.item;

    const { handleClick } = this.props;

    let timer_secs = ("0" + (Math.floor(timerTime / 1000) % 60)).slice(-2);
    let timer_mins = ("0" + (Math.floor(timerTime / 60000) % 60)).slice(-2);
    let timer_hrs = ("0" + Math.floor(timerTime / 3600000)).slice(-2);

    return (
      <React.Fragment>
        {/* Stopwatch Title */}
        <div className="stopwatch-title">Stopwatch</div>

        {/* Stopwatch Display */}
        <div className="stopwatch-display">
          {timer_hrs} : {timer_mins} : {timer_secs}
        </div>

        {/* Control Buttons side by side */}
        <div className="flex-container">
          <div className="row control-buttons">
            {timerOn === false && timerTime === 0 && (
              <button
                className="play playerButtons"
                onClick={() => handleClick("timer_play")}
              />
            )}
            {timerOn === true && (
              <button
                className="pause playerButtons"
                onClick={() => handleClick("timer_pause")}
              />
            )}
            {/* need a resume button */}
            {/* {timerOn === false && timerTime > 0 &&(<button
                className="resume playerButtons"
                onClick={() => handleClick("resume")}
              />)} */}
            {timerOn === false && timerTime > 0 && (
              <button
                className="reset playerButtons"
                onClick={() => handleClick("timer_reset")}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
