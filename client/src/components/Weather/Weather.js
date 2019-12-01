import React, { Component } from "react";

import EnvIcon from "./EnvIcon";
import ReactLoading from "react-loading";
import { WeatherConsumer } from "../../weatherContext";
import styled from "styled-components";

export default class Weather extends Component {
  render() {
    return (
      <React.Fragment>
        <WeatherWrapper>
          <div className="weather-container container">
            <div className="column">
              <WeatherConsumer>
                {value => {
                  // intialize display placeholders
                  let displayWeatherResults;
                  let displayedResultsSelections;

                  // Access local storage data, for weatherObj
                  const weatherString = localStorage.getItem("weatherJSON");
                  const weatherObj = JSON.parse(weatherString);

                  // console.log("weatherObj", weatherObj);

                  // Load destructured data/display from weatherObj after localstorage is initialized
                  if (weatherObj !== null) {
                    // Destructure data(at the value's deepest level, not by each layer of nesting)
                    const { timezone } = weatherObj;

                    // provision b/c some places don't have currently data
                    let displayCurrentlySummary;
                    let displayCurrentlyApparentTemperature;
                    if (weatherObj.minutely) {
                      const {
                        apparentTemperature,
                        summary,
                      } = weatherObj.currently;
                      displayCurrentlySummary = <div>{summary}</div>;
                      displayCurrentlyApparentTemperature = (
                        <div>{apparentTemperature}&#176;C</div>
                      );
                    }
                    const { icon } = weatherObj.currently;

                    // provision b/c some places don't have minutely data
                    let displayMinutelySummary;
                    if (weatherObj.minutely) {
                      const { summary } = weatherObj.minutely;
                      displayMinutelySummary = <div>{summary}</div>;
                    }

                    displayWeatherResults = (
                      <div>
                        <div id="city_and_country">Sunnyvale, US</div>
                        <EnvIcon iconCode={icon} />
                        <div id="weather-currently-summary">
                          {weatherObj.currently ? displayCurrentlySummary : ""}
                        </div>
                        <div id="weather-minutely-summary">
                          {weatherObj.minutely ? displayMinutelySummary : ""}
                        </div>
                        <div id="weather-currently-apparentTemperature">
                          {weatherObj.currently
                            ? displayCurrentlyApparentTemperature
                            : ""}
                        </div>
                        <div id="timezone">timezone: {timezone}</div>
                      </div>
                    );
                  }

                  // Access local storage data, for parsedCityListObj
                  const parsedCityListString = localStorage.getItem("cityJSON");
                  const parsedCityListObj = JSON.parse(parsedCityListString);

                  // Load destructured data/display from parsedCityListObj after localstorage is initialized
                  if (parsedCityListObj !== null) {
                    // Get countries array
                    let onlyCountries = parsedCityListObj.map(
                      item => item.country
                    );

                    // Take only unique countries
                    let uniqueCountries = [...new Set(onlyCountries)];

                    let tempStore = [];

                    // Select first country location discovered using list of results(parsedCityListObj) with same city name
                    for (let i in uniqueCountries) {
                      for (let j in parsedCityListObj) {
                        // If country names match and a match to that country name has not been found,
                        // store result in an array(tempStore)
                        if (
                          parsedCityListObj[j].country === uniqueCountries[i] &&
                          tempStore
                            .map(item => item.country)
                            .includes(parsedCityListObj[j].country) === false
                        ) {
                          tempStore.push(parsedCityListObj[j]);
                        }
                      }
                    }

                    // Display each country as a button(tile)
                    displayedResultsSelections = tempStore.map(item => (
                      <button
                        key={item.id}
                        className="weather-country-tiles"
                        name={item}
                        onClick={e =>
                          value.handleClick(e, item.name, item.country)
                        }
                      >
                        {item.country}
                      </button>
                    ));
                  }

                  const showSubmitText = value.isCity ? (
                    <input
                      className="input-button"
                      type="submit"
                      value="Submit"
                    />
                  ) : (
                    <input
                      disabled
                      className="input-button"
                      type="submit"
                      value="sp?"
                    />
                  );

                  return (
                    <React.Fragment>
                      <div className="text-center">
                        {value.isLoading ? (
                          <div className="flex-container text-center">
                            <ReactLoading
                              type={"spinningBubbles"}
                              color={"#000000"}
                              height={"20%"}
                              width={"20%"}
                            />
                          </div>
                        ) : (
                          <React.Fragment>
                            {displayWeatherResults}
                          </React.Fragment>
                        )}
                      </div>
                      <div>
                        {parsedCityListObj !== null ? (
                          <div>
                            <div>{displayedResultsSelections}</div>
                          </div>
                        ) : null}
                      </div>
                      <form
                        onSubmit={e =>
                          value.handleSubmit(e, value.inputCityName)
                        }
                      >
                        <label>
                          <input
                            className="weather-input text-center"
                            autoComplete="off"
                            id="weather-input-value"
                            type="text"
                            placeholder="city, country"
                            onChange={e => value.handleChange(e)}
                          />
                        </label>
                        {showSubmitText}
                      </form>
                    </React.Fragment>
                  );
                }}
              </WeatherConsumer>
            </div>
          </div>
        </WeatherWrapper>
      </React.Fragment>
    );
  }
}

const WeatherWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-weight: bold;
  font-size: 1.5rem;
  // border: 0.125rem solid purple;
  // border-radius: 0.9375rem 0.9375rem 0.9375rem 0.9375rem !important;
`;
