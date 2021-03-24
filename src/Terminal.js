import React from "react";
import { useControlsState } from "./ControlsContext";

// import Dashboard from "./Dashboard";
import ColumnCntr from "./ColumnCntr";
import RenderColumn from "./RenderColumn";
import ForsageCntr from "./ForsageCntr";
import RenderForsage from "./RenderForsage";

import RenderControls from "./RenderControls";
import RenderSettings from "./RenderSettings";
import DictationCntr from "./DictationCntr";
import LinearProgressCustom from "./LinearProgressCustom";

// import { useParamsState } from "../contexts/ParamsContext";
function Terminal() {
  // const { start, stop, repeat, onChangeInputValue } = useControlsState();
  // const { steps } = useParamsState();
  // console.count("------ RENDER");
  return (
    <>
      <LinearProgressCustom />
      <ForsageCntr render={(props) => <RenderForsage {...props} />} />
      <RenderControls />
      <RenderSettings />
      <DictationCntr />
    </>
  );
}

export default Terminal;
// renderColumn={() => (
//   <ColumnCntr render={(props1) => <RenderColumn {...props1} />} />
// )}
// <Dashboard
//renderControl={() => <RenderControls />}
//renderForsage={() => <ForsageCntr />}
///>
// <Column render={(props1) => <RenderColumn {...props1} />} />
