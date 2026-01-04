import React, { useState } from "react";
// Adding customization feature to the StarRating component so that other users can reuse the component according to (rating, different spacing in btw the stars and also asked the customer to spcify  text labels appears )

import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

// User Customization Example for reusing the Star

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  <StarRating maxRating={5}></StarRating>
  </React.StrictMode>
);
