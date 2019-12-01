import React, { Component } from 'react'

import { PomodoroConsumer } from '../../pomodoroContext'
import Timer from './Timer'
import styled from 'styled-components'

export default class Pomodoro extends Component {
  render () {
    return (
      <React.Fragment>
        <PomodoroWrapper>
          {/* Imperfect implementation that was removed */}
          {/* <div>
            <PomodoroConsumer>
              {value => {
                // this time has issues over time, along with Clock.js time
                return value.currentTime;
              }}
            </PomodoroConsumer>
          </div> */}
          <div className='flex-container'>
            {/* "Quick Pomodoro Timer" Buttons side by side */}
            <div className='row'>
              <PomodoroConsumer>
                {value => {
                  return value.setPomo.map(item => {
                    // console.log("value.setPomo.id: ", value.setPomo[0].id);
                    return (
                      <Timer
                        key={item.id}
                        item={item}
                        handleClick={() => value.handleClick(item.title)}
                        adjustCountdown={() =>
                          value.adjustCountdown(item.title)
                        }
                      />
                    )
                  })
                }}
              </PomodoroConsumer>
            </div>
          </div>
        </PomodoroWrapper>
      </React.Fragment>
    )
  }
}

const PomodoroWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-weight: bold;
  // border: 0.125rem solid purple;
  // border-radius: 0.9375rem 0.9375rem 0.9375rem 0.9375rem !important;
  // font-size: 1.5rem; note that this can mess up sizing
`
