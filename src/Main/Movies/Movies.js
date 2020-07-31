// Movies.js

import React from "react";
import "./Movies.css";
import MovieListItem from "./MovieListItem";
import PageButton from "./PageButton"

const Movies = ({movies, currentPage, totalPages, onPageIncrease, onPageDecrease}) => (
  <section>
  <ul className="movies">
    {movies.map((movie, index) => (
      <MovieListItem key={movie.id} movie={movie} />
    ))}
  </ul>
  <div className="pages">
  <PageButton
  onClick={onPageDecrease}>
    Last Page
  </PageButton>

  {currentPage} / {totalPages}
  <PageButton
  onClick={onPageIncrease}>
    Next Page
  </PageButton>
  </div>

</section>
)

export default Movies;