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
  Slider,
  Tab,
  Tabs,
  TextField,
  Typography,
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
  const [tabValue, setTabValue] = useState(0)
  const {
    chunkSize,
    strengthCenter,
    linkThickness,
    linkSteps,
    sequenceThickness,
  } = graphSettings
  const [tmpChunkSize, setTmpChunkSize] = useState(`${chunkSize}`)
  const [tmpLinkSteps, setTmpLinkSteps] = useState(linkSteps)
  const [tmpStrengthCenter, setTmpStrengthCenter] = useState(strengthCenter)
  const [tmpSequenceThickness, setTmpSequenceThickness] =
    useState(sequenceThickness)
  const [tmpLinkThickness, setTmpLinkThickness] = useState(linkThickness)
  return (
    <Dialog open maxWidth="xl" title="Settings" onClose={handleClose}>
      <DialogContent style={{ maxWidth: 500 }}>
        <Tabs
          value={tabValue}
          onChange={(_event, newValue) => setTabValue(newValue)}
          sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
        >
          <Tab label="Mode Settings" />
          <Tab label="Graph Settings" />
        </Tabs>

        {tabValue === 0 ? (
          <>
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
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div>
                <Typography variant="h6">
                  Number of simulation steps for the links
                </Typography>
                <br />
                <div>
                  Increases the rigidity of the simulation, higher numbers e.g.
                  10 makes things much less floppy
                </div>
              </div>
              <div>
                <Slider
                  min={1}
                  max={20}
                  value={+tmpLinkSteps}
                  onChange={(_event, val) => {
                    setTmpLinkSteps(val as number)
                  }}
                />
                Current value: {tmpLinkSteps}
              </div>
            </div>
            <div>
              <div>
                <Typography variant="h6">Sequence chunk size</Typography>
                <br />
                <div>
                  If a contig is of length 5000, then chunk length 1000 would
                  become 5 segments. Note: contigs smaller than the chunk length
                  may be less proportionally sized (they do not get
                  spaghettified)
                </div>
              </div>
              <div>
                <TextField
                  value={tmpChunkSize}
                  onChange={event => {
                    setTmpChunkSize(event.target.value)
                  }}
                />
              </div>
            </div>

            <div>
              <div>
                <Typography variant="h6">Strength (particle charge)</Typography>
                <br />
                <div>
                  Akin to charged particle force, a large negative number
                  increases the repulsive force
                </div>
              </div>
              <div>
                <Slider
                  min={-100}
                  max={-1}
                  value={tmpStrengthCenter}
                  onChange={(_event, val) => {
                    setTmpStrengthCenter(val as number)
                  }}
                />
                Current value: {tmpStrengthCenter}
              </div>
            </div>
            <div>
              <div>
                <Typography variant="h6">Sequence thickness (px)</Typography>
              </div>
              <div>
                <Slider
                  min={1}
                  max={20}
                  value={tmpSequenceThickness}
                  onChange={(_event, val) => {
                    setTmpSequenceThickness(val as number)
                  }}
                />
                Current value: {tmpSequenceThickness}px
              </div>
            </div>
            <div>
              <div>
                <Typography variant="h6">Link thickness (px)</Typography>
              </div>
              <div>
                <Slider
                  min={1}
                  max={20}
                  value={tmpLinkThickness}
                  onChange={(_event, val) => {
                    setTmpLinkThickness(val as number)
                  }}
                />
                Current value: {tmpLinkThickness}px
              </div>
            </div>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            graphSettings.setChunkSize(+tmpChunkSize)
            graphSettings.setLinkSteps(+tmpLinkSteps)
            graphSettings.setStrengthCenter(+tmpStrengthCenter)
            graphSettings.setSequenceThickness(+tmpSequenceThickness)
            graphSettings.setLinkThickness(+tmpLinkThickness)
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
