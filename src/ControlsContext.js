import React, { useEffect } from "react";
import { useReducer } from "reinspect";

const ControlsStateContext = React.createContext();
const ControlsActionsContext = React.createContext();

export function useControlsState() {
  return React.useContext(ControlsStateContext);
}

const initialState = {
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
  request: {
    data: [],
    error: false,
    errorMessage: "",
    loading: false,
    success: false
  },
  dictationState: {
    dictation: false,
    amount: 3,
    begin: false,
    progress: false,
    end: false,
    period: 5,
    samples: []
  }
};

export const types = {
  ON_START: "ON_START",
  ON_STOP: "ON_STOP",
  ON_CHECK: "ON_CHECK",
  ON_CHANGE: "ON_CHANGE",
  ON_BEGIN: "ON_BEGIN",
  ON_END: "ON_END",
  ON_TOGGLE: "ON_TOGGLE",
  ON_PROGRESS: "ON_PROGRESS",
  ON_UPDATE: "ON_UPDATE",
  SET_REQUEST: "SET_REQUEST",
  TOGGLE_CONTROLS: "TOGGLE_CONTROLS",
  // ON_INCREMENT: "ON_INCREMENT",
  // ON_CHANGE: "ON_CHANGE",
  // // ON_PARAMS: "ON_PARAMS",
  // ON_PURSE: "ON_PURSE",
  // ON_BEGIN: "ON_BEGIN",
  // ON_END: "ON_END",
  // ON_PROGRESS: "ON_PROGRESS",

  ON_DICTATION_BEGIN: "ON_DICTATION_BEGIN",
  ON_DICTATION_END: "ON_DICTATION_END",
  ON_DICTATION_PROGRESS: "ON_DICTATION_PROGRESS",
  SET_NEXT_ARGS: "SET_NEXT_ARGS",

  // // SET_PARAMS: "SET_PARAMS",
  SET_CONTROLS: "SET_CONTROLS",
  TOGGLE_DICTATION: "TOGGLE_DICTATION"
};

export function useControlsActions() {
  const { dispatch } = React.useContext(ControlsActionsContext);

  function onChange(key, value) {
    dispatch({
      type: types.ON_CHANGE,
      meta: key,
      payload: value
    });
  }

  function setRequest(payload) {
    dispatch({
      type: types.SET_REQUEST,
      payload
    });
  }

  function setControls(payload) {
    dispatch({
      type: types.SET_CONTROLS,
      payload
    });
  }
  function onStart() {
    dispatch({
      type: types.ON_START
    });
  }
  function onStop() {
    dispatch({
      type: types.ON_STOP
    });
  }
  function onCheck() {
    dispatch({
      type: types.ON_CHECK
    });
  }

  function onEnd() {
    dispatch({
      type: types.ON_END
    });
  }

  function onBegin() {
    dispatch({
      type: types.ON_BEGIN
    });
  }
  function onProgress() {
    dispatch({
      type: types.ON_PROGRESS
    });
  }

  function onToggle(key) {
    dispatch({
      type: types.ON_TOGGLE,
      meta: key
    });
  }

  function onUpdate(payload) {
    dispatch({
      type: types.ON_UPDATE,
      payload
    });
  }

  function toggleControls(key) {
    dispatch({
      type: types.TOGGLE_CONTROLS,
      meta: key
    });
  }

  function toggleDictation(key) {
    dispatch({
      type: types.TOGGLE_DICTATION,
      meta: key
    });
  }

  function onDictationBegin() {
    dispatch({
      type: types.ON_DICTATION_BEGIN
    });
  }
  function onDictationEnd() {
    dispatch({
      type: types.ON_DICTATION_END
    });
  }

  function setNextArgs() {
    dispatch({
      type: types.SET_NEXT_ARGS
    });
  }

  return {
    onChange,
    onStart,
    onStop,
    onCheck,
    onEnd,
    onBegin,
    onProgress,
    onToggle,
    onUpdate,
    setRequest,
    setControls,
    toggleDictation,
    toggleControls,
    onDictationBegin,
    onDictationEnd,
    setNextArgs
  };
}

function reducer(state, action) {
  const {
    dictationState: { dictation }
  } = state;
  switch (action.type) {
    case types.ON_CHANGE:
      return {
        ...state,
        [action.meta]: action.payload
      };
    case types.ON_TOGGLE:
      return {
        ...state,
        [action.meta]: !state[action.meta]
      };
    case types.ON_START:
      // state.onStart();
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            start: true,
            stop: false,
            check: false,
            value: "",
            begin: false,
            progress: false,
            end: false
          }
        }
      };
    case types.ON_STOP:
      // state.onStop();
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            start: false,
            stop: true,
            check: false,
            begin: false,
            progress: false,
            end: true,
            args: [],
            queue: []
          }
        }
      };

    case types.TOGGLE_CONTROLS:
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            [action.meta]: !state.controls[action.meta]
          }
        }
      };
    case types.ON_CHECK:
      return {
        ...state,
        start: state.repeat,
        stop: false,
        check: true
      };
    case types.ON_BEGIN:
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            begin: true,
            progress: false,
            end: false
          }
        }
      };
    case types.ON_END:
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            begin: false,
            progress: false,
            end: true
          }
        }
      };
    case types.ON_PROGRESS:
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            begin: false,
            progress: true,
            end: false
          }
        }
      };
    case types.ON_UPDATE:
      return {
        ...state,
        ...action.payload
      };
    case types.SET_REQUEST:
      return {
        ...state,
        controls: {
          ...state.controls,
          args: dictation ? [] : action.payload.data,
          queue: dictation ? action.payload.data : []
        },
        request: { ...state.request, ...action.payload }
      };
    case types.SET_CONTROLS:
      return {
        ...state,
        controls: { ...state.controls, ...action.payload }
      };

    case types.TOGGLE_DICTATION:
      return {
        ...state,
        dictationState: {
          ...state.dictationState,
          ...{
            [action.meta]: !state.dictationState[action.meta]
          }
        }
      };

    case types.ON_DICTATION_BEGIN:
      return {
        ...state,
        dictationState: {
          ...state.dictationState,
          ...{
            begin: true,
            progress: false,
            end: false,
            samples: []
          }
        }
      };

    case types.ON_DICTATION_END:
      return {
        ...state,
        dictationState: {
          ...state.dictationState,
          ...{
            begin: false,
            progress: false,
            end: true
          }
        }
      };

    case types.SET_NEXT_ARGS: {
      const nextArgs =
        state.controls.queue[state.dictationState.samples.length];
      return {
        ...state,
        controls: {
          ...state.controls,
          ...{
            args: nextArgs
          }
        },
        dictationState: {
          ...state.dictationState,
          samples: [...state.dictationState.samples, ...[nextArgs]]
        }
      };
    }

    //     case types.ON_START: {
    //       return {
    //         ...state,
    //         start: true,
    //         progress: false,
    //         stop: false,
    //         samples: []
    //       };
    //     }
    //     case types.ON_PROGRESS: {
    //       return {
    //         ...state,
    //         start: false,
    //         progress: true,
    //         stop: false
    //       };
    //     }
    //     case types.ON_STOP: {
    //       return {
    //         ...state,
    //         start: false,
    //         progress: false,
    //         stop: true
    //       };
    //     }
    default:
      return new Error();
  }
}

export function ControlsContextProvider(props) {
  const {
    state: globalState,
    children,
    args,
    controls,
    room,
    onStart,
    onStop,
    onEnd,
    request
  } = props;
  // console.log("ControlsContextProvider", { request });
  const [state, dispatch] = useReducer(
    reducer,
    initialState,
    undefined,
    "CONTROLS"
  );

  useEffect(() => {
    dispatch({
      type: types.SET_CONTROLS,
      payload: globalState.controls
    });
  }, [globalState]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: "args",
  //     payload: args
  //   });
  // }, [args]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: "request",
  //     payload: request
  //   });
  //   dispatch({
  //     type: types.SET_REQUEST,
  //     payload: request
  //   });
  // }, [request]);

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_UPDATE,
  //     payload: controls
  //   });
  // }, [controls]);

  const actions = React.useMemo(
    () => ({
      dispatch
    }),
    []
  );
  console.log("ControlsContextProvider", { globalState });

  return (
    <ControlsStateContext.Provider value={state}>
      <ControlsActionsContext.Provider value={actions}>
        {children}
      </ControlsActionsContext.Provider>
    </ControlsStateContext.Provider>
  );
}
