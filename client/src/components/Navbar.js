import React, { Component } from "react";

import { Link } from "react-router-dom";
import logo from "../logo2.svg";
import styled from "styled-components";

export default class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar">
        <div className="flex-container flex-container-edit">
          <div className="row">
            <Link to="/" className="link">
              <img src={logo} alt="home" className="logo" />
            </Link>
          </div>

          <div className="row">
            <div className="text-title text-center nav-title">DailyHUD</div>
          </div>

          <div className="row spacer">--------</div>
        </div>
      </NavWrapper>
    );
  }
}

const NavWrapper = styled.nav`
  padding-top: 0vh;
  padding-bottom: 0vh;
  // font-size: 2rem;
  // background: url("../img/green_branch_background.jpg");
`;
