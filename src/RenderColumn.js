import React from "react";

const generateKey = (pre) => {
  return `${pre}_${new Date().getTime()}`;
};

function RenderColumn(props) {
  const { args } = props;

  return (
    <div>
      {args.map((num) => (
        <p key={generateKey(num)}>{num}</p>
      ))}
    </div>
  );
}

export default RenderColumn;
