import { useSelector } from "react-redux";
import { likeMovieAction } from "../Redux/Actions/userActions";
import { toast } from "react-hot-toast";

//check if movie is added to favourites

const IfMovieLiked = (movie) => {
    const {likedMovies} = useSelector(state=> state.userGetFavoriteMovies)
    return likedMovies?.find((likedMovie) => likedMovie?._id === movie?._id)

}

//like movie function 
const LikeMovie = (movie,dispatch,userInfo) => {
    return !userInfo  ? toast.error("Please Login to add to favourites")
    :dispatch(
        likeMovieAction({
            movieId: movie._id,

        })
    );
       
}

export {
    IfMovieLiked,
    LikeMovie,
}