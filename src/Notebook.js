import React, {Component} from 'react';
import NotebookForm from './NotebookForm';
import NotebookItem from './NotebookItem';
import {Accordion, Icon, Form, List} from 'semantic-ui-react';
import DeleteModal from './DeleteModal';
import EditModal from './EditModal';

const notebookURL = '/api/notebooks/'
const noteURL = '/api/notes/'

class Notebook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notebooks: [],
      activeIndex: '',
      notebookId: '',
      noteForm: '',
      notes: [],
      deleteModal: false,
      deleteId: '',
      editModal: false,
      editId: ''
    }

    this.addNotebook = this.addNotebook.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleNoteFormValueChange = this.handleNoteFormValueChange.bind(this);
    this.getNotes = this.getNotes.bind(this);
    this.closeDeleteModal = this.closeDeleteModal.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentWillMount() {
    fetch(notebookURL+"?q="+this.props.cookie(document.cookie).id)
    .then((resp) => resp.json())
    .then(notebooks => this.setState({notebooks: notebooks}));
  }

  handleClick = (e, titleProps) => {
   const { index } = titleProps
   const { activeIndex } = this.state
   const newIndex = activeIndex === index ? -1 : index

   this.setState({ activeIndex: newIndex })
 }

  addNotebook(val) {
    fetch(notebookURL, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: val, userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(newNotebook => this.setState({notebooks: [...this.state.notebooks, newNotebook]}));
  }

  deleteNotebook(id) {
    const notebooks = this.state.notebooks.filter(notebook => notebook._id !== id);
    fetch(notebookURL + id, {method: "delete"})
    .then(resp => resp.json())
    .then(this.setState({notebooks: notebooks}))
    this.closeDeleteModal();
  }

  getNotebookId(id) {
    this.props.onOpen(id);
    this.setState({
      notebookId: id
    }, this.getNotes(id))
  }

  handleNoteFormValueChange(e) {
    this.setState({
      noteForm: e.target.value
    })
  }

  addNote(e) {
    fetch(noteURL, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: this.state.noteForm, notebookId: this.state.notebookId, userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(newNote => this.setState({notes: [...this.state.notes, newNote]}));
  }

  getNotes(notebookId) {
    this.setState({notebookId: notebookId}, () => {
      fetch(noteURL+"?q="+notebookId)
      .then((resp) => resp.json())
      .then(notes => (this.setState({notes: notes})));
    })
  }

  getNoteId(id) {
    this.props.onNoteOpen(id)
  }

  deleteNote(id) {
    const notes = this.state.notes.filter(note => note._id !== id);
    fetch(noteURL + id, {method: "delete"})
    .then(resp => resp.json())
    .then(this.setState({notes: notes}))
  }

  renderDeleteModal(id) {
    this.setState({
      deleteModal: true,
      deleteId: id
    })
  }

  closeDeleteModal() {
    this.setState({
      deleteModal: false,
      deleteId: ''
    })
  }

  renderEditModal(id) {
    this.setState({
      editModal: true,
      editId: id
    })
  }

  closeEditModal() {
    this.setState({
      editModal: false,
      editId: ''
    })
  }

  render() {
    const { activeIndex } = this.state;
      const notebooks = this.state.notebooks.map((n, index) => {
        const notes = this.state.notes.map(k => {
          return (
            <List.Item
            as='a'
            key={k._id}
            className="note"
            >
            <span onClick={this.getNoteId.bind(this, k._id)}>
            {k.name}
            </span>

            <i onClick={this.deleteNote.bind(this, k._id)} className="remove icon"></i>
            <i className="pencil icon"></i>
            </List.Item>);
        });
        return (  <span key={n._id}>
            <Accordion.Title active={activeIndex === index} index={index} onClick={this.handleClick}>
              <Icon onClick={this.getNotes.bind(this, n._id)} name='dropdown' />
              <NotebookItem
              name={n.name}
              onDelete={this.renderDeleteModal.bind(this, n._id)}
              onClick={this.getNotes.bind(this, n._id)}
              onEdit={this.renderEditModal.bind(this, n._id)}
              />
            </Accordion.Title>
            <Accordion.Content active={activeIndex === index}>
              <Form size="mini" onSubmit={this.addNote} notebookid={n._id}>
              <Form.Field>
              <input ref="new_note" placeholder="New Note" onChange={this.handleNoteFormValueChange}/>
              </Form.Field>
              </Form>
              <List>
              {notes}
              </List>
            </Accordion.Content>
          </span> )
      })

    return (
      <div>
      <NotebookForm addNotebook={this.addNotebook}/>
      <Accordion styled>
      {notebooks}
      </Accordion>
      <DeleteModal modal={this.state.deleteModal} close={this.closeDeleteModal.bind(this)} deleteNotebook={this.deleteNotebook.bind(this)} deleteId={this.state.deleteId}/>
      <EditModal modal={this.state.editModal} close={this.closeEditModal.bind(this)}/>
      </div>
    )
  }
}

export default Notebook;
