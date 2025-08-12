const Movie = require("../models/movie.model");
 
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        movie: movie,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};
 
const getAllMovies = async (req, res) => {
  try {
    // query string
 
    // const sortBy = req.query.sortBy || "name";
    // const order = req.query.order === "desc" ? -1 : 1;
 
    // const movies = await Movie.find().sort({ [sortBy]: order });
 
   // pagination     1   2  3
   const page = req.query.page || 1;
   const limit = req.query.limit || 10;
   const skip = (page - 1) * limit;
   const movies = await Movie.find(req.query).skip(skip).limit(limit); // حفظ
 
 
 
    res
      .status(200)
      .json({ status: 200, length: movies.length, data: { movies: movies } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
 
const getMovieById = async (req, res) => {
  try {
    //const movie = await Movie.findOne({_id: req.params.id});
    const movie = await Movie.findById(req.params.id);
    res.status(200).json({ status: 200, data: { movie: movie } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
 
const updateMovieById = async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ status: "success", data: { movie: updatedMovie } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
 
const deleteMovieById = async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success", data: { movie: deletedMovie } });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};
 
module.exports = {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
 
 