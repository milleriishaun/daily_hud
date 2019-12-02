import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { Component } from "react";

import Clock from "./components/Clock";
import Dictionary from "./components/Dictionary/Dictionary";
import { DictionaryProvider } from "./dictionaryContext";
import Navbar from "./components/Navbar";
import Pomodoro from "./components/Pomodoro/Pomodoro";
import { PomodoroProvider } from "./pomodoroContext";
import Weather from "./components/Weather/Weather";
import { WeatherProvider } from "./weatherContext";
import complice from "./img/complice.png";
import dictionary from "./img/starrystarrynight.jpg";
import github from "./img/github.png";
import habitica from "./img/habitica2.png";
import newsola from "./img/newsola.png";
import pomodoro from "./img/pomodoro_clock.jpg";
import swm from "./img/study_with_me.png";

export default class App extends Component {
  state = {
    currentTime: "",
  };

  handleChange = () => {
    const date = new Date();
    const time = date.toLocaleString();
    setTimeout(() => {
      this.setState({
        currentTime: time,
      });
    }, 1000);
  };

  render() {
    // for Clock tick
    this.handleChange();

    return (
      <React.Fragment>
        <div>
          {/* NavBar */}
          <Navbar />
          {/* Clock */}
          <Clock item={this.state} />
          {/* card size limit here */}
          <div className="flex-container card-img-size-limits">
            <div className="row">
              {/* Weather NOA */}
              <div className="card hovereffect">
                <img
                  src="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.pocketables.com%2Fimages%2F2012%2F07%2Fsunny-608x333.jpg"
                  alt="sunny rolling hills"
                  className="card-img-edit img-responsive"
                />
                <div className="card-img-overlay overlay text-center">
                  <h2>Weather Noa!</h2>
                  <div className="flex-container">
                    <div className="row pomodoro-backboard">
                      <WeatherProvider>
                        <Weather />
                      </WeatherProvider>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dictionary NOA */}
              <div className="card hovereffect">
                <img
                  src={dictionary}
                  alt="Starry Starry Night by Van Gogh"
                  className="card-img-edit img-responsive brighter"
                />
                <div className="card-img-overlay overlay text-center">
                  <h2>Dictionary Noa!</h2>
                  <DictionaryProvider>
                    <Dictionary />
                  </DictionaryProvider>
                </div>
              </div>

              {/* Pomodoro NOA */}
              <div className="card hovereffect">
                <img
                  src={pomodoro}
                  alt="pomodoro clock"
                  className="card-img-edit img-responsive"
                />
                <div className="card-img-overlay overlay text-center">
                  <h2>Pomodoro Noa!</h2>
                  <div className="flex-container">
                    <div className="row pomodoro-backboard">
                      <PomodoroProvider item={this.state}>
                        <Pomodoro />
                      </PomodoroProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links Title(uses NavBar style, uses Clock display functionality) */}
          <div className="flex-container">
            <div className="row">
              <div className="text-title text-center links-title">Links</div>
            </div>
          </div>

          {/* card link size limit here */}
          <div className="flex-container card-img-size-limits-links">
            <div className="row">
              {/* Habitica Link */}
              <div className="card card-links hovereffect-links">
                <a
                  rel="noopener noreferrer"
                  href="https://habitica.com/"
                  target="_blank"
                >
                  <img
                    src={habitica}
                    alt="sunny"
                    className="card-img card-img-edit-links img-responsive"
                  />

                  <div className="card-img-overlay overlay text-center">
                    <h2>Habitica</h2>
                  </div>
                </a>
              </div>

              {/* Study With Me Link */}
              <div className="card card-links hovereffect-links">
                <a
                  rel="noopener noreferrer"
                  href="https://www.youtube.com/results?search_query=study+with+me&sp=EgJAAQ%253D%253D"
                  target="_blank"
                >
                  <img
                    src={swm}
                    alt="study with me"
                    className="card-img card-img-edit-links img-responsive"
                  />

                  <div className="card-img-overlay overlay text-center">
                    <h2>Study With Me</h2>
                  </div>
                </a>
              </div>

              {/* Complice Link */}
              <div className="card card-links hovereffect-links">
                <a
                  rel="noopener noreferrer"
                  href="https://complice.co/room/lesswrong"
                  target="_blank"
                >
                  <img
                    src={complice}
                    alt="sunny"
                    className="card-img card-img-edit-links img-responsive"
                  />
                  <div className="card-img-overlay overlay text-center">
                    <h2>Complice</h2>
                  </div>
                </a>
              </div>

              {/* Github Link */}
              <div className="card card-links hovereffect-links">
                <a
                  rel="noopener noreferrer"
                  href="https://github.com/milleriishaun"
                  target="_blank"
                >
                  <img
                    src={github}
                    alt="sunny"
                    className="card-img card-img-edit-links img-responsive"
                  />
                  <div className="card-img-overlay overlay text-center">
                    <h2>Github</h2>
                  </div>
                </a>
              </div>

              {/* Newsola Link */}
              <div className="card card-links hovereffect-links">
                <a
                  rel="noopener noreferrer"
                  href="http://www.newsola.com/#/us/w,n,b,t"
                  target="_blank"
                >
                  <img
                    src={newsola}
                    alt="sunny"
                    className="card-img card-img-edit-links img-responsive"
                  />
                  <div className="card-img-overlay overlay text-center">
                    <h2>newsola</h2>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
