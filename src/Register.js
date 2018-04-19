import React, {Component} from 'react';

// similar to login, this component is very easy to follow

class Register extends Component {
  constructor() {
    super();
    this.state = {email: '', password: '', passwordConf: '', firstName: '', lastName: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      email: e.target.email.value,
      password: e.target.password.value,
      passwordConf: e.target.passwordConf.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value
    }, () => {
      document.getElementById("register_form").reset();
      this.registerUser(this.state);
    });
  }

  registerUser(obj) {
    fetch('/api/users', {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(resp => {
      if(resp.message !== 'success') {
        if(resp.message.code === 11000) {
          alert("That email is already in use")
        } else {
          alert(resp.message);
        }
      } else {
        this.props.toggle();
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui main text container segment">
          <div className="ui huge header center aligned">
            Register
          </div>
          <form id="register_form" onSubmit={this.handleSubmit} className="ui form" method="post">
            <div className="field">
              <div className="two fields">
                <div className="field">
                  <input maxLength="20" type="text" name="firstName" placeholder="First Name" required/>
                </div>
                <div className="field">
                  <input maxLength="20" type="text" name="lastName" placeholder="Last Name" required/>
                </div>
              </div>
            </div>
            <div className="field">
              <input maxLength="40" type="text" name="email" placeholder="Email Address" required/>
            </div>
            <div className="field">
              <div className="two fields">
                <div className="field">
                  <input type="password" name="password" placeholder="Password" required/>
                </div>
                <div className="field">
                  <input type="password" name="passwordConf" placeholder="Re-enter Password" required/>
                </div>
              </div>
            </div>
            <button className="ui primary basic button fluid">Register</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
