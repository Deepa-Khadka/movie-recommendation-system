import express from 'express'

import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'


import userRouter from './src/routes/UserRouter.js'
import moviesRouter from './src/routes/MoviesRouter.js'
import categoriesRouter from './src/routes/CategoriesRouter.js'

import { errorHandler } from './src/middlerware/errorMiddleware.js'
import Uploadrouter from './src/Controllers/UploadFile.js'


dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

//connect DB
connectDB();

//Main route

app.get("/", (req, res) => {

  res.send("API is running... ");
});
//other routes
app.use("/api/user", userRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/categories",categoriesRouter);
app.use("/api/upload", Uploadrouter);

//error handling middleware
app.use(errorHandler);




const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost/${PORT}`);
});
























// import ErrorHandler from './src/middlerware/errorHandler.js'
// import Movie from './src/routes/movie.js'
// import User from './src/routes/user.js'
// import Rating from './src/routes/rating.js'
// import WatchedList from './src/routes/watchList.js'

// const app = express()
// dotenv.config()

// const PORT = process.env.PORT || 8000

// app.use(bodyParser.json({ limit: '30mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// app.use(cors())

// // database configuration
// mongoose
//   .connect(process.env.CONNECTION_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() =>
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
//   )
//   .catch(err => console.log(err.message))

// // erro handler
// app.use(ErrorHandler)

// // routes
// app.use('/movie', Movie)
// app.use('/user', User)
// app.use('/rating', Rating)
// app.use('/watchList', WatchedList)
