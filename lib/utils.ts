import {CallbackFunction} from './types'

//Try catch is not supported in optimizing
//compiler, so it is isolated
export const errorObj = {e: {}}
let tryCatchTarget: CallbackFunction

function tryCatcher(err: Error, val?: any): any {
  try {
    const target = tryCatchTarget
    tryCatchTarget = null
    return target.apply(this, arguments)
  } catch (e) {
    errorObj.e = e
    return errorObj
  }
}
export function tryCatch(fn: CallbackFunction) {
  tryCatchTarget = fn
  return tryCatcher
}
