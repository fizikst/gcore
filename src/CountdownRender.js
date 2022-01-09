import React from "react";

function CountdownRender({ begin, increment }) {
  console.count("CountdownRender");

  return <div>{begin && 3 - increment}</div>;
}

export default CountdownRender;
