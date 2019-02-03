import {tryCatch, errorObj} from './utils'
import {CallbackFunction} from './types'

function throwLater (e: Error) {
  setTimeout(function () {
    throw e
  }, 0)
}

export interface IOptions {
  spread: boolean
}

export default function asCallback (promise: Promise<any>, nodeback: CallbackFunction, options?: IOptions) {
  if (typeof nodeback === 'function') {
    promise.then((val) => {
      let ret: any
      if (options !== undefined && Object(options).spread && Array.isArray(val)) {
        ret = tryCatch(nodeback).apply(undefined, [null].concat(val))
      } else {
        ret = val === undefined
          ? tryCatch(nodeback)(null)
          : tryCatch(nodeback)(null, val)
      }
      if (ret === errorObj) {
        throwLater(ret.e)
      }
    }, (cause: Error) => {
      if (!cause) {
        const newReason = new Error(cause + '')
        Object.assign(newReason, {cause})
        cause = newReason
      }
      const ret = tryCatch(nodeback)(cause)
      if (ret === errorObj) {
        throwLater(ret.e)
      }
    })
  }

  return promise
}
