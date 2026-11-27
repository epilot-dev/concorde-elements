import type { Preview } from '@storybook/react'
// Imports styles for story only because journey-app has styles already
import 'material-symbols/sharp.css'
import 'material-symbols/rounded.css'
import '../src/global.css'
import 'react-datepicker/dist/react-datepicker.css'

const preview: Preview = {
  tags: ['autodocs']
}

export default preview
