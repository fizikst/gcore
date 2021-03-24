import React from "react";

function RenderForsage(props) {
  const { args, inc } = props;

  return (
    <div>
      <p>{args[inc]}</p>
    </div>
  );
}

export default RenderForsage;
