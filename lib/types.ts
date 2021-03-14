export type CallbackFunction<T> =
  | ((err: null, val: T) => void)
  | ((err: Error) => void);
