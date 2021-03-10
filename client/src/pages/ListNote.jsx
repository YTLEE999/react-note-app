import React, { Component } from 'react';
import api from '../api';
import "react-table-6/react-table.css" ;
import DeleteIcon from "@material-ui/icons/Delete";



class ListNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            notes: [],
            title: "",
            content: "",
            isLoading: false,
        }
    }

    handleDelete = async () => {
        const { id, title, content } = this.state
        await api.deleteNoteById(id).then(res => {
            window.alert(`Note deleted successfully`)
            this.setState({
                title: '',
                content: ''
            })
        })
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllNotes().then(notes => {
            this.setState({
                notes: notes.data.data,
                title: notes.data.title,
                content: notes.data.content,
                isLoading: false,
            })
        })
    }

    render() {
        const { notes, title, content } = this.state;

        return (
            <div>
            {notes.map(note => {
                return (
                <DeleteNote
                    key={note._id}
                    id={note._id}
                    title={note.title}
                    content={note.content}
                    onDelete={this.handleDelete}
                />
            )})
        }
        </div> 
        )
    }
}

export default ListNote;