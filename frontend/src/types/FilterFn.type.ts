export type FilterFn = (
  val: string,
  update: (callback: () => void) => void,
  abortFn: () => void
) => void;
