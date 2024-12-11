import * as genresAPI from "./fakeGenreService";

const movies = [
  {
    _id: 121212001,
    title: "Terminator",
    genre: { _id: "1111007", name: "Thriller" },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    liked: false,
    publishDate: "2018-01-03",
  },
  {
    _id: 121212002,
    title: "Lord Of The Ring",
    genre: { _id: "1111009", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 2.5,
    liked: true,
    publishDate: "2018-01-05",
  },
  {
    _id: 121212003,
    title: "Spider Man",
    genre: { _id: "1111005", name: "Action" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    liked: false,
    publishDate: "2018-01-07",
  },
  {
    _id: 121212004,
    title: "Creed II",
    genre: { _id: "1111005", name: "Action" },
    numberInStock: 8,
    dailyRentalRate: 2.5,
    liked: true,
    publishDate: "2018-01-10",
  },
  {
    _id: 121212005,
    title: "Twalight",
    genre: { _id: "1111007", name: "Thriller" },
    numberInStock: 7,
    dailyRentalRate: 2.5,
    liked: true,
    publishDate: "2018-01-28",
  },
  {
    _id: 121212006,
    title: "Dead Pool",
    genre: { _id: "1111005", name: "Action" },
    numberInStock: 15,
    dailyRentalRate: 2.5,
    liked: false,
    publishDate: "2018-01-28",
  },
  {
    _id: 121212007,
    title: "Avatar",
    genre: { _id: "1111009", name: "Comedy" },
    numberInStock: 10,
    dailyRentalRate: 3,
    liked: true,
    publishDate: "2018-01-28",
  },
  {
    _id: 121212008,
    title: "Doom",
    genre: { _id: "1111009", name: "Comedy" },
    numberInStock: 7,
    dailyRentalRate: 2.5,
    liked: true,
    publishDate: "2018-01-28",
  },
  {
    _id: 121212009,
    title: "Moscow",
    genre: { _id: "1111007", name: "Thriller" },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    liked: false,
    publishDate: "2018-01-28",
  },
  {
    _id: 1212120010,
    title: "The Heist",
    genre: { _id: "1111007", name: "Thriller" },
    numberInStock: 12,
    dailyRentalRate: 2.5,
    liked: false,
    publishDate: "2018-01-28",
  },
  {
    _id: 1212120011,
    title: "Top Gun",
    genre: { _id: "1111005", name: "Action" },
    numberInStock: 4,
    dailyRentalRate: 2.5,
    liked: true,
    publishDate: "2018-01-28",
  },
];

export function getMovies() {
  return movies;
}
export function getMovie(id) {
  return movies.find((m) => m._id === id);
}
export function saveMovie(movie) {
  let movieInDb = movies.find((m) => m._id === movie.id) || {};
  movieInDb.title = movie.title;
  movieInDb.genre = genresAPI.Genres.find((g) => g._id === movie.genreId);
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
    movies.push(movieInDb);
  }
  return movieInDb;
}
