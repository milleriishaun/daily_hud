import React, { Component } from "react";

import Skycons from "skycons-component";

export default class EnvIcon extends Component {
  render() {
    const { iconCode } = this.props;

    return (
      <div>
        <Skycons
          animate={true}
          iconColor="black"
          style={{ width: 64, height: 64 }}
          icon={iconCode}
        />
      </div>
    );
  }
}
