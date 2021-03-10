const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Note = new Schema(
    {
        title: { type: String },
        date: { type: String },
        content: { type: String },
    },
    { timestamps: true },
    { collection: "dates" }
);

module.exports = mongoose.model('note', Note)
