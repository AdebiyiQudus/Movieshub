import { useState } from "react";
import { useEffect } from "react";


const KEY = "45d089db"; // OMDB API key
export function useMovies  (query, callback) {

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  
   // Side effect to fetch movies from OMDB API
    useEffect(function(){
      callback?.();

      const controller = new AbortController();
  
      async function fetchMovies() {
       try{ 
        setIsLoading(true);
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=${query}`,
      // Connect AbortController to the fetch request to allow us to cancel the fetch request if the component unmounts or if the query changes before the fetch request completes
          { signal: controller.signal }
        );
  
        if (!res.ok) 
         throw new Error("Something went wrong with fetching movies");
  
        const data = await res.json();
        if (data.Response === "False")
         throw new Error("Movie not found!");
  
        setMovies(data.Search);
        setError("");
      } catch(err){
        setError(err.message);
  
     // Check if the error is an AbortError, which occurs when the fetch request is aborted, and if it's not an AbortError, log the error name and set the error message in the state to display it in the UI   
        if (err.name !== "AbortError") {
          console.log(err.name); 
          setError(err.message);
        }
  
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
  
  // Cleanup function to abort the fetch request if the component unmounts or if the query changes before the fetch request completes  
      return function() {
        controller.abort();
      };
    }, [query, callback]); 
  return { movies, isLoading, error };
}