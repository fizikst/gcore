import React from "react";
import { useControlsState, useControlsActions } from "./ControlsContext";

function RenderSettings() {
  const { toggleControls, toggleDictation } = useControlsActions();
  const {
    controls: { sound, repeat },
    dictationState: { dictation }
  } = useControlsState();
  const handleControls = (e) => {
    toggleControls(e.target.name);
  };

  const handleDictation = (e) => {
    toggleDictation(e.target.name);
  };

  console.count("RenderSettings");

  return (
    <div>
      Sound
      <input
        onChange={handleControls}
        type="checkbox"
        id="sound"
        name="sound"
        value={sound}
      />
      Repeat
      <input
        onChange={handleControls}
        type="checkbox"
        id="repeat"
        name="repeat"
        value={repeat}
      />
      Dictation
      <input
        onChange={handleDictation}
        type="checkbox"
        id="dictation"
        name="dictation"
        value={dictation}
      />
    </div>
  );
}

export default RenderSettings;
