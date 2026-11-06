/**
 * Prepares an error message by extracting the name and extension from a file name and appending
 * a given type translation string, while also handling cases where the file name has no extension
 * or exceeds the maximum length of 25 characters.
 *
 * @param fileName The name of the file.
 * @param ofTypeTranslation The string to append after the file name and before the extension.
 * maxLength(internal): The maximum length of the file name. Defaults to 25.
 * ellipsis(internal):  The string to use to represent the truncation of the file name. Defaults to '...'.
 * @returns The prepared error message with the format: `name + ofTypeTranslation + extension`.
 * If the file name has no extension, the message will not include any extension.
 */
export const prepareErrorMessage = (
  fileName: string,
  ofTypeTranslation = 'Of a Type:'
): string => {
  const MAX_LENGTH = 25
  const ellipsis = '...'

  const lastDotIndex = fileName.lastIndexOf('.')
  const hasExtension = lastDotIndex !== -1

  const name = fileName.slice(0, hasExtension ? lastDotIndex : fileName.length)
  const truncatedName =
    name.length > MAX_LENGTH ? name.slice(0, MAX_LENGTH) + ellipsis : name
  const ext = hasExtension ? fileName.slice(lastDotIndex) : undefined

  return `${truncatedName} ${ofTypeTranslation}${ext ? ' ' + ext : ''}`
}
