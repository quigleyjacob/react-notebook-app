import React, {Component} from 'react';

class Login extends Component {
  constructor() {
    super();
    this.state = {email: 'quigley.jacob3@icloud.com', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      email: e.target.email.value,
      password: e.target.password.value
    });
  }

  render() {
    return (
      <div>
        <div className="ui main text container segment">
          <div className="ui huge header center aligned">
            Notebook
          </div>
          <form onSubmit={this.handleSubmit} className="ui form" method="post">
            <div className="ui one column stackable center aligned page grid">
              <div className="column twelve wide">
                <input maxLength="40" type="email" name="email" placeholder="Enter Email here" value={this.state.email} required/>
              </div>
              <div className="column twelve wide">
                <input maxLength="20" type="password" name="password" placeholder="Enter Password here" required/>
              </div>
              <div className="column twelve wide">
                <button className="ui primary basic button fluid">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
