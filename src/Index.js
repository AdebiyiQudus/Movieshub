// cleanup function is a function that is returned from the useEffect hook and is used to clean up any side effects that were created in the useEffect hook.This helps to prevent memory leaks and ensures that our application behaves correctly even when components are unmounted or when dependencies change.
import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";
import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
     {/* <StarRating maxRating={5} 
  messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />

  {/*Another user customization example for reusing the StarRating component */}
   {/* <StarRating size={24} color="red" className="test" defaultRating={3} /> */}

     {/* <StarRating />  */}
  </StrictMode>
);
