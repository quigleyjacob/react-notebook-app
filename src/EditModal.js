import React, {Component} from 'react';
import {Modal, Button, Form} from 'semantic-ui-react';

class EditModal extends Component {

  render() {
    return (
      <Modal size='mini' open={this.props.modal} onClose={this.props.close}>
          <Modal.Header>
            Edit your Notebook
          </Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.props.close}>
              <Form.Field>
                <input placeholder="New Notebook Name" />
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
