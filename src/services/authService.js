import axios from "axios";

export const loginService=async({username,password})=> await axios.post("/api/auth/login",{username,password})
export const signupService=async({firstName,lastName,username,password})=> await axios.post("/api/auth/signup",{firstName,lastName,username,password})
