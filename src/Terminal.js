import React from "react";
import { useControlsState } from "./ControlsContext";

// import Dashboard from "./Dashboard";
import ColumnCntr from "./ColumnCntr";

import ForsageCntr from "./ForsageCntr";
import RenderForsage from "./RenderForsage";
import RenderSettingsPerson from "./RenderSettingsPerson";

import RenderControls from "./RenderControls";
import RenderSettings from "./RenderSettings";
import DictationCntr from "./DictationCntr";
import CountdownCntr from "./CountdownCntr";
import CountdownRender from "./CountdownRender";
import LinearProgressCustom from "./LinearProgressCustom";

// import { useParamsState } from "../contexts/ParamsContext";
function Terminal() {
  const {
    controls,
    dictationState: { dictation }
  } = useControlsState();
  const { start } = controls;
  // const { steps } = useParamsState();
  console.count("------ RENDER");
  console.log("------ RENDER", { controls });
  return (
    <>
      <LinearProgressCustom />
      <>
        {start && (
          <ForsageCntr render={(props) => <RenderForsage {...props} />} />
        )}
      </>
      <RenderControls />
      <RenderSettingsPerson />
      <DictationCntr />
      <CountdownCntr render={(props) => <CountdownRender {...props} />} />
    </>
  );
}
{
  /* <RenderSettings /> */
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
