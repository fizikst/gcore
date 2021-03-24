import React from "react";
import Terminal from "./Terminal";
import { useControlsState, useControlsActions } from "./ControlsContext";

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function HttpDataProvider() {
  const { setRequest } = useControlsActions();
  // const { request } = useControlsState();

  const {
    controls: { start }
  } = useControlsState();

  // const handleGetArgs = () => {
  //   setRequest({
  //     success: true,
  //     data: [
  //       [1, 2, 3],
  //       [4, 5, 6]
  //     ]
  //   });
  // };

  React.useEffect(() => {
    if (start) {
      setRequest({
        success: true,
        data: [
          [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)],
          [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)],
          [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)]
        ]
      });
    }
  }, [start]);

  return <Terminal />;
}

export default HttpDataProvider;
// <button onClick={handleStart}>Start</button>
//<button onClick={handleGetArgs}>Load data</button>
