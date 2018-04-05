import React, {Component} from "react";
// import {Link, IndexLink} from "react-router";

class Nav extends Component {

  notLoggedIn() {
    return (
      <div className="right menu" id="right-menu">
        <a className="item" id="login-nav-btn">Login</a>
        <a className="item" id="register-nav-btn">Register</a>
      </div>
    );
  }

  loggedIn() {
    return (
      <div className="right menu" id="right-menu">
        <a className="item" id="profile.btn">Username</a>
        <a className="item" id="logout-btn">Logout</a>
      </div>
    );
  }

  render() {
    const rightMenu = this.props.isLoggedIn ? this.loggedIn() : this.notLoggedIn();
    return (
      <div className="ui mini fixed inverted borderless menu">
  			<div className="header item"><i className="big clipboard outline icon"></i>NoteBook</div>
        {rightMenu}
  		</div>
    );
  }
}

export default Nav;
