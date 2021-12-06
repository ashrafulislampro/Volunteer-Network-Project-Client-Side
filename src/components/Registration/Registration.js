import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Registration.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../Login/firebase_config";
import { UserContext } from './../../App';
import { Link, useHistory, useLocation } from "react-router-dom";

const Registration = () => {
  const app = initializeApp(firebaseConfig);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [userInfo, setUserInfo] = useState({
            email: "",
            name: "",
            password: "",
            error: "",
            success: "",
            description: "",
            date: ""

  })

 
  const handleBlurField = (e) => {
    console.log(e.target.value);
    let isUserFormValid = true;
    if(e.target.name === "name"){
              isUserFormValid = e.target.value.length > 6;
    }
    if(e.target.name === "email"){
              isUserFormValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value);
    }
    if(e.target.name === "password"){
              isUserFormValid =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(e.target.value);
    }
    if(isUserFormValid){
              const newUserInfo = {...userInfo};
              newUserInfo[e.target.name] = e.target.value;
              setUserInfo(newUserInfo);
    }
  };


  const handleSubmitForm = (e) => {
         
if(userInfo.email && userInfo.password){
  const auth = getAuth(app);
createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
  .then((res) => {
    const newUserInfo = {...userInfo};
    newUserInfo.error = '';
    newUserInfo.success = true;
    setUserInfo(newUserInfo);
    setLoggedInUser(newUserInfo);
    history.replace(from);
  })
  .catch((error) => {
    const errorCode = error.code
    const message = error.message
   const newUserInfo = {...userInfo};
   newUserInfo.error = error.message;
   newUserInfo.success = false;
   setUserInfo(newUserInfo);
   console.log(errorCode, message);
  });
}

          e.preventDefault();
        };
  return (
    <div className="registration_container container">
    <div className="row">
      <div className="register_form col-xs-12 col-md-12 col-lg-6">
        {/* <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "45ch" },
          }}
          noValidate
          autoComplete="off"
        > */}
          <form action="" onSubmit={handleSubmitForm}>
            <h3>Register as a volunteer</h3>
            <TextField
              className="text_field"
              id="standard-full-name"
              label="Full Name"
              type="name"
              name="name"
              onBlur={handleBlurField}
              autoComplete="current-name"
              variant="standard"
              required="name"
            />
            <br />
            <TextField
            className="text_field"
              id="standard-email-input"
              label="Email"
              name="email"
              type="email"
              onBlur={handleBlurField}
              autoComplete="current-email"
              variant="standard"
              required="email"
            />
            <br />
            <TextField
            className="text_field"
              id="standard-password-input"
              label="Password"
              name="password"
              type="password"
              onBlur={handleBlurField}
              autoComplete="current-password"
              variant="standard"
              required="password"
            />
            <br />
            <TextField
            className="text_field"
              id="standard-date-input"
              type="date"
              name="date"
              onBlur={handleBlurField}
              autoComplete="current-date"
              variant="standard"
              required="date"
            />
            <br />
            <TextField
            className="text_field"
              id="standard-description-input"
              label="Description"
              type="description"
              name="description"
              onBlur={handleBlurField}
              autoComplete="current-description"
              variant="standard"
              required="description"
            />
            <br />
            <input className="input_field" type="submit" value="Registration" />
            <p>Already registered?<Link to="/login">login</Link></p>
          </form>
        { /* </Box> */}
        </div>
      </div>
      {
        userInfo.error && <p style={{color: 'red', textAlign: 'center'}}>The email is already registered.</p>
      }
      {
        userInfo.success && <p style={{color: 'green', textAlign: 'center'}}>Registration is created successfully.</p>
      }
    </div>
  );
};

export default Registration;
