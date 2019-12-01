import React, { Component } from "react";

import Client from "./Client";
import { rawData } from "./fakeData2";

const DictionaryContext = React.createContext();
//Provider
//Consumer

class DictionaryProvider extends Component {
  // dictionaryData contains all the data, and is intended to copy(rather than reference) the rawData variable. This allows
  // the data to be manipulated without dealing with 'updated references' issues in the future. However, I don't manipulate
  // data in the app. It is nice to have in place if there comes a time when I need it.
  // wordLocation contains the specific searched location, and is initialized with "iiidk". Location input takes other
  // dictionary words already in the rawData too. Once the api is hooked up, it will be able to take many locations.
  state = {
    dictionaryData: [],
    word: "test",
    inputWord: "",
    isWordChangeOpen: false,
    isLoading: false,
    isInputFilled: false,
    isWord: false,
  };

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
      },
      () => {
        Client.askDictionaryAPI(this.state.word, data => {
          // This filter happens every time localstorage dictionaryJSON needs refresh
          const dataWithShortDef = data.filter(item => item.hom > -1);
          const dictionaryJSON = JSON.stringify(dataWithShortDef);
          localStorage.setItem("dictionaryJSON", dictionaryJSON);

          this.setState({
            isLoading: false,
          });
        }).catch(err => {
          if (err) console.log("Cannot fetch dictionary data from API");
        });
      }
    );

    this.setDictionaryData();
  }

  // Copy data, rather than simply referencing it. This is best practice if manipulating data.
  setDictionaryData = () => {
    let tempDictionaryData = [];

    // this forEach() is done with rawData having 6 dictionary words
    rawData.forEach(item => {
      const singleItem = { ...item };
      tempDictionaryData = [...tempDictionaryData, singleItem];
    });
    this.setState(() => {
      return { dictionaryData: tempDictionaryData };
    });
  };

  getWord = id => {
    const foundWord = this.state.dictionaryData.find(item => item.id === id);
    return foundWord;
  };

  handleClick = input => {
    this.setState(() => {
      return {
        isWordChangeOpen: true,
        inputWord: input,
      };
    });
  };

  handleChange = e => {
    const inputValue = e.target.value;
    this.setState(
      () => {
        return {
          word: inputValue,
        };
      },
      () => {
        this.setState(
          {
            isLoading: true,
          },
          () => {
            Client.askDictionaryAPI(this.state.word, data => {
              const dataWithShortDef = data.filter(item => item.hom > -1);
              const dictionaryJSON = JSON.stringify(dataWithShortDef);
              if (dataWithShortDef.length > 0) {
                localStorage.setItem("dictionaryJSON", dictionaryJSON);
              }

              this.setState({
                isLoading: false,
                isWord: dataWithShortDef.length > 0,
              });
            }).catch(err => {
              if (err) console.log("Cannot fetch dictionary data from API");
            });
          }
        );
      }
    );
  };

  handleSubmit = (e, id) => {
    // Find which of the 6 word buttons was selected(corresponding dictionaryData array index position)
    const thisWord = this.getWord(id);

    // Copy current dictionaryData array
    const tempWords = [...this.state.dictionaryData];

    // Find corresponding index
    const index = tempWords.indexOf(thisWord);

    // Change the data in the copied array
    const thisWord2 = tempWords[index];
    thisWord2.word = this.state.word;

    const dictionaryResultsString = localStorage.getItem("dictionaryJSON");
    const dictionaryResultsObj = JSON.parse(dictionaryResultsString);

    // Change the data in the copied array
    thisWord2.part_of_speech = dictionaryResultsObj[0].fl;
    thisWord2.definition = dictionaryResultsObj[0].shortdef;
    thisWord2.sentence = `Madeup sentence using ${thisWord2.word}`;

    // this.setDictionaryData();

    this.setState(() => {
      return {
        dictionaryData: tempWords,
        isWordChangeOpen: false,
        isWord: false,
      };
    });
    e.preventDefault();
  };

  render() {
    return (
      <DictionaryContext.Provider
        value={{
          ...this.state,
          handleClick: this.handleClick,
          handleChange: this.handleChange,
          handleSubmit: this.handleSubmit,
        }}
      >
        {this.props.children}
      </DictionaryContext.Provider>
    );
  }
}

const DictionaryConsumer = DictionaryContext.Consumer;

export { DictionaryProvider, DictionaryConsumer };
