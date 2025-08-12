const express = require('express');
const movieRouter = require('./routes/movie.routes');
const userRouter=require('./routes/user.routes')
const connectDB=require('./config/db')
const PORT = process.env.PORT||5000;
const path=require('path')
require("dotenv").config();
 
const app = express();
app.use(express.json());
app.use('/users',userRouter)
app.use('/movies',movieRouter)
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

connectDB()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
