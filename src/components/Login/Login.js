import React, { useContext } from "react";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase_config";
import { Link, useHistory, useLocation} from "react-router-dom";
import "./Login.css";
import logo from "../../images/googleRe.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { UserContext } from "../../App";
const Login = () => {
  const app = initializeApp(firebaseConfig);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
      .then((result) => {
        const {displayName, email} = result.user;
        const newUserInfo = {name: displayName, email}
        setLoggedInUser(newUserInfo)
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage, errorCode, email, credential);
      });
   
  };

  return (
    <div className="login-container container">
      <div className="row login-content">
        <div className="col-xs-12 col-md-12 col-lg-12 text_content">
          <h1>Login With</h1>
          <button className="button" onClick={handleGoogleSignIn}>
            <img style={{ width: "45px", float: "left" }} src={logo} alt="" />{" "}
            <span>continue with Google</span>
          </button>
          <p>
            Don't have an account?<Link to="/registration">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
