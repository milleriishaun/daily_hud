import React, { Component } from "react";

import styled from "styled-components";

export default class Clock extends Component {
  render() {
    // Single-source of truth in non-proliferating data state is fine(no extra refreshes,
    // and no extra data in this case). Alternative, could use Context with ContextAPI.
    const { currentTime } = this.props.item;

    return (
      <ClockWrapper>
        <div className="flex-container">
          <div className="row">
            <div className="clock-title alight-items-center justify-content-center">
              {currentTime}
            </div>
          </div>
        </div>
      </ClockWrapper>
    );
  }
}

const ClockWrapper = styled.div`
  color: var(--mainBlue);
  font-size: 3rem;
  margin-bottom: 0rem;
  padding-bottom: 0rem;
  // background: rgba(50, 0, 200, 0.3);
`;
