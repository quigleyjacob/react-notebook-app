import React, {Component} from "react";
import {Link, IndexLink} from "react-router";

class Nav extends Component {
  render() {
    return (
      <div className="ui mini fixed inverted borderless menu">
  			<div className="header item"><i className="big clipboard outline icon"></i>NoteBook</div>
  			<a id="calendar-btn" className="item">Home</a>
  			<div className="right menu" id="right-menu">
  				<a className="item" id="login-nav-btn">Login</a>
  				<a className="item" id="register-nav-btn">Register</a>
  				<a className="item" id="logout-btn">Logout</a>
  			</div>
  		</div>
    );
  }
}

export default Nav;
