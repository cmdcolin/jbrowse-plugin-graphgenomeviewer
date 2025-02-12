import React, { useState } from 'react'

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
  const { mode, graphSettings, serverRoot } = model
  const {
    chunkSize,
    strengthCenter,
    linkThickness,
    linkSteps,
    sequenceThickness,
  } = graphSettings
  const [tempChunkSize, setTempChunkSize] = useState(`${chunkSize}`)
  const [tempLinkSteps, setTempLinkSteps] = useState(`${linkSteps}`)
  const [tempStrengthCenter, setTempStrengthCenter] = useState(
    `${strengthCenter}`,
  )
  const [tempSequenceThickness, setTempSequenceThickness] = useState(
    `${sequenceThickness}`,
  )
  const [tempLinkThickness, setTempLinkThickness] = useState(`${linkThickness}`)
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

        <div>
          <div>
            Number of simulation steps for the links
            <br />
            <div>
              Increases the rigidity of the simulation, higher numbers e.g. 10
              makes things much less floppy
            </div>
          </div>
          <div>
            <input
              type="range"
              min={1}
              max={20}
              style={{ width: '100%' }}
              value={tempLinkSteps}
              onChange={event => {
                setTempLinkSteps(event.target.value)
              }}
            />
            Current value: {linkSteps}
          </div>
        </div>
        <div>
          <div>
            Sequence chunk size
            <br />
            <div>
              If a contig is of length 5000, then chunk length 1000 would become
              5 segments. Note: contigs smaller than the chunk length may be
              less proportionally sized (they do not get spaghettified)
            </div>
          </div>
          <div>
            <TextField
              value={tempChunkSize}
              onChange={event => {
                setTempChunkSize(event.target.value)
              }}
            />
          </div>
        </div>
        <div>
          <div>
            Strength (particle charge)
            <br />
            <div>
              Akin to charged particle force, a large negative number increases
              the repulsive force
            </div>
          </div>
          <div>
            <input
              type="range"
              min={-100}
              max={-1}
              style={{ width: '100%' }}
              value={tempStrengthCenter}
              onChange={event => {
                setTempStrengthCenter(event.target.value)
              }}
            />
            Current value: {strengthCenter}
          </div>
        </div>
        <div>
          <div>
            Sequence thickness
            <br />
            <div>Visual thickness in px for the sequence chunks</div>
          </div>
          <div>
            <input
              type="range"
              min={1}
              max={20}
              style={{ width: '100%' }}
              value={tempSequenceThickness}
              onChange={event => {
                setTempSequenceThickness(event.target.value)
              }}
            />
            Current value: {sequenceThickness}px
          </div>
        </div>
        <div>
          <div>
            Link thickness
            <br />
            <div>Visual thickness in px for the links</div>
          </div>
          <div>
            <input
              type="range"
              min={1}
              max={20}
              style={{ width: '100%' }}
              value={tempLinkThickness}
              onChange={event => {
                setTempLinkThickness(event.target.value)
              }}
            />
            Current value: {linkThickness}px
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            graphSettings.setChunkSize(+tempChunkSize)
            graphSettings.setLinkSteps(+tempLinkSteps)
            graphSettings.setStrengthCenter(+tempStrengthCenter)
            graphSettings.setSequenceThickness(+tempSequenceThickness)
            graphSettings.setLinkThickness(+tempLinkThickness)
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
