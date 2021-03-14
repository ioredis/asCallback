import { CallbackFunction } from "./types";

//Try catch is not supported in optimizing
//compiler, so it is isolated
export const errorObj = { e: {} };
let tryCatchTarget: CallbackFunction<unknown>;

function tryCatcher<T>(err: Error, val?: T): void | { e: Error } {
  try {
    const target = tryCatchTarget;
    tryCatchTarget = null;
    return target.apply(this, arguments);
  } catch (e) {
    errorObj.e = e;
    return errorObj as { e: Error };
  }
}
export function tryCatch<T>(fn: CallbackFunction<T>): typeof tryCatcher {
  tryCatchTarget = fn;
  return tryCatcher;
}
