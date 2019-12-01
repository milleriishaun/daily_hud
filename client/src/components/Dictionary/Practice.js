import React, { Component } from "react";

import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";

export default class Practice extends Component {
  render() {
    return (
      <TextWrapper>
        {/* Outsourced Component for React Textarea that allows more rows upon typing */}
        <TextareaAutosize
          minRows={3}
          maxRows={4}
          cols="31"
          defaultValue=""
          className="practice-area"
        />

        {/* Instructions for using the practice area */}
        <div className="paragraph-instructions">
          Use 5 words in a paragraph above
        </div>
      </TextWrapper>
      // Failed textarea html component
      // <div>
      //   <input
      //     width="48"
      //     height="48"
      //     className="textarea align-items-center justify-content-center font-weight-bold"
      //     placeholder="Use your 5 words in a paragraph here."
      //   />
      // </div>
    );
  }
}

const TextWrapper = styled.div`
  font-size: 0.8rem;
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold !important;
`;
