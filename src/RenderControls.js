import React from "react";

import { useControlsState, useControlsActions } from "./ControlsContext";

import axios from "axios";
const config = {
  headers: {
    authorization:
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVkMjBhNjk0Njc4MjQ0NTJjNzMwOWE1OSIsInJvbGUiOjIsIm5hbWUiOiJUZXN0IFRlc3QiLCJleHAiOjE2NDE1NzM0NTE1NDB9.YvYkXfdUdqnWvSdbVnlyeJn9BSQxk3ezKaJ1602oCOQ"
  }
};

function RenderControls() {
  // const handleStart = () => {
  //   setControls({ start: true });
  // };

  const {
    onStart,
    onStop,
    onCheck,
    onCountdownBegin,
    onChange,
    setControls,
    setRequest
  } = useControlsActions();

  const handleChange = (event) => {
    setControls({ value: event.target.value });
  };

  const {
    controls: { success, failure, start, value, repeat },
    params
  } = useControlsState();

  const handleCheck = () => {
    onCheck();
    axios
      .post(
        `https://api.gorazd.online/arifmetik_book/args?terminal_count=3`,
        { params },
        config
      )
      .then((response) => {
        setRequest({
          success: true,
          data: response.data.data
        });
      })
      .catch((data) => {
        console.log({ data });
      });
  };

  const handleStart = () => {
    // onCountdownBegin();
    // if (start) {
    axios
      .post(
        `https://api.gorazd.online/arifmetik_book/args?terminal_count=3`,
        { params },
        config
      )
      .then((response) => {
        console.log({ data: response.data.data });
        onCountdownBegin();
        setRequest({
          success: true,
          data: response.data.data
        });
      })
      .catch((data) => {
        console.log({ data });
      });
    // }
  };

  console.count("RenderControls");

  return (
    <div>
      <p>
        <input type="text" name="value" value={value} onChange={handleChange} />
        <button onClick={handleCheck}>check</button>
      </p>
      <p>
        {start ? (
          <button onClick={onStop}>stop</button>
        ) : (
          <button onClick={handleStart}>play</button>
        )}
        <br />
        <span>success: {success}</span>
        <span>failure:{failure}</span>
      </p>
    </div>
  );
}

export default RenderControls;
