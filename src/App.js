// The function in the useEffect Hook is our effect and it contains the code that we want to run as a side effect.
// Dependency array in useEffect Hook tells React when to re-run the effect. If any value in this array changes between renders, the effect will be re-executed.
// If the dependency array is empty [], the effect will only run once after the initial render (componentDidMount behavior).
// If there are dependencies, the effect will run after every render where any of the dependencies have changed.
// We use a Effects to keep a component in sync  with the external system (API, DOM, subscriptions, Timers etc)

// We use event handlers to react to certain events that happens in the user interface (click, hover, form submission etc)
import { useState } from "react";
import { useEffect } from "react";
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
// is the error message coming from the new Error throwed or the error message is coming from the data response fetch  Api

// PROP DRILLING => passing data from parent component to child component via props (Parsing prop from nested components to access data where needed i.e deeply nested components)

const average = (arr) => arr.reduce((acc, cur) => acc + cur / arr.length, 0);

const KEY = "45d089db"; // OMDB API key

// COMPONENT COMPOSITION => composing components together to build complex UIs (combining smaller components to create larger, more complex components)
export default function App() {
  const [query, setQuery] = useState("inception");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  /*useEffect(function() {
    console.log("After initial render")
  }, []); 
  useEffect(function() {
    console.log("After every render")
  }); 

  useEffect(function() {
    console.log("After initial render and whenever 'query' changes")
  }, [query]);

  console.log("During render")
  */

  function handleSelectMovie(id) { 
   setSelectedId((selectedId) => 
    (id === selectedId ? null : id));
  }

  // Update ID Based on Movie Selected -> if the selected ID is the cuurent selected ID, then set it to null (deselect), otherwise set it to the new ID
  function handleCloseMovie(id) {
    setSelectedId(null);
  }

  // Side effect to fetch movies from OMDB API
  useEffect(function() {
    async function fetchMovies() {
     try{ 
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`
      );

      if (!res.ok) 
       throw new Error("Something went wrong with fetching movies");

      const data = await res.json();
      if (data.Response === "False")
       throw new Error("Movie not found!");

      setMovies(data.Search);
      console.log(data.Search);
    } catch(err){
      console.error(err); 
      setError(err.message);

    } finally{
      setIsLoading(false);
    }
     }
     
     if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
     }
    fetchMovies();
  }, [query]); 

  return (
    <>
      <Navbar>
        <Search queryProp={query} setQueryProp={setQuery} />
        <NumResults foundResult={movies} />
      </Navbar>

      <Main>
       {/* Mutually Exclusive Condition Rendering */}
        <Box>
      {/* { isLoading ? <Loader /> : <MovieList allMoviesList={movies} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList allMoviesList={movies}
          onSelectMovieE={handleSelectMovie} />}
          {error && <ErrorMessage messageProp={error} />}
        </Box>

{/* Parsing watchedProp(watched) which is an array of watched movies to WatchedSummary and WatchedMoviesList components for mapping repectively */}
        <Box>
          {selectedId ? (
            <MovieDetails selectedIdProp={selectedId} 
            onCloseMovieE={handleCloseMovie} />
          ) : (
            <>
          <WatchedSummary watchedProp={watched} />
          <WatchedMoviesList watchedProp={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage ({ message }) {
  return <p className="error">
    <span>⛔️</span>{message}</p>;
}
// ALTERNATIVE WAY OF PASSING ELEMENT AS CHILDREN PROP
//  <Main>
//         <Box element={<MovieList allMoviesList={movies} />} />

//         <Box element={
//           <>
//             <WatchedSummary watchedProp={watched} />
//             <WatchedMoviesList watchedProp={watched} />
//           </>
//         }>
//       </Main>

// STRUCTURED COMPONENTS => responsible for rendering specific sections or layout in the UI
function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

// STATELESS/PRESENTATIONAL COMPONENTS => it has no state and primarily focuses on how things look(present contentin UI)
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>moviesHub</h1>
    </div>
  );
}

//STATEFUL COMPONENTS => manages and maintains its own state
function Search({queryProp, setQueryProp}) {
  return (
    <div className="search-container">
      <div className="search">

        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={queryProp}
          onChange={(e) => setQueryProp(e.target.value)}
        />
      </div>
    </div>
  );
}

// =============== STATELESS COMPONENT ===============
function NumResults({ foundResult }) {
  return (
    <p className="num-results">
      Found <strong>{foundResult.length}</strong> results
    </p>
  );
}

// =============== STRUCTURED COMPONENT ===============
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// =============== STATEFUL COMPONENT ===============
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle"
       onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// ALTERNATIVE PASSING ELEMENT AS CHILDREN PROP
// function Box({ element }) {
//   const [isOpen, setIsOpen] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen((open) => !open)}
//       >
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen &&  element }
//     </div>
//   );
// }

// =============== OR STATEFUL COMPONENT ===============
/*function WatchedBox() {
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
          <WatchedSummary watchedProp={watched} />
          <WatchedMoviesList watchedProp={watched} />
      )}
    </div>
  );
}*/

// =============== STATEFUL COMPONENT ===============
function MovieList({ allMoviesList, onSelectMovieE }) {
  return (
    <ul className="list list-movies">
      {allMoviesList?.map((movie) => (
        <Movie movieProp={movie} key={movie.imdbID} 
        onSelectMovie={onSelectMovieE} />
      ))}
    </ul>
  );
}
 
// =============== STATELESS COMPONENT ===============
function Movie({ movieProp, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movieProp.imdbID)}>
      <img src={movieProp.Poster} 
      alt={`${movieProp.Title} poster`} />
      <h3>{movieProp.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movieProp.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetails({ selectedIdProp, onCloseMovieE }) { 
  useEffect(function () {
    async function getMovieDetails() {
       const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedIdProp}`
      );
      const data = await res.json();
      console.log(data);
    }
    getMovieDetails();
  },[]);

  return <div className="details">
    <button className="btn-back" onClick={onCloseMovieE}>
      &larr;
    </button>
    {selectedIdProp}
    </div>;
}

// =============== STATELESS COMPONENTS ===============
function WatchedSummary({ watchedProp }) {
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(2)} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watchedProp }) {
  return (
    <ul className="list">
      {watchedProp.map((movie) => (
        <WatchedMovie watchedMovieProp={movie}
         key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ watchedMovieProp }) {
  return (
    <li key={watchedMovieProp.imdbID}>
      <img
        src={watchedMovieProp.Poster}
        alt={`${watchedMovieProp.Title} poster`}
      />
      <h3>{watchedMovieProp.Title}</h3>

      <div>
        <p>
          <span>⭐️</span>
          <span>{watchedMovieProp.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{watchedMovieProp.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{watchedMovieProp.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
