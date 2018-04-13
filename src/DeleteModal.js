import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';

class DeleteModal extends Component {

  render() {
    return (
      <Modal size='mini' open={this.props.modal} onClose={this.props.close}>
          <Modal.Header>
            Delete your Notebook
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete this notebook?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.props.close}>
              No
            </Button>
            <Button onClick={this.props.deleteNotebook.bind(this, this.props.deleteId)} positive icon='checkmark' labelPosition='right' content='Yes' />
          </Modal.Actions>
        </Modal>
    )
  }
}

export default DeleteModal;
