import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type {
  EnrichedFile,
  EnrichedFileRejection,
  UploadZoneCSSProperties,
  UploadZoneProps
} from '..'
import { List, ListItem, Spacing, Typography, UploadZone } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<UploadZoneProps> = {
  title: 'Elements/Upload Zone',
  component: UploadZone,
  parameters: {
    layout: 'centered'
  },
  args: {
    acceptedFilesMIME: 'image/*'
  },
  argTypes: {
    customDropZone: { control: false },
    uploadIcon: { control: false },
    uploadMessage: { control: 'text' },
    containerProps: { control: false }
  },
  render: Object.assign(
    (args: UploadZoneProps) => {
      const [files, setFiles] = useState<EnrichedFile[]>([])
      const [rejectedFiles, setRejectedFiles] = useState<
        EnrichedFileRejection[]
      >([])

      // the call back that will be fired in the dropzone once the file is dropped and accepted
      const onDropAccepted = (files: EnrichedFile[]) => {
        setFiles(files)
      }

      // the call back that will be fired in the dropzone once the file is dropped and accepted
      const onDropRejected = (files: EnrichedFileRejection[]) => {
        setRejectedFiles(files)
      }

      // render the files
      const renderFiles = files.map((file: EnrichedFile) => (
        <ListItem key={file.path}>
          {file.path} - {file.size} bytes
        </ListItem>
      ))

      // render the files
      const renderRejectedFiles = rejectedFiles.map(
        ({ file }: EnrichedFileRejection) => (
          <ListItem key={file.path}>
            {file.path} - {file.size} bytes
          </ListItem>
        )
      )

      return (
        <>
          <UploadZone
            {...args}
            onDropAccepted={onDropAccepted}
            onDropRejected={onDropRejected}
          />
          <Spacing scale={4} style={{ marginTop: 20 }} variant="stack">
            {renderFiles.length > 0 && (
              <div>
                <Typography as="h5">Accepted Files</Typography>
                <List>{renderFiles}</List>
              </div>
            )}
            {renderRejectedFiles.length > 0 && (
              <div>
                <Typography as="h5">Rejected Files</Typography>
                <List>{renderRejectedFiles}</List>
              </div>
            )}
          </Spacing>
        </>
      )
    },
    {
      displayName: 'UploadZone'
    }
  )
}

export default meta

type Story = StoryObj<UploadZoneProps>

export const Default: Story = {
  args: {}
}

const CUSTOM_TOKENS: UploadZoneCSSProperties = {
  '--concorde-dropzone-accepted-color': 'string',
  '--concorde-dropzone-rejected-color': 'string',
  '--concorde-dropzone-active-background-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
