const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  born: {
    type: Number,
    minlength: 4,
  },
})

module.exports = mongoose.model("Author", schema)
