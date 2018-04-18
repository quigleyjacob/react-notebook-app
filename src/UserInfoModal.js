import React, {Component} from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';

class UserInfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConf: '',
      userId: this.props.cookie
    };

    this.handleChangeOne = this.handleChangeOne.bind(this);
    this.handleChangeTwo = this.handleChangeTwo.bind(this);
    this.handleChangeThree = this.handleChangeThree.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeOne(e) {
    this.setState({
      oldPassword: e.target.value
    })
  }
  handleChangeTwo(e) {
    this.setState({
      newPassword: e.target.value
    })
  }
  handleChangeThree(e) {
    this.setState({
      newPasswordConf: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.newPassword === this.state.newPasswordConf && this.state.newPassword.length > 0) {
      this.props.updateUser(this.state);
    } else {
      alert("You did not enter your new password properly.");
    }
  }

  render() {
    return (
      <Modal size='mini' open={this.props.modal} onClose={this.props.close}>
          <Modal.Header>
            Update your password
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field required>
                <input
                type='password'
                onChange={this.handleChangeOne}
                placeholder="Current Password"
                />
              </Form.Field>
              <Form.Field required>
                <input
                type='password'
                onChange={this.handleChangeTwo}
                placeholder="New Password"
                required
                />
              </Form.Field>
              <Form.Field required>
                <input
                type='password'
                onChange={this.handleChangeThree}
                placeholder="Confirm New Password"
                required
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
          <Button positive onClick={this.handleSubmit}>
          Submit
          </Button>
            <Button negative onClick={this.props.close}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

export default UserInfoModal;
