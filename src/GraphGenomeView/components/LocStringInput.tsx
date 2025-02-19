import React from 'react'

import { getSession } from '@jbrowse/core/util'
import { Button, IconButton, TextField } from '@mui/material'
import { observer } from 'mobx-react'

import { Help } from '@mui/icons-material'

import HelpDialog from './HelpDialog'

import type { GraphGenomeViewModel } from '../model'

const LocStringInput = observer(function LocStringInput({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { locstring } = model
  return (
    <div>
      <TextField
        type="text"
        variant="outlined"
        placeholder="GRCh38#chr21:1,000,000-1,000,500"
        value={locstring}
        style={{ margin: 0, marginRight: 10, minWidth: 500 }}
        onChange={event => {
          model.setGenomicRegionLocString(event.target.value)
        }}
      />
      <Button variant="contained" type="submit">
        Submit
      </Button>
      <IconButton
        onClick={() => {
          getSession(model).queueDialog(handleClose => [
            HelpDialog,
            { handleClose },
          ])
        }}
      >
        <Help />
      </IconButton>
    </div>
  )
})
export default LocStringInput
