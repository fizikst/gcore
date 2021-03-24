import React, { useEffect } from "react";
import { useEventCallback } from "rxjs-hooks";
import { filter, tap, delay, combineLatest } from "rxjs/operators";
import { useControlsState, useControlsActions } from "./ControlsContext";

function Column(props) {
  const { render } = props;

  const {
    controls: { args, start, stop, progress }
  } = useControlsState();
  const { onBegin, onEnd, onProgress } = useControlsActions();

  const [onEvent] = useEventCallback(
    (events$, state$, inputs$) => {
      return events$.pipe(
        combineLatest(inputs$),
        filter(([event, [args]]) => event.type === "start" && args.length > 0),
        tap(() => onBegin()),
        tap(() => onProgress()),
        delay(100),
        tap(() => onEnd())
      );
    },
    0,
    [args]
  );

  useEffect(() => {
    // console.log('>>>>>>> args', {args})
    if (start) {
      console.log("Column useEffect start", { start });
      onEvent({ type: "start" });
    }
  }, [start]);

  // useEffect(() => {
  //   if (stop) {
  //     onEvent({ type: "stop" });
  //   }
  // }, [onEvent, stop]);

  return (
    <div>
      {render({
        args
      })}
    </div>
  );
}

export default Column;
