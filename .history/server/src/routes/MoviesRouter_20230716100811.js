import express from 'express';
import * as moviesController from '../Controllers/MoviesController.js';
import { protect ,admin} from '../middlerware/Auth.js';


const router = express.Router();

///***** PUBLIC ROUTES***** */
// Route for importing movies
router.post("/import", moviesController.importMovies);

// Route for fetching movies
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMoviesById );
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);


// to get recommentdation 

router.get('/recommendataion/:id', moviesController.getRecommendataion)

//***** PRIVATE ROUTES****** */

router.post("/:id/reviews", protect, moviesController.createMovieReview);

//********** ADMIN ROUTES********** */
router.put("/:id",protect, admin, moviesController.updateMovie);
router.delete("/:id",protect, admin, moviesController.deleteMovie);
router.delete("/",protect,admin, moviesController.deleteAllMovies);
router.post("/",protect,admin, moviesController.createMovie);






export default router;