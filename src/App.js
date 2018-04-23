import React, { Component } from 'react';
import './App.css';
import Notebook from './Notebook'
import Nav from './Nav';
import Login from './Login';
import Register from './Register';
import Quill from './Quill';
import UserInfoModal from './UserInfoModal';
import { Grid } from 'semantic-ui-react';
import Todo from './Todo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReturning: true,
      isLoggedIn: false,
      nameOfOpen: '',
      idOfOpenNote: '',
      userInfoModal: false
    }

    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.loginPage = this.loginPage.bind(this);
    this.registerPage = this.registerPage.bind(this);
    this.logout = this.logout.bind(this);
    this.getUsername = this.getUsername.bind(this);
    this.fetchUsername = this.fetchUsername.bind(this);
  }
  componentDidMount() { //checks if user is logged in on page load
    this.setState({
      isLoggedIn: this.cookieToJSON(document.cookie).id ? true : false
    }, () => {
      if(this.state.isLoggedIn) {
        this.fetchUsername();
      }
    })
  }
  //https://stackoverflow.com/questions/5047346/converting-strings-like-document-cookie-to-objects
 cookieToJSON(str) {
  	str = str.split('; ');
  	var result = {};
  	for(var i = 0; i < str.length; i++) {
  		var cur = str[i].split('=');
  		result[cur[0]] = cur[1];
  	}
  	return result;
  }

  getNoteOpen(id) {//sets id of opened note to be displayed
    this.setState({
      idOfOpenNote: id
    })
  }
  //the two methods below toggle some boolean variables to determine if login, register, or main page is displayed
  toggleLoginRegister() {
    this.setState({
      isReturning: !this.state.isReturning
    })
  }
  toggleLogin() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn
    })
  }

  //based on the boolean methods above, these three methods display one of those options
  isNew() {
    return (
      <div className="App">
        <Register toggle={this.toggleLoginRegister}/>
      </div>
    );
  }
  isReturning() {
    return (
      <div className="App">
        <Login toggle={this.toggleLoginRegister} login={this.toggleLogin} name={this.getUsername}/>
      </div>
    );
  }
  loggedIn() {
    return (
      <Grid padded className='App document'>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
            <Notebook onNoteOpen={this.getNoteOpen.bind(this)} cookie={this.cookieToJSON}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Quill cookie={this.cookieToJSON} noteId={this.state.idOfOpenNote}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width={4}>
          <Todo cookie={this.cookieToJSON}/>
          </Grid.Column>
          <Grid.Column width={12}>
            <img alt="React banner" id="react-image" src='https://www.mycode.website/wp-content/uploads/2017/03/ReactBannerProject.png' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  loginPage() {
    this.setState({
      isLoggedIn: false,
      isReturning: true
    })
  }
  registerPage() {
    this.setState({
      isLoggedIn: false,
      isReturning: false
    })
  }
  logout() {
    document.cookie = 'id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState({
      isLoggedIn: false,
      isReturning: true
    })
  }
  getUsername(name) { // used when logging in a user
    this.setState({
      nameOfOpen: name
    })
  }
  fetchUsername() { //used when a user is already logged in when opening the page
    fetch('/api/users/' + this.cookieToJSON(document.cookie).id)
    .then(resp => resp.json())
    .then(found => {
      if(found !== null) {
        this.setState({nameOfOpen: found.firstName})
      }
    })
  }
  //two methods for dealing with the opening and closing to modal to reset password
  renderUserModal() {
    this.setState({
      userInfoModal: true
    })
  }
  closeUserModal() {
    this.setState({
      userInfoModal: false
    })
  }

  //called when a submits the form to update password
  updateUser(obj) {
    fetch('/api/users/confirm', { //first, we need to verify that this is the correct user
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(message => {
      if(message.message !== "success") {
        fetch('/api/users/' + this.cookieToJSON(document.cookie).id, { //then we change the password
          method: "put",
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(obj)
        })
        .then((resp) => resp.json())
        .then(message => {
            if(message.message === "success") {
              alert("Password successfully changed");
              this.closeUserModal();
            } else {
              alert("Could not change password");
            }
        });
      } else {
        alert(message.message);
      }
    })
  }

  render() {
    const showApp = this.state.isLoggedIn ? this.loggedIn() : (this.state.isReturning ? this.isReturning() : this.isNew());
    return (
      <div>
        <Nav
        isLoggedIn={this.state.isLoggedIn}
        login={this.loginPage}
        register={this.registerPage}
        logout={this.logout}
        showUser={this.state.nameOfOpen}
        userInfo={this.renderUserModal.bind(this)}
        />
        {showApp}
        <UserInfoModal cookie={this.cookieToJSON(document.cookie).id} modal={this.state.userInfoModal} close={this.closeUserModal.bind(this)} updateUser={this.updateUser.bind(this)}/>
      </div>
    );
  }
}

export default App;
