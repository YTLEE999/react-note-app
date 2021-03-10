import React, { Component } from 'react';
import api from '../api';
import ReactTable from 'react-table-6';

import "react-table-6/react-table.css" ;
import styled from 'styled-components';
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';


const Update = styled.div`
    color: #f50057;
    cursor: pointer;
`
const Delete = styled.div`
    color: #f50057;
    cursor: pointer;
`

class UpdateNote extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/notes/update/${this.props.id}`
    }
    
    render() {
        return <Update onClick={this.updateUser}><EditIcon /></Update>
    }
    
}


class DeleteNote extends Component {
    deleteUser = event=> {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete this note permanently?`,
            )
        ) {
            api.deleteNoteById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}><DeleteIcon /></Delete>
    }
}



class NoteList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: [],
            columns: [],
            isLoading: false,
        };
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllNotes().then(notes => {
            this.setState({
                notes: notes.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { notes, isLoading } = this.state

        const columns = [
            {
                Header: "Index",
                id: "row",
                show: false,
                filterable: false,
                Cell: (row) => {
                    return <div>{row.index + 1}</div>;
                }
            },
            {
                Header: () => <strong>Title</strong>,
                accessor: 'title',
            },
            {
                Header: 'Content',
                accessor: 'content',
                show: false,
            },
            {
                Header: () => <strong>Date</strong>,
                accessor: 'date',
                width: 120,
            },
            {
              Header: "",
              columns: [
                {
                  expander: true,
                  Header: () => <strong>Note</strong>,
                  width: 65,
                  Expander: ({ isExpanded, ...rest }) =>
                    <div>
                      {isExpanded
                        ? <span><ExpandMoreIcon /></span>
                        : <span><ExpandMoreIcon /></span>}
                    </div>,
                  style: {
                    cursor: "pointer",
                    color: "#f50057",
                    fontSize: 25,
                    padding: "0",
                    textAlign: "center",
                    userSelect: "none"
                  },
                }
              ]
            },
            {
                Header: '',
                width: 60,
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateNote id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                width: 50,
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteNote id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!notes.length) {
            showTable = false
        }

        return (
            <div className="note">
                {showTable && (
                    <ReactTable
                        data={notes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                        SubComponent={(v) => <div style={{ padding: '50px' }}>{v.row.content}</div>}
                    />
                )}
            </div>
        )
    }
}

export default NoteList