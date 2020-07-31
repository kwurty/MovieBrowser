import React from 'react'
import Movies from './Movies/Movies'
import Navigation from './Navigation/Navigation'
import './Main.css'

class Main extends React.Component{

    state = {
        genre: 'Comedy',
        genres: [],
        movies: [],
        genreURL: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`,
        moviesURL: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&page=1`,
        page: 1,
        totalPages: 1,
        year: {
            label: "year",
            min: 1990,
            max: 2020,
            step: 1,
            value: { min: 2000, max: 2020}
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: { min: 8, max: 10}
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: { min: 60, max: 120 }
        }
    }

    genreChange = event => {
        this.setState({ genre: event.target.value });
    }
    
    setGenres = genres => {
        this.setState({genres});
    }

    sliderChange = data => {
        this.setState({
          [data.type]: {
            ...this.state[data.type],
            value: data.value
          }
        });
    };

    onChange = data => {
        this.setState({
          [data.type]: {
            ...this.state[data.type],
            value: data.value
          }
        });
      };

    createMovieURL = () => {
        const {genres, year, rating, runtime, page} = this.state;
        const selectedGenre = genres.find( genre => genre.name === this.state.genre);
        console.log(selectedGenre);
        const genreId = selectedGenre.id;
        const moviesURL = `https://api.themoviedb.org/3/discover/movie?` +
          `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
          `language=en-US&sort_by=popularity.desc&` +
          `with_genres=${genreId}&` +
          `primary_release_date.gte=${year.value.min}-01-01&` +
          `primary_release_date.lte=${year.value.max}-12-31&` +
          `vote_average.gte=${rating.value.min}&` +
          `vote_average.lte=${rating.value.max}&` +
          `with_runtime.gte=${runtime.value.min}&` +
          `with_runtime.lte=${runtime.value.max}&` +
          `page=${page}&`;
    
        this.setState({ moviesURL });
    }

    onSearchButtonClick = () => {
      this.setState({page: 1});
      this.createMovieURL();
    }

    fetchMovies = (url) => {
      fetch(url)
        .then(response => response.json())
        .then(data => this.storeMovies(data))
        .catch(error => console.log(error));
    }

    storeMovies = data => {
      const movies = data.results.map(result => {
        const {
          vote_count,
          id,
          genre_ids,
          poster_path,
          title,
          vote_average, 
          release_date
        } = result;
        return { vote_count, id, genre_ids, poster_path, title, vote_average, release_date };
      });
  
      this.setState({ movies, totalPages: data.total_pages });
    };

    onPageIncrease = () => {
      const { page, totalPages } = this.state
      const nextPage = page + 1;
      if (nextPage <= totalPages) {
        this.setState({ page: nextPage })
      }
    }
    
    onPageDecrease = () => {
      const { page } = this.state
      const nextPage = page - 1;
      if ( nextPage > 0 ) {
        this.setState({ page: nextPage })
      }
    }

    componentDidMount() {
      this.fetchMovies(this.state.moviesURL);
    }

    componentDidUpdate(nextProps, nextState){
      if (this.state.moviesUrl !== nextState.moviesUrl) {
        this.fetchMovies(nextState.moviesUrl);
      }
      if (this.state.page !== nextState.page) {
        this.fetchMovies(this.state.moviesURL);
      }
    }
    render() {
        return (
            <section className="main">
                <Navigation 
                onChange={this.onChange}
                genreChange={this.genreChange}
                setGenres={this.setGenres}
                searchInit={this.onSearchButtonClick}
                {...this.state}
                />
                <Movies 
                movies={this.state.movies}
                currentPage={this.state.page}
                totalPages={this.state.totalPages}
                onPageIncrease={this.onPageIncrease}
                onPageDecrease={this.onPageDecrease}
                />
            </section>
        )
    }
}

export default Main