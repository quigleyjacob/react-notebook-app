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
    this.editNotebookName= this.editNotebookName.bind(this);
  }

  componentWillMount() { //get all notebooks associated with the currently logged in user
    fetch(notebookURL+"?q="+this.props.cookie(document.cookie).id)
    .then((resp) => resp.json())
    .then(notebooks => this.setState({notebooks: notebooks}));
  }

  handleClick = (e, titleProps) => { // called when a notebook is clicked on, used to reveal the notes associated with that notebook
   const { index } = titleProps
   const { activeIndex } = this.state
   const newIndex = activeIndex === index ? -1 : index

   this.setState({ activeIndex: newIndex })
 }

  addNotebook(val) { //val is the name of the new notebook
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

  editNotebookName(id, newName) { //is called when the modal form is submitted to alter name of notebook
    fetch('/api/notebooks/' + id, {
      method: "put",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: newName, userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(name => {
      let notebooks = [];
      for(let i = 0; i < this.state.notebooks.length; i++) { //after the data is changed on the backend, this loop applies those changes to the client
        if(this.state.notebooks[i]._id === id) {
          const updated = this.state.notebooks[i];
          updated.name = name.name;
          notebooks.push(updated);
        } else {
          notebooks.push(this.state.notebooks[i])
        }
      }
      this.setState({
        notebooks: notebooks
      })
    })
  }

  deleteNotebook(id) {
    const notebooks = this.state.notebooks.filter(notebook => notebook._id !== id);
    fetch(notebookURL + id, {
      method: "delete",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({userId: this.props.cookie(document.cookie).id})
    })
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

  handleNoteFormValueChange(e) { //is called when the form to create a note is changed
    this.setState({
      noteForm: e.target.value
    })
  }

  addNote(e) {
    let header="<h1>"+this.state.noteForm+"</h1>"
    fetch(noteURL, {
      method: "post",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({name: this.state.noteForm, notebookId: this.state.notebookId, userId: this.props.cookie(document.cookie).id, body: header})
    })
    .then(resp => resp.json())
    .then(newNote => this.setState({notes: [...this.state.notes, newNote], noteForm: ''}));
  }

  getNotes(notebookId) {
    this.setState({notebookId: notebookId, noteForm: ''}, () => {
      fetch(noteURL+"?q="+notebookId)
      .then((resp) => resp.json())
      .then(notes => (this.setState({notes: notes})));
    })
  }

  getNoteId(id) {
    this.props.onNoteOpen(id)
  }

  deleteNote(id) {
    fetch(noteURL + id,{
      method: "delete",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({userId: this.props.cookie(document.cookie).id})
    })
    .then(resp => resp.json())
    .then(() => {
      const notes = this.state.notes.filter(note => note._id !== id);
      this.setState({notes: notes})
    })
  }

  //next two methods apply to the showing of the delete modal
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
  // like the delete modal, these two are for the edit notebook namd modal
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
      const notebooks = this.state.notebooks.map((n, index) => { //gets information to diaply the notebook
        const notes = this.state.notes.map(k => { //gets information for all notes associated with the notebook
          return (
            <List.Item
            as='span'
            key={k._id}
            className="note"
            >
            <span onClick={this.getNoteId.bind(this, k._id)}>
            {k.name}
            </span>

            <i onClick={this.deleteNote.bind(this, k._id)} className="remove icon"></i>
            </List.Item>);
        });
        return (  <div key={n._id}>
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
              <Form size="mini" onSubmit={this.addNote}>
              <Form.Field>
              <input maxLength="20" value={this.state.noteForm} ref="new_note" placeholder="New Note" onChange={this.handleNoteFormValueChange}/>
              </Form.Field>
              </Form>
              <List>
              {notes}
              </List>
            </Accordion.Content>
          </div> )
      })
    return (
      <div>
      <NotebookForm addNotebook={this.addNotebook}/>
      <Accordion styled>
      {notebooks}
      </Accordion>
      <DeleteModal modal={this.state.deleteModal} close={this.closeDeleteModal.bind(this)} deleteNotebook={this.deleteNotebook.bind(this)} deleteId={this.state.deleteId}/>
      <EditModal modal={this.state.editModal} close={this.closeEditModal.bind(this)} editNotebook={this.editNotebookName.bind(this)} editId={this.state.editId}/>
      </div>
    )
  }
}

export default Notebook;
