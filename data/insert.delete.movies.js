const connectDB = require('./config/db');
const movies = require('./movies.json');
const Movie = require('../models/movie.model');

const insertMovies = async () => {
    try {
        await connectDB();
        await Movie.insertMany(movies);

        console.log("uploading is in progress");
    } catch (error) {
        console.log("uploading failed ", error.message);
    }
};

const deletetMovies = async () => {
    try {
        await connectDB();
        await Movie.deleteMany();

        console.log("deleting ....");
    } catch (error) {
        console.log("uploading failed ", error.message);
    }
};

