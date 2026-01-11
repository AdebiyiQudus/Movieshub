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
