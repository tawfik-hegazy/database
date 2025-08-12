const mongoose = require('mongoose');

const movieschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Movie name is required"]
  }
});
const Movie = mongoose.model("Movie", movieschema);

module.exports=Movie;