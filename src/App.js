import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddEvents from "./components/AddEvents/AddEvents";
import Home from "./components/Home/Home";
import NotMatch from "./components/NotMatch/NotMatch";
import "./App.css";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Registration from "./components/Registration/Registration";
import EventsDetails from "./components/EventsDetails/EventsDetails";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/addEvents">
            <AddEvents />
          </PrivateRoute>
          <Route path="/registration">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/eventsDetails/:id">
            <EventsDetails />
          </PrivateRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
