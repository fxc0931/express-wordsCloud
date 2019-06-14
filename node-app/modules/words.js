const mongoose = require("mongoose")
const Schema = mongoose.Schema

// Create Schema
const WordsScheam = new Schema({
    dataSource: {
        type: Array,
        required: true
    }
})

module.exports = Words = mongoose.model("words", WordsScheam);
