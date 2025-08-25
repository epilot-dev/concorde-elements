import { fromEvent } from 'file-selector'
import type { DropEvent } from 'react-dropzone'

function isObject<T>(v: unknown): v is T {
  return typeof v === 'object' && v !== null
}

function isDataTransfer(value: unknown): value is DataTransfer {
  return isObject(value)
}

export function isDragEvent(value: unknown): value is DragEvent {
  return isObject<DragEvent>(value) && isDataTransfer(value.dataTransfer)
}

export const getFilesFromEvent = async (event: DropEvent): Promise<File[]> => {
  const fileList = isDragEvent(event)
    ? Object.values(event.dataTransfer?.files || {})
    : await fromEvent(event)

  const files = fileList.map((file) => {
    const tempId: Array<string | number> = [event.timeStamp]

    let fileRef: File

    if (file instanceof File) {
      fileRef = file
    } else {
      const _file = file.getAsFile()

      if (!_file) {
        // this would only happen if the dropped item is a string instead, which shouldn't happen
        // @see https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/kind
        throw new Error('UploadZone.fileGetter -> Expected a file but got null')
      }

      fileRef = _file
    }

    tempId.push(fileRef.name, fileRef.size, fileRef.type, fileRef.lastModified)

    return Object.assign(fileRef, { tempId: tempId.join('-') })
  })

  return files
}
