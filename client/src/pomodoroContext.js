import React, { Component } from "react";

import Countdown from "./components/Pomodoro/Countdown";
import Stopwatch from "./components/Pomodoro/Stopwatch";

const PomodoroContext = React.createContext();

class PomodoroProvider extends Component {
  state = {
    setPomo: [
      { id: 1, title: "countdown_play_25_5", minutes: 25, minutes_break: 5 },
      { id: 2, title: "countdown_play_32_8", minutes: 32, minutes_break: 8 },
      { id: 3, title: "countdown_play_50_10", minutes: 50, minutes_break: 10 },
    ],
    timerOn: false,
    timerStart: 0,
    timerTime: 0,
    countdownOn: false,
    countdownStart: 0,
    countdownTime: 0,
    currentTime: "",
    selectedClock: "",
    recentAll: [],
  };

  componentDidMount() {
    const date = new Date();
    const time = date.toLocaleTimeString();
    // Use new Date, and just use setInterval to check in with a new Date, rather than as time-keeper
    this.currentTimeInterval = setInterval(() => {
      this.setState({
        currentTime: time,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.currentTimeInterval);
  }

  startTimer = () => {
    // timer on (starter or resumer)
    this.setState({
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: Date.now() - this.state.timerTime,
    });
    // timer counter (per 1000ms)
    this.timer = setInterval(() => {
      this.setState({
        timerTime: Date.now() - this.state.timerStart,
      });
    }, 1000);
  };

  stopTimer = () => {
    this.setState({ timerOn: false });
    // use clearInterval whenever a component with setInterval is unmounted
    clearInterval(this.timer);
  };

  resetTimer = () => {
    // start at 0, and go from there
    this.setState({
      timerTime: 0,
      timerStart: 0,
    });
  };

  handleRecent = () => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    this.setState(prevState => {
      const newRecent = [...prevState.recentAll, time];
      return {
        recentAll: newRecent,
      };
    });
  };

  startCountdown = () => {
    console.log("hit"); // at least i know it was hit
    this.handleRecent();
    this.setState({
      countdownOn: true,
      countdownStart: this.state.countdownTime,
      countdownTime: this.state.countdownTime,
    });

    this.countdown = setInterval(() => {
      const newCountdown = this.state.countdownTime - 1000;
      if (newCountdown >= 0) {
        this.setState({
          countdownTime: newCountdown,
        });
      } else {
        this.handleRecent();
        clearInterval(this.countdown);
        this.setState({ countdownOn: false });

        // Intervals match "Quick Button Timers"
        for (let i = 0; i < this.state.setPomo.length; i++) {
          if (
            this.state.countdownStart ===
            this.state.setPomo[i].minutes * 60000
          ) {
            alert(
              `Pomodoro complete! Take a ${this.state.setPomo[i].minutes_break} minute break!`
            );
          }
        }
      }
    }, 1000);
  };

  stopCountdown = () => {
    clearInterval(this.countdown);
    this.setState({
      countdownOn: false,
    });
  };

  resetCountdown = () => {
    if (this.state.countdownOn === false) {
      this.setState({
        countdownTime: this.state.countdownStart,
      });
    }
  };

  handleClick = input => {
    if (input === "countdown_play") {
      this.startCountdown();
    } else if (input === "countdown_pause") {
      this.stopCountdown();
    } else if (input === "countdown_resume") {
      this.startCountdown();
    } else if (input === "countdown_reset") {
      this.resetCountdown();
    } else if (input === "timer_play") {
      this.startTimer();
    } else if (input === "timer_pause") {
      this.stopTimer();
    } else if (input === "timer_reset") {
      this.resetTimer();
    }
  };

  adjustCountdown = input => {
    const { countdownTime, countdownOn } = this.state;
    const max = 216000000;
    if (!countdownOn) {
      if (input === "incHours" && countdownTime + 3600000 < max) {
        this.setState({
          countdownTime: countdownTime + 3600000,
        });
      } else if (input === "decHours" && countdownTime - 3600000 >= 0) {
        this.setState({ countdownTime: countdownTime - 3600000 });
      } else if (input === "incMinutes" && countdownTime + 60000 < max) {
        this.setState({ countdownTime: countdownTime + 60000 });
      } else if (input === "decMinutes" && countdownTime - 60000 >= 0) {
        this.setState({ countdownTime: countdownTime - 60000 });
      } else if (input === "incSeconds" && countdownTime + 1000 < max) {
        this.setState({ countdownTime: countdownTime + 1000 });
      } else if (input === "decSeconds" && countdownTime - 1000 >= 0) {
        this.setState({ countdownTime: countdownTime - 1000 });
      } else if (input !== undefined) {
        // Intervals match "Quick Button Timers"
        for (let i = 0; i < this.state.setPomo.length; i++) {
          if (input === this.state.setPomo[i].title) {
            this.setState({
              countdownTime: this.state.setPomo[i].minutes * 60000,
            });
          }
        }
      } else {
        alert("Houston, we have a problem.");
      }
    }
  };

  render() {
    const { currentTime } = this.props.item;

    return (
      <div>
        <PomodoroContext.Provider
          value={{
            ...this.state,
            currentTime,
            handleClick: this.handleClick,
            adjustCountdown: this.adjustCountdown,
          }}
        >
          {this.props.children}
        </PomodoroContext.Provider>
        <Countdown
          item={this.state}
          handleClick={this.handleClick}
          adjustCountdown={this.adjustCountdown}
        />
        <Stopwatch item={this.state} handleClick={this.handleClick} />
      </div>
    );
  }
}

const PomodoroConsumer = PomodoroContext.Consumer;

export { PomodoroProvider, PomodoroConsumer };
