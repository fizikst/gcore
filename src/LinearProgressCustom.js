import React, { useContext, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

import { timer } from "rxjs";
import { switchMap, filter, startWith, takeWhile } from "rxjs/operators";

import { useEventCallback } from "rxjs-hooks";
import { useControlsState, useControlsActions } from "./ControlsContext";

const LinearProgressCustom = () => {
  const {
    controls: { end },
    dictationState: { period }
  } = useControlsState();

  const [onEvent, frame] = useEventCallback((events$) =>
    events$.pipe(
      filter((e) => e.type === "linear_progress_start"),
      switchMap((action) =>
        timer(0, action.payload.period * 9).pipe(
          startWith(0),
          takeWhile((count) => count < 100)
        )
      )
    )
  );

  useEffect(() => {
    if (end) {
      onEvent({
        type: "linear_progress_start",
        payload: { period }
      });
    }
  }, [end, period]);

  return (
    <div>
      {end ? (
        <LinearProgress variant="determinate" value={frame} />
      ) : (
        <div style={{ height: "4px" }} />
      )}
    </div>
  );
};

export default LinearProgressCustom;
