import React from 'react'

import { Dialog } from '@jbrowse/core/ui'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { observer } from 'mobx-react'

const HelpDialog = observer(function ({
  handleClose,
}: {
  handleClose: () => void
}) {
  return (
    <Dialog
      open
      maxWidth="xl"
      title="Help with loc string input"
      onClose={handleClose}
    >
      <DialogContent style={{ maxWidth: 500 }}>
        <DialogContentText>
          Enter a genomic region, including the PanSN prefix for the assembly
          e.g. GRCh38#chr21:1,000,000-1,000,500. This parameter will be passed
          as the "--path" argument to vg chunk
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            handleClose()
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default HelpDialog
