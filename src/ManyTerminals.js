import React from "react";
import { StateInspector } from "reinspect";
import HttpDataProvider from "./HttpDataProvider";
import { ControlsContextProvider } from "./ControlsContext";

const initState = {
  controls: {
    start: false,
    stop: false,
    open: false,
    check: false,
    clear: false,
    abacus: false,
    settings: true,
    repeat: false,
    correct: false,
    value: "",
    sound: false,
    begin: false,
    progress: false,
    end: false,
    args: [],
    queue: []
  }
};

function ManyTerminals() {
  const terminal = [[], []];

  const [state, setState] = React.useState(initState);

  const handleStart = () => {
    setState({
      controls: {
        ...initState.controls,
        start: true,
        stop: false
      }
    });
  };

  const handleStop = () => {
    setState({
      controls: {
        ...initState.controls,
        start: false,
        stop: true
      }
    });
  };

  const {
    controls: { start }
  } = state;
  console.log("ManyTerminal", { state, start });
  return (
    <>
      {!start && <button onClick={handleStart}>Start</button>}
      {start && <button onClick={handleStop}>Stop</button>}
      {terminal.map((terminal, key) => (
        <StateInspector name={`App${key}`}>
          <ControlsContextProvider state={state}>
            <HttpDataProvider />
          </ControlsContextProvider>
        </StateInspector>
      ))}
    </>
  );
}

export default ManyTerminals;
