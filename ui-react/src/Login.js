import React, {Component} from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      email: e.target.email.value,
      password: e.target.password.value
    }, () => {
      this.loginUser(this.state);
    });
  }

  loginUser(obj) {
    fetch('/api/users/login', {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(resp => {
      if(resp.message === "success") {
        document.cookie = "id="+resp.id+";";
        this.props.login();
      } else {
        alert(resp.message);
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui main text container segment">
          <div className="ui huge header center aligned">
            Login
          </div>
          <form onSubmit={this.handleSubmit} className="ui form" method="post">
            <div className="field">
              <input maxLength="40" type="email" name="email" placeholder="Email Address" required/>
            </div>
            <div className="field">
              <input maxLength="20" type="password" name="password" placeholder="Password" required/>
            </div>
            <button className="ui primary basic button fluid">Login</button>
          </form>
          <br />
          <a href="#Register" onClick={this.props.toggle}>Dont have an account? Register here</a>
        </div>
      </div>
    );
  }
}

export default Login;
