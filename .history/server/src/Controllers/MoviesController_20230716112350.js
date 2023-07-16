import asyncHandler from "express-async-handler";
import Movie from "../models/MoviesModel.js";
import { MoviesData } from "../../Data/MovieData.js";
import mongoose  from "mongoose";
import User from "../models/UserModels.js";
import { logDOM } from "@testing-library/react";
//*******************PUBLIC Controllers *****/
//@desc import all movies
//@route POST /api/movies/import
//@access public 

const importMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();

  // const filePath = path.join(__dirname, '../../Data/MovieData.json');
  // const jsonData = JSON.stringify(movies, null, 2);
  // fs.writeFileSync(filePath, jsonData);

  // module.exports = jsonData;

  res.status(200).json(movies);
});

//@desc get all movies
//@route GET/api/movies
//@acess public
const getMovies = asyncHandler(async (req, res) => {
  try {
    // Filter movies by category, time, language, rate, year, and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex:search, $options: "i" } }),
    };

    // Load more movies functionality
    const page = Number(req.query.pageNumber) || 1; // If pageNumber is not provided in query, set it to 1
    const limit = 2; // 2 movies per page
    const skip = (page - 1) * limit; // Skip 2 movies per page

    // Find movies by query, skip, and limit
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
    // Get total number of movies
    const count = await Movie.countDocuments(query);

    // Send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit), // Total number of pages
      totalMovies: count,//total number of movie
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get movie by id
//@route Get /api/movies/:id
//@acess Public

const getMoviesById = asyncHandler(async (req, res) => {
  try{
    //find mivie by id in database

    const movie = await Movie.findById(req.params.id);
    //if the movie found send it to client
    if (movie){
      res.json(movie);
    }
    //if the movie is not found send 404 error
    else{
      res.status(404);
      throw new Error("Movie not Found");
    }

  }catch(error){
    res.status(400).json({message:error.message});
  }
})


//@desc Get top rated movies
//@route Get/api/movies/rated/top
//@acess Public
const getTopRatedMovies = asyncHandler(async (req, res) => {
  try {
    // Find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });

    // Send top rated movies to the client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


//@desc Get random movies
//@route Get /api/movies/random/all
//@acess Public

const getRandomMovies = asyncHandler(async (req, res) => {
  try{
    //find random movies
    const movies = await Movie.aggregate([{ $sample:{ size:8}}]);
    //send random movies to the client
    res.json(movies);

  } catch (error){
    res.status(400).json({ message:error.message});

  }
})

// *****PRIVATE CONTROLLERS*****//
//@desc Create movie review
//@route POST / api/movies/:id/reviews
//@acess Private

const createMovieReview = asyncHandler(async (req,res) => {
  const { rating, comment} = req.body;
  try{
    //find movie by id in database
    const movie = await Movie.findById(req.params.id);

    if(movie) {
      //check if the user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()

      );
      //if user already reviewed this movie send 400 error
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You Already Reviewed this Movie");

      }
      //else  create a new review
      const review ={
        userName: req.user.fullName,
        userId:req.user._id,
        userImage:req.user.image,
        rating: Number(rating),
        comment,

      }
      //push the new review to the reviews array
      movie.reviews.push(review);
      //increment the number of reviews
      movie. numberOfReviews = movie.reviews.length;

      //calculate the new rate
      movie.rate =  movie.reviews.reduce((acc, item) => item.rating + acc, 0) / movie.reviews.length;
      // save the movie in database
      await movie.save();
      //send the new movie to the client
      res.status(201).json({
        message:"Review Added"
      });
      
    } else {
      res.status(404);
      throw new Error("Movie not Found");
    }

  } catch (error){
    res.status(400).json({message:error.message});
  }
});

// ********ADMIN CONTROLLERS********//

//@desc Update  movie
//@route PUT/api/movies/:id
//@acess Private/Admin

const updateMovie =asyncHandler(async (req,res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    //find movie by id in database
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      //update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image= image || movie.image;
      movie.titleImage= titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews= numberOfReviews|| movie.numberOfReviews;
      movie.category = category ||movie.category;
      movie.time= time || movie.time;
      movie.language= language||movie.language;
      movie.year=year||movie.year;
      movie.video=video||movie.video;
      movie.casts=casts||movie.casts;

      //save the movie in database
      const updateMovie = await movie.save();
      //send the updated movie to client
      res.status(201).json(updateMovie);


    }else{
      res.status(404);
      throw new Error("Movie not found");


    }

  }catch(error) {
    res.status(400).json({message:error.message});
  }
});

//@desc Delete  movie
//@route Delete/api/movies/:id
//@acess Private/Admin
const deleteMovie = asyncHandler (async (req,res) => {
  try{
    //find movie in databse
    const movie = await Movie.findById(req.params.id);
    //if the movies is found delete it
    if (movie) {
      await movie.remove();
      res.json({ message:"Movie Removes"});
    }
    //if the movie is not found send 404 error 
    else{
      res.status(404);
      throw new Error("Movie not Found");
    }
  } catch (error){
    res.status(400).json({message:error.message})
  }
})

//@desc Delete all movie
//@route Delete/api/movies
//@acess Private/Admin

const deleteAllMovies = asyncHandler(async (req,res) => {
  try{
    //delete all movies
    await Movie.deleteMany({});
    res.json({message:"All movies removed"});
  
  }catch (error){
    res.status(400).json({message:errormessage})
  }
});


//@desc create movie
//@route Post/api/movies
//@acess Private/Admin

const  createMovie =asyncHandler(async (req,res) => {
  try {
    //get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    //create new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      //userId:req.user._id,

    });
    //save the movie in database
  if (movie) {
    const createdMovie = await movie.save();
    res.status(201).json(createdMovie);
  }
  else{
    res.status(400);
    throw new Error("Invalid movie data");
  }


  }catch(error) {
    res.status(400).json({message:error.message});
  }
});



const getRecommendataion = async(req, res) => {
  let watchedList = []
  let sim = []
  let moviesToRecommend = []
  const targetUid = req.params.id

  // get all users 
  const users = await User.find()

  // get all movies 
  const movies = await Movie.find()
  users.forEach(user => {
    let preference = []
    // to make watched list matrix

    movies.forEach(movie => {
      const watched = movie.reviews.some(review =>  {
        const reviewUserId = mongoose.Types.ObjectId(review.userId);
        const userObjectId = mongoose.Types.ObjectId(user._id);
        return reviewUserId.equals(userObjectId);
      });
     
      preference.push(watched ? 1 : 0)
    })
    watchedList.push({ userId: user.id, watched: preference })
  })

  //   get target user watched list
  const targetUserWatchedList = watchedList.find(
    entry => entry.userId === targetUid
  )
  const isOld = false
  if(targetUserWatchedList)
   isOld = targetUserWatchedList.watched.includes(1);
  if(isOld){ 
  //   calculate similarity of all user with target user
  watchedList.forEach(watched => {
    if (watched.userId === targetUid) return

    let simValue = cosSimilarity(targetUserWatchedList.watched, watched.watched)

    sim.push({ userId: watched.userId, value: simValue })
  })

  //   if any similarity value is not a number (NaN) remove it
  const similarity = sim.filter(entry => !isNaN(entry.value))

  //   sort similarity in accending order
  similarity.sort((a, b) => b.value - a.value)

  console.log('similarty', similarity)

  //   get movies that target user not watched

  const tUiD = mongoose.Types.ObjectId(targetUid);

   moviesToRecommend = movies.filter(movie => {
    return !movie.reviews.some(review =>{
      const reviewUserId = mongoose.Types.ObjectId(review.userId);
      return reviewUserId.equals(tUiD);
     
  })

})

  //   Top to similar user
  let topSimilarity = similarity.slice(0, moviesToRecommend.length)

  console.log('top similarity', topSimilarity)

  //   consider user rating for that movie
  moviesToRecommend.forEach(movie => {
    let weight = []
    topSimilarity.forEach(sim => {
      let rating = movie.reviews.find(review =>{
        const reviewUserId = mongoose.Types.ObjectId(review.userId);
        const simUserId = mongoose.Types.ObjectId(sim.userId);
        return reviewUserId.equals(simUserId);
        
      })
      weight.push(rating ? sim.value * rating.rating : sim.value)
    })

    weight.sort((a, b) => b - a)
    movie.weight = weight[0]
  })

  moviesToRecommend.sort((a, b) => b.weight - a.weight)
 
  
}else {
console.log("this is new user ")
  moviesToRecommend =   getHighestReview(movies)}

  res.status(200).json(moviesToRecommend)
}

// function to calculate cosine similarity
function cosSimilarity(a, b) {
  const dotProduct = a.reduce((acc, cur, index) => {
    acc += cur * b[index]
    return acc
  }, 0)
  const aMagnitude = Math.sqrt(
    a.reduce((sum, element) => sum + Math.pow(element, 2), 0)
  )
  const bMagnitude = Math.sqrt(
    b.reduce((sum, element) => sum + Math.pow(element, 2), 0)
  )
  const cosineSimilarity = dotProduct / (aMagnitude * bMagnitude)
  return Math.round(cosineSimilarity * 100) / 100
}

// get top rated movies b

function getHighestReview(movies){
  
  movies.sort((a, b) => {
    const aRating = a.reviews.length > 0 ? a.reviews[0].rating : 0;
    const bRating = b.reviews.length > 0 ? b.reviews[0].rating : 0;
    return bRating - aRating;
  });
  return movies
  }




export { 
  importMovies,
  getMovies,
   getMoviesById,
   getTopRatedMovies,
   getRandomMovies,
   createMovieReview,
   updateMovie,
   deleteMovie, 
   deleteAllMovies,
   createMovie,
   getRecommendataion,
   getHighestReview,
  };
