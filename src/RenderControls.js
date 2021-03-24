import React from "react";

import { useControlsState, useControlsActions } from "./ControlsContext";

function RenderControls() {
  // const handleStart = () => {
  //   setControls({ start: true });
  // };

  const { onStart, onStop, onCheck, onChange } = useControlsActions();

  const {
    controls: { success, failure, start, value }
  } = useControlsState();

  console.count("RenderControls");

  return (
    <div>
      <p>
        <input type="text" name="value" value={value} onChange={onChange} />
        <button onClick={onCheck}>check</button>
      </p>
      <p>
        {start ? (
          <button onClick={onStop}>stop</button>
        ) : (
          <button onClick={onStart}>play</button>
        )}
        <span>{success}</span>
        <span>{failure}</span>
      </p>
    </div>
  );
}

export default RenderControls;
