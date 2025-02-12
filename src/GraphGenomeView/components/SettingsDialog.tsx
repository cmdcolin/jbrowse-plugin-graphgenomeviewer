import React from 'react'

import { Dialog } from '@jbrowse/core/ui'
import {
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { observer } from 'mobx-react'

import type { GraphGenomeViewModel } from '../model'

const SettingsDialog = observer(function ({
  model,
  handleClose,
}: {
  model: GraphGenomeViewModel
  handleClose: () => void
}) {
  const { mode, serverRoot } = model
  return (
    <Dialog open maxWidth="xl" title="Settings" onClose={handleClose}>
      <DialogContent style={{ minWidth: 800 }}>
        <FormControl component="fieldset">
          <RadioGroup
            value={mode}
            onChange={event => {
              model.setMode(event.target.value)
            }}
          >
            <FormControlLabel
              value="files"
              control={<Radio />}
              label="Use GFA files"
            />
            <FormControlLabel
              value="server"
              control={<Radio />}
              label="Use GFA server"
            />
          </RadioGroup>
        </FormControl>
        {mode === 'server' ? (
          <div>
            <div>Server settings:</div>
            <TextField
              label="Path to the simpleGfaServer e.g. http://localhost:9000/"
              style={{ minWidth: 500 }}
              value={serverRoot}
              onChange={event => model.setServerRoot(event.target.value)}
            />
          </div>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            handleClose()
          }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            handleClose()
          }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default SettingsDialog
