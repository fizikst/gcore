import React from "react";
import { useControlsState, useControlsActions } from "./ControlsContext";
import RenderSettings from "./RenderSettings";

function RenderSettingsPerson() {
  const {
    controls,
    dictationState: { dictation }
  } = useControlsState();
  const { setControls, setDictation } = useControlsActions();

  const handleChangeControls = (key, event) => {
    setControls({ [key]: event.target.checked });
  };

  const handleChangeDictation = (key, event) => {
    setDictation({ [key]: event.target.checked });
  };

  console.count("RenderSettingsPerson");
  console.log("RenderSettingsPerson", { dictation });

  return (
    <RenderSettings
      controls={controls}
      dictation={dictation}
      handleToggleControls={handleChangeControls}
      handleToggleDictation={handleChangeDictation}
    />
  );
}

export default RenderSettingsPerson;
