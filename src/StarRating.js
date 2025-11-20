// You can take out the style object which does'nt change on anything that is inside the StarRating component so the style object does not regenerate by js each time the component re-renders
//  otherwise each time the components re-renders the style object will be created again and again which is not optimal for performance. So we can take it out of the component so that it is created only once.
// SEED DATA => Seed data is the sample or default data you put in a database so your app has something to work with before real users use it.

// If tempRating exists(hovering) then show message for tempRating (current hovered rating - 1, if user is not hovering then show message for current clicked rating -1)
// If FALSE (if message.length is not = 5) fallback to numeric value display ( either tempRating or rating or empty string)
import { useState } from "react";

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
};

// Add prop and give a default value in case no value is passed from parent component

const textstyle = {
  fontSize: "18px",
  fontWeight: "bold",
  lineHeight: "1",
  margin: "0",
};

// set a default value for the props in case no value is passed from the parent component ( Destructuring the props directly in the function parameter whenhere no value is passed from Index.js file)
export default function StarRating ({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(rating);
  }

  // Set a default className for any user in the future that wants to customize the star rating component(font style, font size, font-family, color etc)
  return (
  <div style={containerStyle}>
    <div style={starContainerStyle}>
{/* Create an empty array with length of 5 element which takes 2 argument _ means current element which we are not using and i means index of the current element */}
      {Array.from({ length: maxRating }, (_, i) => (
       <Star key={i}

 // if current hover temp rating is >= i+1 then full star will be displayed else check if current rating is >= i+1 then full star will be displayed else empty star will be displayed
       full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
        onRateClick={() => handleRating(i + 1)} 
        onHoverIn={() => setTempRating(i + 1)}
        onHoverOut={() => setTempRating(0)}     
       />
      ))}
    </div>
    {/* If there is no tempRating (Hover rating) then display current rating also if rating does not exist then display empty string */}
    <p style={textstyle}>{tempRating || rating || ""}</p>
  </div>
  );
}

const starStyle = {
  width: "48px",
  height: "48px",
  display: "block",
  cursor: "pointer",
}

// role="button" for accessibility to let screen readers know that this is a button. use onclick event to handle click on Rating star
function Star({ onRateClick, full, onHoverIn, onHoverOut }) {
  return (
    <span role="button" style={starStyle} 
    onClick={onRateClick} 
    onMouseEnter={onHoverIn}
     onMouseLeave={onHoverOut}>

{/* Ternary operator to render full star or empty star based on the full prop passed from StarRating component  */}
      { full ? <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="#000"
        stroke="#000"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg> : (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#000"  
    >
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>
  )} 
 </span>
  )
}

