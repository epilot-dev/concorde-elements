function on(eventType: string, listener: EventListenerOrEventListenerObject) {
  window.addEventListener(eventType, listener)
}

function off(eventType: string, listener: EventListenerOrEventListenerObject) {
  window.removeEventListener(eventType, listener)
}

function trigger(eventType: string, data: unknown) {
  const event = new CustomEvent(eventType, { detail: data })

  window.dispatchEvent(event)
}

export { on, off, trigger }

export * from './eventConstants'
