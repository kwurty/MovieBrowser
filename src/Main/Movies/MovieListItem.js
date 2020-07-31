import React from "react";
import "./MovieListItem.css";

const MovieListItem = ({ movie }) => {

  const { title, poster_path, release_date, vote_average } = movie
  const imgUrl = `https://image.tmdb.org/t/p/w342/${poster_path}`

  return (
    <li className="movie-item">
      <img src={imgUrl} alt="" />
      <div className="movie-description">
			<div className="title">{title}</div>
			<section className="movie-details">
				<div className="movie-year">
					<span className="title">Year</span>
					<span>{release_date}</span>
				</div>
				<div className="movie-rating">
					<span className="title">Rating</span>
					<span>{vote_average}</span>
				</div>
			</section>
		</div>
    </li>
  )
}

export default MovieListItem;