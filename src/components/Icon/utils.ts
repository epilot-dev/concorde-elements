export function getColor(color?: string) {
  if (color === 'primary') {
    return 'var(--concorde-primary-color)'
  }
  if (color === 'secondary') {
    return 'var(--concorde-secondary-color)'
  }
  if (color === 'error') {
    return 'var(--concorde-error-color)'
  }

  return color
}
