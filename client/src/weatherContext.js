import React, { Component } from "react";

import Client from "./Client";
import cityList1 from "./city.list1.json";
import cityList2 from "./city.list2.json";

// cityList must be split in two b/c Heroku can only read ~100000 lines of a single json file

const WeatherContext = React.createContext();
//Provider
//Consumer

class WeatherProvider extends Component {
  // cityList contains all the city IDs and names, and will not be changed.
  // Referencing data versus copying data, does not matter when data will not change.
  state = {
    localCityData: [],
    inputCityName: "Sunnyvale, US", // default value of Sunnyvale's weather
    isCity: false,
    isLoading: false,
  };

  componentDidMount() {
    // List of all cities with inputCityName of "Sunnyvale"
    // Take first match of both city and country
    const citiesSelectedByName = this.cleanLocation(this.state.inputCityName);

    // Loading state provisioned with Loading text
    this.setState(
      {
        isLoading: true,
      },
      () => {
        // Note: Call API, and store data in local storage
        // Note: Fetch is asynchronous, therefore, it completes after every other component-rendering is compete.
        // Note: this.setState is a callback function; it is called after everything in the parent function is run.
        // Just grab first match here, considering that there may be multiple "Sunnyvale, US" with different IDs.
        Client.askDarkSky(citiesSelectedByName, data => {
          // using local storage, for weather
          const weatherJSON = JSON.stringify(data);
          localStorage.setItem("weatherJSON", weatherJSON);

          // using local storage, for locations(so autocomplete buttons for country appear correctly)
          const tempCityData = citiesSelectedByName;
          const tempCityJSON = JSON.stringify(tempCityData);
          localStorage.setItem("cityJSON", tempCityJSON);

          this.setState({
            isCity: true,
            isLoading: false,
          });
        }).catch(err => {
          if (err) console.error("Cannot fetch Weather Data from API, ", err);
        });
      }
    );
  }

  handleChange = e => {
    const inputValue = e.target.value;

    // Take first match of both city and country
    const citiesSelectedByName = this.cleanLocation(inputValue);

    this.setState({
      inputCityName: inputValue,
      isCity: citiesSelectedByName.length > 0,
    });

    // Update local data after each text input in the submit box
    if (citiesSelectedByName.length > 0) {
      const tempCityData = citiesSelectedByName;
      const tempCityJSON = JSON.stringify(tempCityData);
      localStorage.setItem("cityJSON", tempCityJSON);
    }
  };

  handleClick = (e, name, country) => {
    this.setState(
      () => {
        return {
          inputCityName: name + ", " + country,
          isCity: true,
        };
      },
      // Update submit input text
      () => {
        document.getElementById("weather-input-value").value =
          name + ", " + country;
        return;
      }
    );

    e.preventDefault();
  };

  handleSubmit = (e, value_inputCityName) => {
    // Take first match of both city and country
    const citiesSelectedByName = this.cleanLocation(this.state.inputCityName);

    this.setState(
      {
        isLoading: true,
      },
      () => {
        // Call on Express server and make it fetch data from the remote DarkSky API
        Client.askDarkSky(citiesSelectedByName, data => {
          // Update local weather data
          const weatherJSON = JSON.stringify(data);
          localStorage.setItem("weatherJSON", weatherJSON);

          this.setState(
            {
              isCity: citiesSelectedByName.length > 0,
              isLoading: false,
            },
            // Update Location Text
            () => {
              document.getElementById(
                "city_and_country"
              ).innerHTML = value_inputCityName;
            }
          );
        }).catch(err => {
          if (err) console.error("Cannot fetch Weather Data from API, ", err);
        });
      }
    );

    e.preventDefault();
  };

  cleanLocation = inputCityNameVal => {
    const cityList = cityList1.concat(cityList2);
    const citiesSelectedByName = cityList.filter(item => {
      const splitStrArr = this.splitText(inputCityNameVal);
      const result = this.nameAndCountryExist(item, splitStrArr);
      return result;
    });
    return citiesSelectedByName;
  };

  selectOneLocation = (IdNameCountryArr, inputStoredInState) => {
    const citySelectedIds = IdNameCountryArr.map(item => item.id);
    const citySelectedNames = IdNameCountryArr.map(item => item.name);
    const citySelectedCountries = IdNameCountryArr.map(item => item.country);

    const splitStrArr = this.splitText(inputStoredInState);

    let isLocated;
    for (let i = 0; i < IdNameCountryArr.length; i++) {
      if (
        citySelectedNames[i] === splitStrArr[0] &&
        citySelectedCountries[i] === splitStrArr[1]
      ) {
        isLocated = citySelectedIds[i];
        return isLocated;
      } else if (
        citySelectedNames[i] === splitStrArr[0] &&
        splitStrArr[1] === ""
      ) {
        isLocated = citySelectedIds[i];
        return isLocated;
      }
    }
  };

  splitText = str => {
    const tempStr = str;

    const indexOfComma = tempStr.indexOf(",");

    let cityPartOfString;
    let countryPartOfString;
    if (indexOfComma === -1) {
      countryPartOfString = "";
      cityPartOfString = tempStr;
    } else {
      cityPartOfString = tempStr.substring(0, indexOfComma);
      countryPartOfString = tempStr.substring(indexOfComma + 2);
    }

    return [cityPartOfString, countryPartOfString];
  };

  nameAndCountryExist = (item, arr) => {
    if (item.name === arr[0] && item.country === arr[1]) {
      return item;
    } else if (item.name === arr[0] && arr[1] === "") {
      return item;
    }
    return null;
  };

  render() {
    return (
      <WeatherContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          handleClick: this.handleClick,
          handleSubmit: this.handleSubmit,
        }}
      >
        {this.props.children}
      </WeatherContext.Provider>
    );
  }
}

const WeatherConsumer = WeatherContext.Consumer;

export { WeatherProvider, WeatherConsumer };
