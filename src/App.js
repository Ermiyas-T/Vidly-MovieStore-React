import React, { Component } from "react";
import Movies from "./components/movies";
import Customers from "./components/customer";
import Rentals from "./components/rentals";
import NavBar from "./components/NavBar";
import { Route, Routes } from "react-router-dom";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Routes>
          <Route path="/login" Component={LoginForm} />
          <Route path="/register" Component={RegisterForm} />
          <Route path="/movies/:id" Component={MovieForm} />
          <Route path="/movies/new" Component={MovieForm} />
          <Route path="/movies" Component={Movies}></Route>
          <Route path="/customer" Component={Customers}></Route>
          <Route path="/rentals" Component={Rentals}></Route>
          <Route path="/not-found" Component={NotFound}></Route>
          <Route path="/" Component={Movies}></Route>
          <Route path="*" Component={NotFound}></Route>
        </Routes>
      </div>
    );
  }
}

export default App;
