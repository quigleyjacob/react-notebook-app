import React, {Component} from "react";

class Nav extends Component {

  notLoggedIn() {
    return (
      <div className="right menu" id="right-menu">
        <a className="item" onClick={this.props.login}>Login</a>
        <a className="item" onClick={this.props.register}>Register</a>
      </div>
    );
  }

  loggedIn() {
    return (
      <div className="right menu" id="right-menu">
        <a className="item" >{this.props.showUser}</a>
        <a className="item" onClick={this.props.logout}>Logout</a>
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
