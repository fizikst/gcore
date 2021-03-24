import React, { useEffect } from "react";
import { useEventCallback } from "rxjs-hooks";
import { filter, tap, map, combineLatest } from "rxjs/operators";
import timerEpic from "./timerEpic";
import laodAudiosEpic from "./laodAudiosEpic";
import { useControlsState, useControlsActions } from "./ControlsContext";
function Forsage(props) {
  const { render } = props;

  const {
    controls: { start, stop, check, sound, begin, end, progress, args },
    dictationState
  } = useControlsState();

  const {
    onDictationBegin,
    onDictationEnd,
    setNextArgs,
    onBegin,
    onEnd,
    onProgress
  } = useControlsActions();

  const [inc, setInc] = React.useState(0);

  const handleError = (data) => {
    console.log("error handle", data);
    onEvent({
      type: "error"
    });
  };

  const [onEvent, index] = useEventCallback(
    (events$, state$, inputs$) => {
      return events$.pipe(
        combineLatest(inputs$),
        filter(([event, [args, sound, end]]) => {
          console.log("ON EVENT OBSERVEBLE", {
            type: event.type,
            arglength: args.length,
            sound,
            end
          });
          return event.type === "start" && args.length > 0;
        }),
        tap(() => console.log("ON EVENT OBSERVEBLE EENNDD")),

        map(([event, [args, sound]]) => [args, sound]),
        tap((e) =>
          console.log("<<<<<<<<<<<<<<<< Start load audios >>>>>>>>>>>>>>>>", e)
        ),
        laodAudiosEpic(events$, handleError),

        tap(() => onBegin()),
        tap(() => setInc(0)),
        tap(() => onProgress()),
        tap((e) =>
          console.log("<<<<<<<<<<<<<<<< Start timer >>>>>>>>>>>>>>>>", e)
        ),
        timerEpic(events$, setInc),
        filter(([index, count]) => index >= count - 1),
        tap(() => onEnd())
      );
    },
    0,
    [args, sound]
  );

  useEffect(() => {
    if (start) {
      onEvent({ type: "start" });
    }
  }, [onEvent, start]);

  useEffect(() => {
    if (stop) {
      onEvent({ type: "stop" });
    }
  }, [onEvent, stop]);

  console.log("RESULT", { inc, end, start, stop, begin, progress, end });

  console.count("FORSAGE");

  return render({ args, inc });
}

export default Forsage;
