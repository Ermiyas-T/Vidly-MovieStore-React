// import React from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// import getAllGenres from "../services/fakeGenreService";
// import { saveMovie } from "../services/fakeMovieService";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import { getMovie } from "../services/fakeMovieService";
// // import { useNavigate } from "react-router-dom";
// class MovieForm extends Form {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: {
//         title: "",
//         genreId: "",
//         stockNumber: "",
//         dailyRentalRate: "",
//       },
//       genres: [],
//       error: {},
//     };
//   }
//   componentDidMount() {
//     const genres = getAllGenres();
//     this.setState({ genres });

//     const movieId = this.props.match.params.id;
//     if (movieId === "new") return;

//     const movie = getMovie(movieId);
//     if (!movie) return this.props.history.replace("/not-found/");

//     this.setState({ data: this.mapToViewModel(movie) });

//     // console.log("first", genres);
//     // this.setState({});
//   }
//   mapToViewModel(movie) {
//     return {
//       _id: movie._id,
//       title: movie.title,
//       genreId: movie.genreId,
//       numberInStock: movie.numberInStock,
//       dailyRentalRate: movie.dailyRentalRate,
//     };
//   }
//   schema = {
//     _id: Joi.string(),
//     movieGenre: Joi.string().required().label("Movie Genre"),
//     title: Joi.string().required().label("Title"),
//     stockNumber: Joi.number()
//       .integer()
//       .min(1)
//       .max(100)
//       .required()
//       .label("Stock Number"),
//     dailyRentalRate: Joi.number().integer().min(0).max(10).required(),
//   };
//   doSubmit = () => {
//     saveMovie(this.state.data);

//     this.props.history.push("/movies");
//   };
//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("saved");
//     // after
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           {this.renderInputField("title", "Title")}

//           {this.renderSelect("genreId", "Genre", this.state.genres)}
//           {/** name , label , option */}
//           {this.renderInputField("numberInStock", "Number in stock", "number")}
//           {this.renderInputField("dailyRentalRate", "dailyRentalRate")}
//           {this.renderButton("Save")}
//         </div>
//       </form>
//     );
//   }
// }
// export default MovieForm;

/////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// // import { useNavigate, useParams } from "react-router-dom";
// import getAllGenres from "../services/fakeGenreService";
// import Joi from "joi-browser";
// import Form from "./common/form";
// import { getMovie } from "../services/fakeMovieService";

// class MovieForm extends Form {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: {
//         title: "",
//         genreId: "",
//         stockNumber: "",
//         dailyRentalRate: "",
//       },
//       genres: [],
//       error: {},
//     };
//   }

//   componentDidMount() {
//     const genres = getAllGenres();
//     this.setState({ genres });

//     const movieId = this.props.match.params.id;
//     if (movieId === "new") return;

//     const movie = getMovie(movieId);
//     if (!movie) return this.props.history.replace("/not-found/");

//     this.setState({ data: this.mapToViewModel(movie) });
//   }

//   mapToViewModel(movie) {
//     return {
//       _id: movie._id,
//       title: movie.title,
//       genreId: movie.genreId,
//       numberInStock: movie.numberInStock,
//       dailyRentalRate: movie.dailyRentalRate,
//     };
//   }

//   schema = {
//     _id: Joi.string(),
//     movieGenre: Joi.string().required().label("Movie Genre"),
//     title: Joi.string().required().label("Title"),
//     stockNumber: Joi.number()
//       .integer()
//       .min(1)
//       .max(100)
//       .required()
//       .label("Stock Number"),
//     dailyRentalRate: Joi.number().integer().min(0).max(10).required(),
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("saved");
//   };

//   render() {
//     return (
//       <form onSubmit={this.handleSubmit}>
//         <div className="form-group">
//           {this.renderInputField(
//             "title",
//             "Title",
//             "text",
//             this.state.error.title
//           )}
//           {this.renderSelect(
//             "genreId",
//             "Genre",
//             this.state.genres,
//             this.state.error.genreId
//           )}
//           {this.renderInputField(
//             "numberInStock",
//             "Number in stock",
//             "number",
//             this.state.error.stockNumber
//           )}
//           {this.renderInputField("dailyRentalRate", "dailyRentalRate", "text", this.state.error.dailyRentalRate)}
//           {this.renderButton("Save")}
//         </div>
//       </form>
//     );
//   }
// }

// export default MovieForm;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MovieForm.js
// import React, { Component } from "react";
import Joi from "joi-browser";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import getAllGenres from "../services/fakeGenreService";
import Form from "./common/form";
import { withRouter } from "./withRouter";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    error: {},
  };

  schema = {
    _id: Joi.string(),
    genreId: Joi.string().required().label("Genre"),
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .integer()
      .min(0)
      .max(10)
      .required()
      .label("dailyRentalRate"),
  };

  componentDidMount() {
    const genres = getAllGenres();
    this.setState({ genres });

    const { id: movieId } = this.props.params; // Accessing the movieId from params
    console.log(movieId);
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.navigate("/not-found", { replace: true });

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.navigate("/movies");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <h1>New Movie</h1>
          {this.renderInputField("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInputField("numberInStock", "Number in Stock", "number")}
          {this.renderInputField("dailyRentalRate", "dailyRentalRate")}
          {this.renderButton("Save")}
        </div>
      </form>
    );
  }
}

export default withRouter(MovieForm);
