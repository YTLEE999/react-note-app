import React, { useState } from "react";
import api from '../api';
import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    date: new Date(),
    content: ""
  });

  async function handleChangeInputTitle(event) {
      const title = event.target.value
      setNote({ title })
  };

  async function handleChangeInputContent(event) {
      const content = event.target.value
      setNote({ content })
  };

  async function handleChangeDate(event) {
    setNote({ date: event })
};

  async function addNote() {
      const { title, content, date  } = note;
      let mainDate = date;
      const taipei = moment.tz(mainDate, "Asia/Taipei");
      let dateObj = taipei.utc(true).format("L");
      const payload = { title, content, date: dateObj }

      await api.createNote(payload).then(res => {
          window.alert(`Note added successfully`)
          setNote({
            title: '',
            date: '',
            content: '',
          })
      })
      window.location.reload();
  }

      return (
        <div>
        <form className="create-note">
            <input
              name="title"
              onChange={handleChangeInputTitle}
              value={note.title}
              placeholder="Title"
            />
  
          <DatePicker
            selected={note.date}
            onChange={handleChangeDate}
            name="startDate"
            format="format"
            dateFormat="MM/dd/yyyy"
            />

          <textarea
            name="content"
            onChange={handleChangeInputContent}
            value={note.content}
            placeholder="Take a note..."
          />
            <Fab onClick={addNote}>
              <AddIcon />
            </Fab>
        </form>
      </div>
      )
  };



export default CreateArea;
