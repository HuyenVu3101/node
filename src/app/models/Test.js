const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const Test = new Schema({test: String })

module.exports = mongoose.model('Test', Test)