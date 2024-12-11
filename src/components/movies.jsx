import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/fakeMovieService";
import getAllGenres from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listGroup";
import _ from "lodash";
import MovieTable from "./movieTable";
import "./css/movies.css";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    pageSize: 4,
    currentPage: 1,
    searchedItem: "",
  };

  componentDidMount() {
    const genres = [{ name: "All Genres", _id: "" }, ...getAllGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  onSearch = ({ currentTarget: input }) => {
    // console.log(typeof input.value.trim());

    let searchedValue = input.value.trim().toString().toLowerCase();
    this.setState({
      searchedItem: searchedValue,
      currentPage: 1,
      selectedGenre: null,
    });
  };

  getPagedData = () => {
    const {
      selectedGenre,
      movies: allMovies,
      currentPage,
      pageSize,
      sortColumn,
      searchedItem,
    } = this.state;
    let filtered = [...allMovies];
    if (searchedItem) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchedItem)
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    // console.log(filtered);
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { totalCount, data: movies } = this.getPagedData();
    const {
      currentPage,
      pageSize,
      sortColumn,
      genres,
      selectedGenre,
      searchedItem,
    } = this.state;

    if (totalCount === 0 && !searchedItem)
      return <p>There are no movies in the database.</p>;

    return (
      <div className="container bg-white row ml-auto mr-auto mt-5 ">
        <div className="col-2 mt-5">
          <ListGroup
            allItems={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col" onClick={this.handleContainerClick}>
          <div className="d-flex justify-content-between">
            <Link
              to="/movies/new"
              className="btn btn-primary newMovieButton"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
            <div className="d-flex align-items-center">
              <i id="searchIcon" className="fa fa-search mr-n4"></i>
              <input
                className="rounded-lg  border mr-2 px-5"
                type="text"
                onChange={this.onSearch}
                placeholder="Search Movie"
              />
            </div>
          </div>
          <p>Showing {totalCount} movies in the database.</p>
          <MovieTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          {searchedItem === "" ? (
            <Pagination
              totalItemsLength={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Movies;
