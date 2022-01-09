import React from "react";
// import { useControlsState, useControlsActions } from "./ControlsContext";

function RenderSettings({
  controls,
  handleToggleControls,
  dictation,
  handleToggleDictation
}) {
  const { sound, repeat } = controls;
  // const { toggleControls, toggleDictation } = useControlsActions();
  // const {
  //   controls: { sound, repeat },
  //   dictationState: { dictation }
  // } = useControlsState();
  const handleControls = (key, event) => {
    // console.log('handleControls', {key, event})
    handleToggleControls(key, event);
    // toggleControls(e.target.name);
  };

  const handleDictation = (key, event) => {
    handleToggleDictation(key, event);
    // toggleDictation(e.target.name);
  };

  console.count("RenderSettings");
  console.log("RenderSettings", { sound, repeat, dictation });

  return (
    <div>
      Sound
      <input
        onChange={(e) => handleControls("sound", e)}
        type="checkbox"
        id="sound"
        name="sound"
        checked={sound}
      />
      Repeat
      <input
        onChange={(e) => handleControls("repeat", e)}
        type="checkbox"
        id="repeat"
        name="repeat"
        checked={repeat}
      />
      Dictation
      <input
        onChange={(e) => handleDictation("dictation", e)}
        type="checkbox"
        id="dictation"
        name="dictation"
        checked={dictation}
      />
    </div>
  );
}

export default RenderSettings;
