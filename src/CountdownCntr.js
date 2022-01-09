import React from "react";
import { useControlsState, useControlsActions } from "./ControlsContext";

import { useEventCallback } from "rxjs-hooks";
import {
  tap,
  switchMap,
  filter,
  map,
  finalize,
  takeWhile
} from "rxjs/operators";
import { timer, interval } from "rxjs";

function CountdownCntr({ render }) {
  const {
    countdownState: { begin, increment }
  } = useControlsState();

  const {
    onCountdownEnd,
    setCountdownIncrement,
    onCountdownProgress
  } = useControlsActions();

  const [onEvent] = useEventCallback((events$) => {
    return events$.pipe(
      filter((e) => e.type === "timer_start"),
      tap((e) => {
        e.deps.onCountdownProgress();
        return e;
      }),
      switchMap((action) =>
        interval(1000).pipe(
          takeWhile((inc) => inc < 3),
          tap((a) => action.deps.setCountdownIncrement()),
          finalize(() => {
            action.deps.onCountdownEnd();
          })
        )
      )
    );
  });

  React.useEffect(() => {
    if (begin) {
      onEvent({
        type: "timer_start",
        deps: { onCountdownProgress, onCountdownEnd, setCountdownIncrement }
      });
    }
  }, [begin]);

  console.count("CountdownCntr");
  // console.log({ inc });

  return <>{render({ begin, increment })}</>;
}

export default CountdownCntr;
