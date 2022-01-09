import React from "react";
import Terminal from "./Terminal";
import { useControlsState, useControlsActions } from "./ControlsContext";

import axios from "axios";
const config = {
  headers: {
    authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVkMjBhNjk0Njc4MjQ0NTJjNzMwOWE1OSIsInJvbGUiOjIsIm5hbWUiOiJUZXN0IFRlc3QiLCJleHAiOjE2NDE1NzM0NTE1NDB9.YvYkXfdUdqnWvSdbVnlyeJn9BSQxk3ezKaJ1602oCOQ"
  }
};

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function HttpDataProvider() {
  const { setRequest } = useControlsActions();
  // const { request } = useControlsState();

  const {
    controls: { start, increment },
    params
  } = useControlsState();

  // React.useEffect(() => {
  //   if (start) {
  //     axios
  //       .post(
  //         `https://api.gorazd.online/arifmetik_book/args?terminal_count=6`,
  //         { params },
  //         config
  //       )
  //       .then((response) => {
  //         console.log({ data: response.data.data });
  //         setRequest({
  //           success: true,
  //           data: response.data.data
  //         });
  //       })
  //       .catch((data) => {
  //         console.log({ data });
  //       });
  //   }
  // }, [start, setRequest, increment, params]);

  // React.useEffect(() => {
  //   if (start) {
  //     setRequest({
  //       success: true,
  //       data: [
  //         [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)],
  //         [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)],
  //         [randomInteger(1, 10), randomInteger(1, 10), randomInteger(1, 10)]
  //       ]
  //     });
  //   }
  // }, [start, setRequest, increment]);

  return <Terminal />;
}

export default HttpDataProvider;
// <button onClick={handleStart}>Start</button>
//<button onClick={handleGetArgs}>Load data</button>
