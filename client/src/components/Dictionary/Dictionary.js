import React, { Component } from "react";

import { DictionaryConsumer } from "../../dictionaryContext";
import Practice from "./Practice";
import ReactTooltip from "react-tooltip";
import styled from "styled-components";

//TODO: Connect to Dictionary API(Merriam Webster), to allow replacement of initial words.

//TODO: Add a MongoDB for the words added.

export default class Dictionary extends Component {
  render() {
    return (
      <div className="flex-container">
        <div className="column text-center">
          <DictionaryWrapper>
            {/* Practice Box */}
            <Practice />

            <DictionaryConsumer>
              {value => {
                if (value.dictionaryData.length !== 6) {
                  return null;
                }
                // console.log(value.dictionaryData);
                return value.dictionaryData.map(item => {
                  const {
                    id,
                    word,
                    part_of_speech,
                    definition,
                    sentence,
                  } = item;

                  const showSubmitText = value.isWord ? (
                    <input type="submit" value="Lookup!" />
                  ) : (
                    <input disabled type="submit" value="sp?" />
                  );

                  // show Input and Submit, then hide on Submit
                  const changeWord = value.isWordChangeOpen ? (
                    <form onSubmit={e => value.handleSubmit(e, id)}>
                      <label>
                        <input
                          type="text"
                          className="dictionary-replace-input"
                          onChange={e => value.handleChange(e)}
                        />
                      </label>
                      {showSubmitText}
                    </form>
                  ) : null;

                  return (
                    <div key={item.id}>
                      <div className="flex-container">
                        {/* words with tooltips on right */}
                        <div className="column">
                          <WordWrapper>
                            <div
                              className="data-tip-text"
                              data-tip={definition}
                              data-event="click focus"
                            >
                              {word}:
                            </div>
                            <ReactTooltip
                              className="custom-theme"
                              globalEventOff="click"
                              effect="solid"
                              place={"right"}
                              border={true}
                              type={"dark"}
                            />
                          </WordWrapper>
                        </div>

                        {/* mini lookup-online button on right, using "push" className */}
                        <a
                          className="push mini-button"
                          rel="noopener noreferrer"
                          href={
                            "https://www.merriam-webster.com/dictionary/" + word
                          }
                          target="_blank"
                        >
                          <i className="fa fa-book-open mini-button-symbol" />
                        </a>

                        {/* mini replace-word button on right, using "push" className */}
                        <button
                          className="mini-button"
                          onClick={e => value.handleClick(e.target.value)}
                        >
                          <i className="fas fa-plus mini-button-symbol" />
                        </button>

                        {/* Input and Submit appear next to right-pushed mini-buttons */}
                        {changeWord}
                      </div>
                    </div>
                  );
                });
              }}
            </DictionaryConsumer>
          </DictionaryWrapper>
        </div>
      </div>
    );
  }
}

const DictionaryWrapper = styled.div`
  margin: 0;
  padding: 0.5rem;
  font-weight: bold;
  opacity: 0.25;
  border: 0.125rem solid transparent;
  border-color: #fefefe;
  border-radius: 0.5rem;
  width: 18rem;
  height: 23.5rem;
  // font-size was the culprit changing the size of the font-awesome icons,
  // thus changing the margin-bottom of the words too
  // font-size: 1.5rem;

  &:hover {
    opacity: 1;
  }
`;

// border: 0.125rem solid purple;
// border-radius: 0.9375rem 0.9375rem 0.9375rem 0.9375rem;
// margin: 0;
// padding: 1rem;

const WordWrapper = styled.div`
  text-align: left;
  background: var(--mainWhite);
  border-radius: 0.3125rem;
  margin-top: 0;
  margin-bottom: 0;
  // padding-left: 1rem;
  // padding-right: 1rem;
  font-size: 0.8rem;
  // flex-wrap: wrap;
  // width: 5vw;
  // justify-content: center;
  // align-items: center;
  // align-self: center;
`;
