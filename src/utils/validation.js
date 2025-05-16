
import * as yup from "yup";


export const emailValidation = yup.string().required("Email is required").email("Invalid email address")
export const passwordValid =yup.string()
.required('Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
.min(8, 'Password must be at least 8 characters long')
.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]*$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character');
export const confirmPassword=  yup.string()
.required('Confirm password is required')
.oneOf([yup.ref('newpassword')], 'Passwords must match');

export const passwordValidation = yup.string().required("Please enter a password")
export const firstNameValidation = yup.string().required("First name is required")
export const lastNameValidation = yup.string().required("Last name is required")
export const countryValidation = yup.string().required("Country is required")
export const statusValidation = yup.string().required("Status is required")
export const genderValidation = yup.string().required("Gender is required")
export const termsValidation = yup.string().required('You must agree to the terms')
export const cityValidation = yup.string().required('City is required')
export const phoneValidation = yup.string().required('Phone No is required')
export const provinceValidation = yup.string().required('Province No is required')
export const usernameValidation = yup.string().required('Username No is required')
export const validatar = (msg)=>{
  return yup.string().required(msg)
}