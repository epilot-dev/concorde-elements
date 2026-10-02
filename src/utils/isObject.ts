export const isObject = (arg: unknown): arg is Record<string, unknown> => {
  return (
    typeof arg === 'object' &&
    !Array.isArray(arg) &&
    arg !== null &&
    !!Object.keys(arg)
  )
}
