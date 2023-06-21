import * as  yup from 'yup';

//login validation

const LoginValidation = yup.object().shape({
    email:yup.string().email().required("Email is required").trim(),
    password:yup.string().required("Password is required")
    .min(6,"password must be at least 6 character")
    .max(20,"password must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"password must be contain a number")
});

//register validation
const RegisterValidation = yup.object().shape({
    email:yup.string().email().required("Email is required").trim(),
    password:yup.string()
    .required("Password is required")
    .min(6,"password must be at least 6 character")
    .max(20,"password must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"password must be contain a number"),
    fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 characters")
    .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters"),
  

});

const ProfileValidation = yup.object().shape({
    fullName: yup
    .string()
    .required("Full name is required")
    .max(20, "Full name must be less than 20 characters")
    .matches(/^[a-zA-Z\s]*$/, "Full name must contain only letters"),
  
    email:yup.string().email().required("Email is required").trim(),

});

const PasswordValidation = yup.object().shape({
    oldPassword:yup
    .string()
    .required("Password is required")
    .min(6,"password must be at least 6 character")
    .max(20,"password must be less than 20 characters")
    .matches(/(?=.*[0-9])/,"password must be contain a number"),
    newPassword:yup
.string()
.required("Password is required")
.min(6,"password must be at least 6 character")
.max(20,"password must be less than 20 characters")
.matches(/(?=.*[0-9])/,"password must be contain a number"),
confirmPassword: yup
.string()
.required("Password is required")
.min(6,"password must be at least 6 character")
.max(20,"password must be less than 20 characters")
.matches(/(?=.*[0-9])/,"password must be contain a number")
.oneOf([yup.ref("newPassword"), null], "Password must match"),
});

export {LoginValidation, RegisterValidation, ProfileValidation,PasswordValidation };
   
