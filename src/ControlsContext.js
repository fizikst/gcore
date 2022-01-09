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
    queue: [],
    increment: 0
  },
  countdownState: {
    countdown: true,
    begin: false,
    progress: false,
    end: false,
    increment: 0
  },
  params: {
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
  },
  num: 0
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

  ON_COUNTDOWN_BEGIN: "ON_COUNTDOWN_BEGIN",
  ON_COUNTDOWN_END: "ON_COUNTDOWN_END",
  ON_COUNTDOWN_PROGRESS: "ON_COUNTDOWN_PROGRESS",
  SET_COUNTDOWN_INCREMENT: "SET_COUNTDOWN_INCREMENT",
  SET_COUNTDOWN: "SET_COUNTDOWN",

  // // SET_PARAMS: "SET_PARAMS",
  SET_CONTROLS: "SET_CONTROLS",
  SET_DICTATION: "SET_DICTATION",
  TOGGLE_DICTATION: "TOGGLE_DICTATION",

  SET_PARAMS: "SET_PARAMS",

  SET_NUM: "SET_NUM"
};

export function useControlsActions() {
  const { dispatch } = React.useContext(ControlsActionsContext);

  // function onChange(key, value) {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: key,
  //     payload: value
  //   });
  // }

  // function setRequest(payload) {
  //   dispatch({
  //     type: types.SET_REQUEST,
  //     payload
  //   });
  // }

  // function setControls(payload) {
  //   dispatch({
  //     type: types.SET_CONTROLS,
  //     payload
  //   });
  // }
  // function onStart() {
  //   dispatch({
  //     type: types.ON_START
  //   });
  // }
  // function onStop() {
  //   dispatch({
  //     type: types.ON_STOP
  //   });
  // }
  // function onCheck() {
  //   dispatch({
  //     type: types.ON_CHECK
  //   });
  // }

  // function onEnd() {
  //   dispatch({
  //     type: types.ON_END
  //   });
  // }

  // function onBegin() {
  //   dispatch({
  //     type: types.ON_BEGIN
  //   });
  // }
  // function onProgress() {
  //   dispatch({
  //     type: types.ON_PROGRESS
  //   });
  // }

  // function onToggle(key) {
  //   dispatch({
  //     type: types.ON_TOGGLE,
  //     meta: key
  //   });
  // }

  // function onUpdate(payload) {
  //   dispatch({
  //     type: types.ON_UPDATE,
  //     payload
  //   });
  // }

  // function toggleControls(key) {
  //   dispatch({
  //     type: types.TOGGLE_CONTROLS,
  //     meta: key
  //   });
  // }

  // function toggleDictation(key) {
  //   dispatch({
  //     type: types.TOGGLE_DICTATION,
  //     meta: key
  //   });
  // }

  // function onDictationBegin() {
  //   dispatch({
  //     type: types.ON_DICTATION_BEGIN
  //   });
  // }
  // function onDictationEnd() {
  //   dispatch({
  //     type: types.ON_DICTATION_END
  //   });
  // }

  // function setNextArgs() {
  //   dispatch({
  //     type: types.SET_NEXT_ARGS
  //   });
  // }

  // useMemo(() => ({
  //   setInput: (value) => {
  //     dispatch({
  //       type: 'SET_INPUT',
  //       payload: value
  //     })
  //   },
  //   addTodo: ({ id, content }) => {
  //     dispatch({
  //       type: 'ADD_TODO',
  //       payload: { id, content }
  //     })
  //   }
  // }), []);
  // function onChange(key, value) {
  //   dispatch({
  //     type: types.ON_CHANGE,
  //     meta: key,
  //     payload: value
  //   });
  // }
  const memoizedActions = React.useMemo(
    () => ({
      onChange: (key, value) => {
        dispatch({
          type: types.ON_CHANGE,
          meta: key,
          payload: value
        });
      },
      setRequest: (payload) => {
        dispatch({
          type: types.SET_REQUEST,
          payload
        });
      },

      setControls: (payload) => {
        dispatch({
          type: types.SET_CONTROLS,
          payload
        });
      },

      setParams: (payload) => {
        dispatch({
          type: types.SET_PARAMS,
          payload
        });
      },

      setDictation: (payload) => {
        dispatch({
          type: types.SET_DICTATION,
          payload
        });
      },
      onStart: () => {
        dispatch({
          type: types.ON_START
        });
      },
      onStop: () => {
        dispatch({
          type: types.ON_STOP
        });
      },
      onCheck: () => {
        dispatch({
          type: types.ON_CHECK
        });
      },
      onEnd: () => {
        dispatch({
          type: types.ON_END
        });
      },
      onBegin: () => {
        dispatch({
          type: types.ON_BEGIN
        });
      },
      onProgress: () => {
        dispatch({
          type: types.ON_PROGRESS
        });
      },
      onToggle: (key) => {
        dispatch({
          type: types.ON_TOGGLE,
          meta: key
        });
      },
      onUpdate: (payload) => {
        dispatch({
          type: types.ON_UPDATE,
          payload
        });
      },
      toggleControls: (key) => {
        dispatch({
          type: types.TOGGLE_CONTROLS,
          meta: key
        });
      },
      toggleDictation: (key) => {
        dispatch({
          type: types.TOGGLE_DICTATION,
          meta: key
        });
      },
      onDictationBegin: () => {
        dispatch({
          type: types.ON_DICTATION_BEGIN
        });
      },
      onDictationEnd: () => {
        dispatch({
          type: types.ON_DICTATION_END
        });
      },

      setCountdown: (payload) => {
        dispatch({
          type: types.SET_COUNTDOWN,
          payload
        });
      },
      onCountdownBegin: () => {
        dispatch({
          type: types.ON_COUNTDOWN_BEGIN
        });
      },
      onCountdownEnd: () => {
        dispatch({
          type: types.ON_COUNTDOWN_END
        });
      },
      onCountdownProgress: () => {
        dispatch({
          type: types.ON_COUNTDOWN_PROGRESS
        });
      },
      setCountdownIncrement: () => {
        dispatch({
          type: types.SET_COUNTDOWN_INCREMENT
        });
      },
      setNextArgs: () => {
        dispatch({
          type: types.SET_NEXT_ARGS
        });
      }
    }),
    [dispatch]
  );

  return memoizedActions;
  // return {
  // onChange,
  // onStart,
  // onStop,
  // onCheck,
  // onEnd,
  // onBegin,
  // onProgress,
  // onToggle,
  // onUpdate,
  // setRequest,
  // setControls,
  // toggleDictation,
  // toggleControls,
  // onDictationBegin,
  // onDictationEnd,
  // setNextArgs
  // };
}

function reducer(state, action) {
  const {
    dictationState: { dictation, amount },
    num
  } = state;
  switch (action.type) {
    case types.SET_NUM:
      return {
        ...state,
        num: action.payload
      };

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
        controls: {
          ...state.controls,
          ...{
            start: state.controls.repeat,
            stop: false,
            check: true,
            increment: state.controls.increment + 1
          }
        }
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
      const startIndex = dictation ? amount : 1;
      const nextArgs = action.payload.data.slice(
        num * startIndex,
        num * startIndex + startIndex
      );

      return {
        ...state,
        controls: {
          ...state.controls,
          args: dictation ? [] : nextArgs[0],
          queue: dictation ? nextArgs : []
        },
        request: { ...state.request, ...action.payload }
      };
    case types.SET_CONTROLS:
      return {
        ...state,
        controls: { ...state.controls, ...action.payload }
      };

    case types.SET_PARAMS:
      return {
        ...state,
        params: { ...state.params, ...action.payload }
      };

    case types.SET_DICTATION:
      return {
        ...state,
        dictationState: {
          ...state.dictationState,
          ...action.payload
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

    case types.SET_COUNTDOWN:
      return {
        ...state,
        countdownState: {
          ...state.countdownState,
          ...action.payload
        }
      };

    case types.ON_COUNTDOWN_BEGIN:
      return {
        ...state,
        countdownState: {
          ...state.countdownState,
          ...{
            begin: true,
            progress: false,
            end: false
          }
        }
      };

    case types.ON_COUNTDOWN_PROGRESS:
      return {
        ...state,
        countdownState: {
          ...state.countdownState,
          ...{
            progress: true
          }
        }
      };

    case types.ON_COUNTDOWN_END:
      return {
        ...state,
        countdownState: {
          ...state.countdownState,
          ...{
            begin: false,
            progress: false,
            end: true,
            increment: 0
          }
        },
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

    case types.SET_COUNTDOWN_INCREMENT:
      return {
        ...state,
        countdownState: {
          ...state.countdownState,
          ...{
            increment: state.countdownState.increment + 1
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
      return state;
  }
}

export function ControlsContextProvider(props) {
  const {
    state: globalState,
    children,
    num,
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

  // useEffect(() => {
  //   dispatch({
  //     type: types.ON_UPDATE,
  //     payload: globalState
  //   });
  // }, [globalState]);
  // TODO обдумать мб есть лучший вариант
  useEffect(() => {
    dispatch({
      type: types.SET_CONTROLS,
      payload: globalState.controls
    });
  }, [globalState.controls]);

  useEffect(() => {
    dispatch({
      type: types.SET_COUNTDOWN,
      payload: globalState.countdownState
    });
  }, [globalState.countdownState]);

  useEffect(() => {
    dispatch({
      type: types.SET_DICTATION,
      payload: globalState.dictationState
    });
  }, [globalState.dictationState]);

  useEffect(() => {
    dispatch({
      type: types.SET_REQUEST,
      payload: globalState.request
    });
  }, [globalState.request]);

  useEffect(() => {
    dispatch({
      type: types.SET_NUM,
      payload: num
    });
  }, [num]);

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
  console.log("ControlsContextProvider", { state, globalState, num });

  return (
    <ControlsStateContext.Provider value={state}>
      <ControlsActionsContext.Provider value={actions}>
        {children}
      </ControlsActionsContext.Provider>
    </ControlsStateContext.Provider>
  );
}
