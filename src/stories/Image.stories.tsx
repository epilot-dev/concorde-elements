import type { Meta, StoryObj } from '@storybook/react'

import type { ImageProps } from '..'
import { Image } from '..'

const defaultImage =
  'data:image/svg+xml;base64,PHN2ZwogIGZpbGw9Im5vbmUiCiAgaGVpZ2h0PSIxNjYiCiAgdmlldy1ib3g9IjAgMCAyNTMgMTY2IgogIHdpZHRoPSIyNTMiCiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgo+CiAgPHBhdGgKICAgIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgIGQ9Ik0xMjYuNDg2IDQ1LjU5MTNDMTI1Ljg1MSA0NS4zMzI5IDEyNS4xNDMgNDUuMzMyOSAxMjQuNTA5IDQ1LjU5MTNMOTIuODAyMiA1OC40ODM0TDEyNS40OTcgNzEuNzgwNUwxNTguMTkzIDU4LjQ4MzRMMTI2LjQ4NiA0NS41OTEzWk0xNjIuNjg3IDYyLjQ4MDFMMTI4LjE1NCA3Ni41MjI2VjExOS4zMTRMMTYyLjY4NyAxMDUuMjcyVjYyLjQ4MDFaTTEyMi44NDEgMTE5LjMxNFY3Ni41MTcyTDg4LjMwNzUgNjIuNDc0N1YxMDUuMjY2TDEyMi44NDEgMTE5LjMxNFpNMTIyLjUzOCA0MC41NzkzQzEyNC40MzggMzkuODA2OSAxMjYuNTU3IDM5LjgwNjkgMTI4LjQ1NyA0MC41NzkzTDE2Ni4zMzIgNTUuOTc3NEMxNjYuODI0IDU2LjE3OCAxNjcuMjQ2IDU2LjUyMzkgMTY3LjU0NCA1Ni45NzA1QzE2Ny44NDEgNTcuNDE3MiAxNjggNTcuOTQ0MSAxNjggNTguNDgzNFYxMDUuMjY2QzE2Ny45OTkgMTA2LjM0NiAxNjcuNjgxIDEwNy40IDE2Ny4wODUgMTA4LjI5M0MxNjYuNDg5IDEwOS4xODcgMTY1LjY0NCAxMDkuODc4IDE2NC42NTggMTEwLjI3OEwxMjYuNDg2IDEyNS44MDZDMTI1Ljg1MSAxMjYuMDY1IDEyNS4xNDMgMTI2LjA2NSAxMjQuNTA5IDEyNS44MDZMODYuMzQxOCAxMTAuMjc4Qzg1LjM1NTkgMTA5Ljg3OCA4NC41MTA3IDEwOS4xODcgODMuOTE1IDEwOC4yOTNDODMuMzE5NCAxMDcuNCA4My4wMDA3IDEwNi4zNDYgODMgMTA1LjI2NlY1OC40ODM0QzgzLjAwMDEgNTcuOTQ0MSA4My4xNTkxIDU3LjQxNzIgODMuNDU2NCA1Ni45NzA1QzgzLjc1MzcgNTYuNTIzOSA4NC4xNzU4IDU2LjE3OCA4NC42NjgyIDU1Ljk3NzRMMTIyLjUzOCA0MC41NzkzWiIKICAgIGZpbGw9IiMwMzlCRTUiCiAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgLz4KPC9zdmc+'

const wrongImage =
  'data:image/svg+xml;base64,PHiiN2ZwogIGZpbGw9Im5vbmUiCiAgaGVpZ2h0PSIxNjYiCiAgdmlldy1ib3g9IjAgMCAyNTMgMTY2IgogIHdpZHRoPSIyNTMiCiAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgo+CiAgPHBhdGgKICAgIGNsaXAtcnVsZT0iZXZlbm9kZCIKICAgIGQ9Ik0xMjYuNDg2IDQ1LjU5MTNDMTI1Ljg1MSA0NS4zMzI5IDEyNS4xNDMgNDUuMzMyOSAxMjQuNTA5IDQ1LjU5MTNMOTIuODAyMiA1OC40ODM0TDEyNS40OTcgNzEuNzgwNUwxNTguMTkzIDU4LjQ4MzRMMTI2LjQ4NiA0NS41OTEzWk0xNjIuNjg3IDYyLjQ4MDFMMTI4LjE1NCA3Ni41MjI2VjExOS4zMTRMMTYyLjY4NyAxMDUuMjcyVjYyLjQ4MDFaTTEyMi44NDEgMTE5LjMxNFY3Ni41MTcyTDg4LjMwNzUgNjIuNDc0N1YxMDUuMjY2TDEyMi44NDEgMTE5LjMxNFpNMTIyLjUzOCA0MC41NzkzQzEyNC40MzggMzkuODA2OSAxMjYuNTU3IDM5LjgwNjkgMTI4LjQ1NyA0MC41NzkzTDE2Ni4zMzIgNTUuOTc3NEMxNjYuODI0IDU2LjE3OCAxNjcuMjQ2IDU2LjUyMzkgMTY3LjU0NCA1Ni45NzA1QzE2Ny44NDEgNTcuNDE3MiAxNjggNTcuOTQ0MSAxNjggNTguNDgzNFYxMDUuMjY2QzE2Ny45OTkgMTA2LjM0NiAxNjcuNjgxIDEwNy40IDE2Ny4wODUgMTA4LjI5M0MxNjYuNDg5IDEwOS4xODcgMTY1LjY0NCAxMDkuODc4IDE2NC42NTggMTEwLjI3OEwxMjYuNDg2IDEyNS44MDZDMTI1Ljg1MSAxMjYuMDY1IDEyNS4xNDMgMTI2LjA2NSAxMjQuNTA5IDEyNS44MDZMODYuMzQxOCAxMTAuMjc4Qzg1LjM1NTkgMTA5Ljg3OCA4NC41MTA3IDEwOS4xODcgODMuOTE1IDEwOC4yOTNDODMuMzE5NCAxMDcuNCA4My4wMDA3IDEwNi4zNDYgODMgMTA1LjI2NlY1OC40ODM0QzgzLjAwMDEgNTcuOTQ0MSA4My4xNTkxIDU3LjQxNzIgODMuNDU2NCA1Ni45NzA1QzgzLjc1MzcgNTYuNTIzOSA4NC4xNzU4IDU2LjE3OCA4NC42NjgyIDU1Ljk3NzRMMTIyLjUzOCA0MC41NzkzWiIKICAgIGZpbGw9IiMwMzlCRTUiCiAgICBmaWxsLXJ1bGU9ImV2ZW5vZGQiCiAgLz4KPC9zdmc+'

const meta: Meta<ImageProps> = {
  title: 'Elements/Image',
  component: Image,
  parameters: {
    layout: 'centered'
  },
  args: {
    src: defaultImage,
    alt: 'placeholder image',
    errorText: 'Image failed to load',
    isDefaultLoaded: false
  },
  argTypes: {
    src: { control: 'text' },
    fallbackSrc: {
      control: 'text',
      description: `Sets the fallback src if the src doesn't load`
    },
    alt: { control: 'text' },
    errorText: {
      control: 'text',
      description: `Overrides the default error message when an image doesn't load`
    },
    isDefaultLoaded: {
      control: 'boolean',
      description:
        'Decides whether image will load immediately or be delayed using the default animation.\n\nDefaults to `true`'
    }
  }
}

export default meta

type Story = StoryObj<ImageProps>

export const Default: Story = {
  args: {
    src: defaultImage,
    alt: 'placeholder image'
  }
}

export const DelayedLoading: Story = {
  args: {
    alt: 'placeholder image',
    isDefaultLoaded: false
  }
}

export const Error: Story = {
  args: {
    src: wrongImage,
    alt: 'placeholder image',
    errorText: ''
  }
}
