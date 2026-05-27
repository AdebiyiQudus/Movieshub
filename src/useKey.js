import {useEffect} from "react";
// action => serves as callback function

export function useKey(key, action) {
 // Side effect to listen for the Escape key press and close the movie details when the Escape key is pressed.
  useEffect(function() {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    }
      document.addEventListener("keydown", callback);
  // Cleanup function to remove the event listener when the component unmounts or when the onCloseMovieE function changes.
      return function() {
        document.removeEventListener("keydown", callback);
      };
    }, 
    [key, action]
  ); 
}