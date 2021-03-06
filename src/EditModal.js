import React, {Component} from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';

// this modal is called when a user clicks on the pencil icon for a notebook,
// so they can change the name of the corresponding notebook

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {editModalField: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      editModalField: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editNotebook(this.props.editId, this.state.editModalField);
    this.props.close();
  }

  render() {
    return (
      <Modal size='mini' open={this.props.modal} onClose={this.props.close}>
          <Modal.Header>
            Edit your Notebook
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <input
                maxLength="20"
                onChange={this.handleChange}
                placeholder="New Notebook Name"
                />
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.props.close}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
    )
  }
}

export default EditModal;
