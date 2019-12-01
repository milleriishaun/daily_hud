import React, { Component } from "react";

import ReactTooltip from "react-tooltip";

export default class Countdown extends Component {
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
    // console.log("timerOn: ", timerOn);
    // console.log("timerStart: ", timerStart);
    // console.log("timerTime: ", timerTime);

    const { handleClick, adjustCountdown } = this.props;

    let countdown_secs = ("0" + (Math.floor(countdownTime / 1000) % 60)).slice(
      -2
    );
    let countdown_mins = ("0" + (Math.floor(countdownTime / 60000) % 60)).slice(
      -2
    );
    let countdown_hrs = ("0" + Math.floor(countdownTime / 3600000)).slice(-2);

    // Display "not yet" in recent tooltip if no Countdown recordings exist
    if (recentAll.length < 1) {
      recentAll[0] = "none yet";
    } else if (recentAll[0] === "none yet" && recentAll[1]) {
      recentAll.shift();
    }

    // Store all times in an array of HTML
    const recentList = recentAll.map(item => {
      return <li key={item}>{item}</li>;
    });

    return (
      // Countdown Timer
      <div className="flex-container">
        {/* Every part on top of each other */}
        <div className="column">
          {/* Part 1: Countdown Timer(not mini clock) Measure Labels */}
          <div className="countdown-label">hr : min : sec</div>

          {/* Part 2: Increment Buttons */}
          <div className="flex-container">
            {/* Side by side internal */}
            <div className="row">
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("incHours")}
              >
                &#8679;
              </button>
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("incMinutes")}
              >
                &#8679;
              </button>
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("incSeconds")}
              >
                &#8679;
              </button>
            </div>
          </div>

          {/* Part 3: Countdown Timer */}
          <div className="countdown-display">
            {countdown_hrs} : {countdown_mins} : {countdown_secs}
          </div>

          {/* Part 4: Decrement Buttons */}
          <div className="flex-container">
            {/* Side by side internal */}
            <div className="row">
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("decHours")}
              >
                &#8681;
              </button>
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("decMinutes")}
              >
                &#8681;
              </button>
              <button
                className="inc-dec-buttons"
                onClick={() => adjustCountdown("decSeconds")}
              >
                &#8681;
              </button>
            </div>
          </div>

          {/* Part 5: Control Buttons(play, pause, resume, reset) */}
          <div className="flex-container control-buttons">
            {/* Side by side internal(when not hidden) */}
            <div className="row">
              {countdownOn === false &&
                (countdownStart === 0 || countdownTime === countdownStart) && (
                  <button
                    className="play playerButtons"
                    onClick={() => handleClick("countdown_play")}
                  />
                )}
              {countdownOn === true && countdownTime >= 1000 && (
                <button
                  className="pause playerButtons"
                  onClick={() => handleClick("countdown_pause")}
                />
              )}
              {countdownOn === false &&
                (countdownStart !== 0 &&
                  countdownStart !== countdownTime &&
                  countdownTime !== 0) && (
                  <button
                    className="resume playerButtons"
                    onClick={() => handleClick("countdown_resume")}
                  />
                )}
              {(countdownOn === false || countdownTime < 1000) &&
                (countdownStart !== countdownTime && countdownStart > 0) && (
                  <button
                    className="reset playerButtons"
                    onClick={() => handleClick("countdown_reset")}
                  />
                )}
            </div>
          </div>

          {/* Part 6: Recent Button with ToolTips(facing down to not block Countdown) */}
          <div className="recent">
            <div
              className="recent-button"
              data-tip
              data-for="recentTooltip"
              data-event="click focus"
            >
              recent
            </div>
            <ReactTooltip
              className="custom-theme2"
              id="recentTooltip"
              globalEventOff="click"
              effect="solid"
              place={"bottom"}
              border={true}
              type={"dark"}
            >
              <ul>{recentList}</ul>
            </ReactTooltip>
          </div>
        </div>
      </div>
    );
  }
}
