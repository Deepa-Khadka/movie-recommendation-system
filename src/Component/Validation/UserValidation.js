import * as  yup from 'yup';

//login validation

const LoginValidation = yup.object().shape({
    email:yup.string().email().required("Email is reqired").trim(),
    password:yup.string().required("password is required")
    .min(6,"password must be at least 6 character")
    .max(20,"password must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"password must be contain a number")
});

//register validation
const RegisterValidation = yup.object().shape({
    email:yup.string().email().required("Email is required").trim(),
    password:yup.string()
    .required("Password is reqired")
    .min(6,"password must be at least 6 character")
    .max(20,"password must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"password must be contain a number"),
    fullName: yup.string().required("Full name re reqired")
    .max(20, "full name must be less than 20 character")
    .matches(/^[a-zA-Z]*$/, "full name must conatin only letter"),

});
export {LoginValidation, RegisterValidation};
   
