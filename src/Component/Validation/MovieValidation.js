 import * as yup from "yup"


 const ReviewValidation = yup.object().shape({
    comment: yup.string().required("Comment is required").max(
        150,"Comment hould be less than 150 character"
    ),
    rating:yup.number().required("Select a Rating"),
 });


 const movieValidation = yup.object().shape({
    name: yup.string().required("Please enter a  movie name")
    .max(50, "Movie name should be less than 50 characters"),
    time:yup.number().required("please enter a movie duration"),
    language:yup.string().required("Please enter a movie language"),
    year:yup.number().required("Please enter year of release"),
    category:yup.string().required("Please select movie category"),
    desc:yup.string().required("Please enter movie description")
    .max(300,"Movie description should be less than 300 character"),


 });
 
 export {ReviewValidation,movieValidation};