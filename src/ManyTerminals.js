import React from "react";
import { StateInspector } from "reinspect";
import HttpDataProvider from "./HttpDataProvider";
import { ControlsContextProvider } from "./ControlsContext";
import SettingsSliderPerson from "./SettingsSliderPerson";
import SettingsSlider from "./SettingsSlider";
import RenderSettings from "./RenderSettings";
import Terminal from "./Terminal";
import axios from "axios";
const config = {
  headers: {
    authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVkMjBhNjk0Njc4MjQ0NTJjNzMwOWE1OSIsInJvbGUiOjIsIm5hbWUiOiJUZXN0IFRlc3QiLCJleHAiOjE2NDE1NzM0NTE1NDB9.YvYkXfdUdqnWvSdbVnlyeJn9BSQxk3ezKaJ1602oCOQ"
  }
};

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
  },
  params: [
    {
      base: 10,
      base_side: 1,
      bound: 0,
      digits_mode: 1,
      first_int_available_numbers: 1,
      interval: 1,
      mode: 1,
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      over: 1,
      second_int_available_numbers: 1,
      section: 5,
      sign: 0,
      steps: 3,
      under: 1
    },
    {
      base: 10,
      base_side: 1,
      bound: 0,
      digits_mode: 1,
      first_int_available_numbers: 1,
      interval: 1,
      mode: 1,
      numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      over: 1,
      second_int_available_numbers: 1,
      section: 5,
      sign: 0,
      steps: 3,
      under: 1
    }
  ],
  countdownState: {
    countdown: true,
    begin: false,
    progress: false,
    end: false,
    increment: 0
  },
  dictationState: {
    dictation: false,
    amount: 3,
    begin: false,
    progress: false,
    end: false,
    period: 5,
    samples: []
  },
  request: {
    data: [],
    error: false,
    errorMessage: "",
    loading: false,
    success: false
  }
};

function ManyTerminals() {
  const terminal = [[], []];

  const [state, setState] = React.useState(initState);
  const { controls, params, dictationState } = state;
  const { dictation } = dictationState;

  const handleStart = () => {
    axios
      .post(
        `https://api.gorazd.online/arifmetik_book/args?terminal_count=6`,
        { params },
        config
      )
      .then((response) => {
        console.log({ data: response.data.data });
        // setRequest({
        //   success: true,
        //   data: response.data.data
        // });
        setState({
          ...state,
          countdownState: {
            ...state.countdownState,
            begin: true
          },
          // controls: {
          //   ...controls,
          //   start: true,
          //   stop: false
          // },
          request: {
            success: true,
            data: response.data.data
          }
        });
      })
      .catch((data) => {
        console.log({ data });
      });
  };

  const handleStop = () => {
    setState({
      ...state,
      controls: {
        ...controls,
        start: false,
        stop: true
      }
    });
  };

  const handleToggleControls = (key, event) => {
    setState({
      ...state,
      controls: {
        ...controls,
        [key]: event.target.checked
      }
    });
  };

  const handleToggleDictation = (key, event) => {
    // console.log("ManyTerminal", {key, event: event.target.checked})
    setState({
      ...state,
      dictationState: {
        ...dictationState,
        dictation: event.target.checked
      }
    });
  };

  const handleParamsChange = (indexParams, paramsList) => {
    console.log("handleParamsChange", { paramsList });
    setState({
      ...state,
      params: paramsList
    });
  };

  console.log("ManyTerminal", { state, controls, dictationState });
  return (
    <>
      <SettingsSlider params={params} handleChange={handleParamsChange} />
      <RenderSettings
        controls={controls}
        dictation={dictation}
        handleToggleControls={handleToggleControls}
        handleToggleDictation={handleToggleDictation}
      />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      {terminal.map((terminal, key) => (
        <StateInspector name={`App${key}`} key={key}>
          <ControlsContextProvider state={state} num={key}>
            <SettingsSliderPerson params={params} />
            <Terminal />
          </ControlsContextProvider>
        </StateInspector>
      ))}
    </>
  );
}

export default ManyTerminals;
