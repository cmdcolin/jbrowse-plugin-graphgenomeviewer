import React from 'react'

import { Dialog } from '@jbrowse/core/ui'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { observer } from 'mobx-react'

const SettingsDialog = observer(function ({
  data,
  handleClose,
}: {
  data: string
  handleClose: (arg: boolean) => void
}) {
  return (
    <Dialog open maxWidth="xl" title="Large file warning" onClose={handleClose}>
      <DialogContent style={{ minWidth: 800 }}>
        <DialogContentText>
          Are you sure you want to open file (detected size{' '}
          {data.length / 1_000_000}Mb?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            handleClose(true)
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleClose(false)
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default SettingsDialog
