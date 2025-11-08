import { useState } from "react";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  return (
    <>
      <Navbar />
      <Main />
</>
);
}
function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults />
    </nav>
  );
}

function Logo () {
  return (          
    <div className="logo">
      <span role="img">🍿</span>
      <h1>moviesHub</h1>
    </div>
  )
}
function Search() {
  const [query, setQuery] = useState("");
  return (
    <div className="search">
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

function NumResults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function Main () {
  return (
    <main className="main">
      <ListBox />
      <WatchedBox />
    </main>
  );
}

function ListBox() {

  const [isOpen1, setIsOpen1] = useState(true);
  return (

<div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen1((open) => !open)}
  >
    {isOpen1 ? "–" : "+"}
  </button>
  {isOpen1 && (
    <MovieList />
  )}
 </div>

  );
}

function MovieList() {
const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movieprop={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movieprop }) {
  return (
   <li>
    <img src={movieprop.Poster} alt={`${movieprop.Title} poster`} />
    <h3>{movieprop.Title}</h3>
    <div>
      <p>
        <span>🗓</span>
        <span>{movieprop.Year}</span>
      </p>
    </div>
  </li>
  )
}

function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
 {/* Parsing watchedProp(watched) which is an array of watched movies to WatchedSummary and WatchedMoviesList components for mapping repectively */}
          <WatchedSummary watchedProp={watched} />
          <WatchedMoviesList watchedProp={watched} />
        </>
      )}
    </div>

  )
}

function WatchedSummary ({ watchedProp }) {
  const avgImdbRating = average(watchedProp.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedProp.map((movie) => movie.userRating));
  const avgRuntime = average(watchedProp.map((movie) => movie.runtime));

  return (
     <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedProp.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}

function WatchedMoviesList ({ watchedProp }) {
  return (
     <ul className="list">
  {watchedProp.map((movie) => (
    <WatchedMovie watchedProp={movie} key={movie.imdbID} />
  ))}
</ul>
  );    
}

function WatchedMovie({ watchedProp }) {
  return (
    <li key={watchedProp.imdbID}>
      <img src={watchedProp.Poster} alt={`${watchedProp.Title} poster`} />
      <h3>{watchedProp.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{watchedProp.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watchedProp.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchedProp.runtime} min</span>
        </p>
      </div>
    </li>
  );
}