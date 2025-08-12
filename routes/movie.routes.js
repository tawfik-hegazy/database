const moviecontrollers=require('../controllers/movie.controller')
const express=require('express')
const router=express.Router()


router
.route('/')
.post(moviecontrollers.createMovie )
.get(moviecontrollers.getAllMovies)

router
.route("/:id")
.get( moviecontrollers.getMovieById)
.patch(moviecontrollers.updateMovieById)
.delete(moviecontrollers.deleteMovieById)
module.exports=router;