import React from "react";
import { useControlsState, useControlsActions } from "./ControlsContext";
import SettingsSlider from "./SettingsSlider";

function SettingsSliderPerson({ params }) {
  const { setParams } = useControlsActions();

  const handleChange = (indexParams, paramsList) => {
    setParams({ ...paramsList[indexParams] });
  };

  console.count("SettingsSliderPerson");

  return <SettingsSlider params={params} handleChange={handleChange} />;
}

export default SettingsSliderPerson;
