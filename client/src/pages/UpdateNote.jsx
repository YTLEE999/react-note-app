import React, { Component } from 'react';
import api from '../api';

import styled from 'styled-components';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const Title = styled.h1.attrs({
    className: 'h1',
})`
    font-family: "McLaren", cursive;
`

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 100px 30px;
    font-family: "McLaren", cursive;
    font-size: x-large;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class UpdateNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            date: '',
            content: '',
        }
    }

    handleChangeInputTitle = async event => {
        const title = event.target.value
        this.setState({ title })
    }

    handleChangeInputDate = async event => {
        const date = event.target.value
        this.setState({ date })
    }

    handleChangeInputContent = async event => {
        const content = event.target.value
        this.setState({ content })
    }

    handleUpdateNote = async () => {
        const { id, title, date, content } = this.state
        const payload = { title, date, content }

        await api.updateNoteById(id, payload).then(res => {
            window.alert(`Note updated successfully`)
            this.setState({
                title: '',
                date: '',
                content: '',        
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const note = await api.getNoteById(id)

        this.setState({
            title: note.data.data.title,
            date: note.data.data.date,
            content: note.data.data.content,
        })
    }

    render() {
        const { title, date, content } = this.state
        return (
            <Wrapper>
                <Title>Update</Title>

                <Label>Title: </Label>
                <InputText
                    type="text"
                    value={title}
                    onChange={this.handleChangeInputTitle}
                />

                <Label>Date: </Label>
                <InputText
                    type="text"
                    value={date}
                    onChange={this.handleChangeInputDate}
                />

                <Label>Content: </Label>
                <InputText
                    type="text"
                    value={content}
                    onChange={this.handleChangeInputContent}
                />

                <a href="/" onClick={this.handleUpdateNote}><CheckCircleIcon fontSize="large"  /></a>
                <CancelButton href={'/'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default UpdateNote;
