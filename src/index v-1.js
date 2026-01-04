// import React, { useState } from "react";
// // Adding customization feature to the StarRating component so that other users can reuse the component according to (rating, different spacing in btw the stars and also asked the customer to spcify  text labels appears )

// import ReactDOM from "react-dom/client";
// // import "./index.css";
// // import App from "./App";
// import StarRating from "./StarRating";

// // User Customization Example for reusing the StarRating component
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return <div>
//      <StarRating color="blue" maxRating={10} 
//      onSetRating={setMovieRating} />
//      <p>This movie was rated {movieRating} stars</p>
//      </div>
// }

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     {/* <App /> */}
//     <StarRating maxRating={5} 
//     messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} />

//     {/*Another user customization example for reusing the StarRating component */}
//      <StarRating size={24} color="red" className="test" 
//      defaultRating={3} />

//      <Test />
//     {/* When a user set a default rating to 3 as a prop  */}
//     {/*<StarRating maxRating={7} />
//      <StarRating maxRating={10} />

//  set a default value for the props in case no value is passed from the parent component ( Destructuring the props directly in the function parameter whenhere no value is passed from Index.js file) */}
//     {/* <StarRating />  */}
    
//   </React.StrictMode>
// );
