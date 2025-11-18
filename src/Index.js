// Adding customization feature to the StarRating component so that other users can reuse the component according to (rating, different spacing in btw thw stars and also asked the customer to spcify  text labels appears )

import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} />

    {/*Another user customization example for reusing the StarRating component */}
    {/* When a user set a default rating to 3 as a prop  */}
    {/*<StarRating maxRating={7} />
     <StarRating maxRating={10} />

 set a default value for the props in case no value is passed from the parent component ( Destructuring the props directly in the function parameter whenhere no value is passed from Index.js file) */}
    {/* <StarRating />  */}
  </React.StrictMode>
);
