// The function in the useEffect Hook is our effect and it contains the code that we want to run as a side effect.
// Dependency array in useEffect Hook tells React when to re-run the effect. If any value in this array changes between renders, the effect will be re-executed.
// If the dependency array is empty [], the effect will only run once after the initial render (componentDidMount behavior).
// If there are dependencies, the effect will run after every render where any of the dependencies have changed.
// We use a Effects to keep a component in sync  with the external system (API, DOM, subscriptions, Timers etc)

// update watched movie based on current watched and return a new watched movie based on all the element of the new array and the new movie object added to the watched list
// We use event handlers to react to certain events that happens in the user interface (click, hover, form submission etc)

// AbortController is a built-in JavaScript class that allows us to abort (stop) ongoing fetch requests, which is useful for preventing memory leaks and handling component unmounting scenarios in React applications
// AbortController is a browser API
import StarRating from "./StarRating";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";
// Temporary data for testing the movie list functionality before implementing the API call to fetch movies based on search query

// This is the error message coming from the new Error throwed or the error message is coming from the data response fetch  Api

// PROP DRILLING => passing data from parent component to child component via props (Parsing prop from nested components to access data where needed i.e deeply nested components)

// AVERAGE FUNCTION => calculate the average of an array of numbers by summing all the elements and dividing by the length of the array, with a check to return 0 if the array is empty to avoid division by zero errors
// Qudus Syntax => if the array is empty, return 0, otherwise calculate the average by summing all the elements in the array using reduce and dividing by the length of the array
// useRef => to create a mutable reference that persists across renders and can be used to access DOM elements or store mutable values without causing re-renders when the value changes. 

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=400&auto=format&fit=crop";
const average = (arr) =>
  arr.length === 0 ? 0
    : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

const KEY = "45d089db"; // OMDB API key

// COMPONENT COMPOSITION => composing components together to build complex UIs (combining smaller components to create larger, more complex components)
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  
  const [watched, setWatched] = useLocalStorageState([], "watched");
  // const [watched, setWatched] = useState([])
  
  // Initialize the watched state with the value from local storage if it exists, otherwise initialize it with an empty array.
  // const [watched, setWatched] = useState(function (){
    //   const storedValue = localStorage.getItem("watched");
    //   return JSON.parse(storedValue) || [];
    // });
    
    // Update ID Based on Movie Selected
    function handleSelectMovie(id) { 
     setSelectedId((selectedId) => 
      (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
      setSelectedId(null);
    }
      
      // const handleCloseMovie = useCallback(function() {
      //   setSelectedId(null);
      // }, []);

  // Update ID Based on Movie Selected -> if the selected ID is the cuurent selected ID, then set it to null (deselect), otherwise set it to the new ID
  // function handleCloseMovie(id) {
  //   setSelectedId(null);
  // }

  // Update Watched List Based on Movie Selected -> add the selected movie to the watched list by creating a new array with the current watched movies and the new movie object added to the end of the array
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
      
      // Update Watched List Based on Movie Selected -> add the selected movie to the local storage and set with a key of "watched"
      // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
      
    }

    // Using useEffect to update Watched List Based on Movie Selected -> add the selected movie to the local storage and set with a key of "watched"
    useEffect(
      function() {
      localStorage.setItem("watched", JSON.stringify(watched));
    }, 
    [watched]);
     
// Update Watched List Based on Movie Selected -> remove the selected movie from the watched list by filtering out the movie with the matching ID and returning a new array without that movie
  function handleDeleteWatched(id) {
    setWatched((watched) => 
    watched.filter((movie) => movie.imdbID !== id));
  }

 
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
            <MovieDetails 
            selectedIdProp={selectedId} 
            onCloseMovieE={handleCloseMovie} 
            onAddWatchedE={handleAddWatched}
            watchedProp={watched}
              /> 
          ) : (
            <>
          <WatchedSummary watchedProp={watched} />
          <WatchedMoviesList watchedProp={watched} 
          onDeleteWatchedE={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// =============== STATELESS COMPONENTS ===============
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
  const inputEl = useRef(null);

  useKey("Enter",function () {
    if(document.activeElement === inputEl.current) 
     return;
      inputEl.current.focus();
      setQueryProp("");
    
  } )

  // useEffect(
  //   function() {
  //    function callback(e) {
  //     if(document.activeElement === inputEl.current) 
  //      return;

  //     if (e.code === "Enter") {
  //       inputEl.current.focus();
  //       setQueryProp("");
  //     }}

  //     document.addEventListener("keydown", callback);
  //     return () => document.removeEventListener("keydown", callback);
  //   }, [setQueryProp]);

  return (
    <div className="search-container">
      <div className="search">

        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={queryProp}
          onChange={(e) => setQueryProp(e.target.value)}
          ref={inputEl}
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
// The toggle functionality show or hide the content. It uses the useState Hook to manage the open/close state of the box and renders a button to toggle the state and conditionally renders the children based on the state.
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
        <Movie 
        movieProp={movie} key={movie.imdbID} 
        onSelectMovie={onSelectMovieE} />
      ))}
    </ul>
  );
}
 
// =============== STATELESS COMPONENT ===============
function Movie({ movieProp, onSelectMovie }) {
  return (
    <li onClick={() => onSelectMovie(movieProp.imdbID)}>
      {/* <img src={movieProp.Poster} 
      alt={`${movieProp.Title} poster`} /> */}
        <img 
    src={movieProp.Poster === "N/A" ? PLACEHOLDER_IMAGE : movieProp.Poster} 
    alt={`${movieProp.Title} poster`} 
    onError={(e) => {
      e.target.onerror = null; 
      e.target.src = PLACEHOLDER_IMAGE;
    }}
    />
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

// ============== STATEFUL COMPONENT ===============
function  MovieDetails({ selectedIdProp, 
  onCloseMovieE, onAddWatchedE, watchedProp }) { 

  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  // Default countRef = 0
  const countRef = useRef(0);
  // let countRef = (0 Reset count to 0 after re-render)
 
  useEffect(function() {
     if (userRating) 
      countRef.current++;
   // OR countRef.current = countRef.current + 1;
  }, [userRating]);

  // Check if this (watched) array of object includes the array that is currently selected by the user (selectedIdProp) 
  const isWatched = watchedProp.map((movie) => 
    movie.imdbID).includes(selectedIdProp);

  const watchedUserRating = watchedProp.find((movie) =>
    movie.imdbID === selectedIdProp)?.userRating;

  // Destructure the movie object to get the properties we need for rendering the movie details and adding to the watched list
  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime:runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Actors: actors,
    Genre:genre,
  } = movie;

  /* eslint-disable */
  // if(imdbRating > 8) [isTop, setIsTop] = useState(true);

  /* early return which also make hooks not in order as stated in the hooks rules */
  // if(imdbRating > 8) return <p> Greatest Ever! </p>

  // const [isCustomHook, setIsCustomHook] = useState(imdbRating > 8);
  // console.log(isCustomHook)
  // useEffect(function() {
  //    setIsCustomHook(imdbRating > 8);
  // }, [imdbRating]);

  // DERIVED STATE => state that can be derived from other state or props (computed state based on other state or props), and automatically updates when the dependencies changes
    const isCustomHook = imdbRating > 8;
    console.log(isCustomHook)

  // const [AvgRating, setAvgRating] = useState(0);

  // Function to handle adding a movie to the watched list
  function handleAddWatched() {
    const newWatchedMovie = {
      imdbID: selectedIdProp,
      Title: title,
      Year: year,
      Poster: poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current,
    };
    onAddWatchedE(newWatchedMovie);
     onCloseMovieE(); 

    // setAvgRating(Number(imdbRating));
    // setAvgRating((curAvgRating) => 
    //   (curAvgRating + userRating) / 2);
  }

  useKey("Escape", onCloseMovieE);

// Side effect to fetch movie details from OMDB API based on selectedIdProp
  useEffect(function () {
    async function getMovieDetails() {
      setIsLoading(true);
       const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedIdProp}`
      );

      const data = await res.json();
      console.log(data);
      setMovie(data);
      setIsLoading(false);
    }
    getMovieDetails();
  },[selectedIdProp]);

 // Side effect to update the document title based on the selected movie's title and reset it back to the default title when the component unmounts or when the selected movie changes 
  useEffect(function() {
    if (!title) return;
    document.title = `Movie | ${title}`;
  // Cleanup function to reset the document title back to the default title when the component unmounts or when the selected movie changes (title changes)
    return function() {
      document.title = "moviesHub";
      // console.log(`Clean up effect for movie ${title}`);
    }
  }, [title]);

  // Side effect to auto-scroll the screen down to the movie details section when a movie is selected 
  useEffect(function() {
    // Only auto-scroll if the user is on a mobile device screen size
    if (window.innerWidth <= 768) {
      window.scrollTo({
        top: 380, // Adjusts the screen view down past the search box
        behavior: "smooth" 
      });
    }
  }, [selectedIdProp]); 

  return (
     <div className="details">
    {isLoading ? <Loader /> : (
      <>
    <header> 
      <button className="btn-back" onClick={onCloseMovieE}>
        &larr;
      </button>
      
      {/* <img src={poster} alt={`Poster of ${title} movie`} /> */}

      <img 
  // 1. Checks if the 'poster' variable from the API is "N/A"
  src={poster === "N/A" ? PLACEHOLDER_IMAGE : poster} 
  alt={`Poster of ${title} movie`} 
  // 2. Safely falls back if the link is broken/dead
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = PLACEHOLDER_IMAGE;
  }}
/>
      <div className="details-overview">
        <h2>{title}</h2>

        <p>
          {released} &bull; {runtime} &bull; {genre}
        </p>
        <p> {genre}</p>
        <p>
          <span>⭐️</span>
          {imdbRating} IMDb rating
        </p>
      </div>
      </header>

    {/* Display AvgRating in UI */}
      {/* <p>{AvgRating.toFixed(1)}</p> */}

      <section> 
        <div className="rating">
        {!isWatched ? (
          <>
          <StarRating maxRating={10} size={24} 
          onSetRating={setUserRating}
          />

        {userRating > 0 && (
        <button className="btn-add" onClick={handleAddWatched}>
        + Add to watched list</button>  
          )} 
          </> 
        ) : (
          <p> You already watched this movie and rated it {watchedUserRating}
          <span>⭐️</span>
          </p>
          
        )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
      </>
      )}
      </div>
      );
  }

// =============== STATELESS COMPONENTS ===============
function WatchedSummary({ watchedProp }) {
  const avgImdbRating = 
  average(watchedProp.map((movie) => movie.imdbRating));

  const avgUserRating = 
  average(watchedProp.map((movie) => movie.userRating));

  const avgRuntime = 
  average(watchedProp.map((movie) => movie.runtime));

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
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

// =============== STATELESS COMPONENTS ===============
function WatchedMoviesList({ watchedProp, onDeleteWatchedE }) {
  return (
    <ul className="list">
      {watchedProp.map((movie) => (
        <WatchedMovie watchedMovieProp={movie}
         key={movie.imdbID} 
         onDeleteWatchedE={onDeleteWatchedE}
          />
      ))}
    </ul>
  );
}

// =============== STATELESS COMPONENTS ===============
function WatchedMovie({ watchedMovieProp, onDeleteWatchedE }) {
  return (
    <li key={watchedMovieProp.imdbID}>
      {/* <img
        src={watchedMovieProp.Poster}
        alt={`${watchedMovieProp.Title} poster`}
      /> */}

      <img 
  // Checks if the watched movie has "N/A" as a poster
  src={watchedMovieProp.Poster === "N/A" ? PLACEHOLDER_IMAGE : watchedMovieProp.Poster} 
  alt={`${watchedMovieProp.Title} poster`} 
  // Catches broken URLs
  onError={(e) => {
    e.target.onerror = null; 
    e.target.src = PLACEHOLDER_IMAGE;
  }}
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

{/* Delete button to remove movie from watched list by calling onDeleteWatchedE function with the movie's imdbID as an argument */}
        <button className="btn-delete"
         onClick={() => onDeleteWatchedE
          (watchedMovieProp.imdbID)}> X
         </button>
      </div>
    </li>
  );
}