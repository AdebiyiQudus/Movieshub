// You can take out the style object which does'nt change on anything that is inside the StarRating component so the style object does not regenerate by js each time the component re-renders
//  otherwise each time the components re-renders the style object will be created again and again which is not optimal for performance. So we can take it out of the component so that it is created only once.

// Create an empty array with length of 5 element which takes 2 argument _ means current element which we are not using and i means index of the current element
