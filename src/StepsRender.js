import React from "react";

const list = [1, 2, 3, 4, 5, 6];

function StepsRender({ handleChange, value }) {
  return (
    <select onChange={(event) => handleChange("steps", event.target.value)}>
      {list.map((item) => {
        return (
          <option key={item} selected={item === +value}>
            {item}
          </option>
        );
      })}
    </select>
  );
}

export default StepsRender;
