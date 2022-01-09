import React from "react";

import StepsRender from "./StepsRender";

function ParamsRender({ handleChange, params }) {
  console.count("ParamsRender");

  return (
    <div>
      <StepsRender handleChange={handleChange} value={params.steps} />
    </div>
  );
}

export default ParamsRender;
