// You can take out the style object which does'nt change on anything that is inside the StarRating component so the style object does not regenerate by js each time the component re-renders
//  otherwise each time the components re-renders the style object will be created again and again which is not optimal for performance. So we can take it out of the component so that it is created only once.

const containerStyle = {
  display: "flex",
  gap: "16px",
  alignItems: "center",
};

const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const textstyle = {
  fontSize: "18px",
  fontWeight: "bold",
  lineHeight: "1",
  margin: "0",
};

// set a default value for the props in case no value is passed from the parent component ( Destructuring the props directly in the function parameter whenhere no value is passed from Index.js file)
export default function StarRating ({ maxRating = 5 }) {
  return (
  <div style={containerStyle}>
    <div style={starContainerStyle}>

{/* Create an empty array with length of 5 element which takes 2 argument _ means current element which we are not using and i means index of the current element */}
      {Array.from({ length: maxRating }, (_, i) => (
        <span >
          S{i + 1}
        </span>
      ))}
    </div>
    <p style={textstyle}>10</p>
  </div>
)
  
}