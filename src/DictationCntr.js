import React from "react";
import { useControlsState, useControlsActions } from "./ControlsContext";

import { useEventCallback } from "rxjs-hooks";
import {
  takeUntil,
  tap,
  switchMap,
  delay,
  filter,
  combineLatest
} from "rxjs/operators";

function DictationCntr() {
  const {
    controls: { start, stop, end, queue },
    dictationState
  } = useControlsState();

  const {
    onDictationBegin,
    onDictationEnd,
    setNextArgs
  } = useControlsActions();

  const [onEvent] = useEventCallback(
    (events$, state$, inputs$) => {
      return events$.pipe(
        filter((e) => e.type === "dictation_begin"),
        switchMap((action) => {
          return events$.pipe(
            filter((e) => e.type === "sample_start"),
            delay(1000 * Number(action.payload.interval)),
            tap(() => setNextArgs()),
            takeUntil(
              events$.pipe(
                combineLatest(inputs$),
                filter(
                  ([e, [samples, amount]]) =>
                    e.type === "dictation_end" || samples.length >= amount
                )
                // tap(() => onDictationEnd())
              )
            )
          );
        })
      );
    },
    0,
    [dictationState.samples, dictationState.amount]
  );

  React.useEffect(() => {
    if (dictationState.dictation && start) {
      onDictationBegin();
    }
  }, [dictationState.dictation, start]);

  React.useEffect(() => {
    if (dictationState.begin) {
      setNextArgs();
      onEvent({
        type: "dictation_begin",
        payload: { interval: dictationState.period }
      });
    }
  }, [dictationState.begin]);

  // React.useEffect(() => {
  //   if (queue.length > 0) {
  //     setNextArgs();
  //   }
  // }, [queue]);

  React.useEffect(() => {
    if (dictationState.dictation && stop) {
      onDictationEnd();
    }
  }, [dictationState.dictation, stop]);

  React.useEffect(() => {
    if (dictationState.end) {
      onEvent({
        type: "dictation_end"
      });
    }
  }, [dictationState.end]);

  React.useEffect(() => {
    if (end) {
      console.log({ end });
      onEvent({
        type: "sample_start",
        payload: { interval: dictationState.period }
      });
    }
  }, [end]);

  return <></>;
}

export default DictationCntr;
