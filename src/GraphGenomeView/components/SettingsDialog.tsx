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
  Tab,
  Tabs,
} from '@mui/material'
import { observer } from 'mobx-react'

import GraphSettings from './GraphSettings'
import ServerSettings from './ServerSettings'

import type { GraphGenomeViewModel } from '../model'

const SettingsDialog = observer(function ({
  model,
  handleClose,
}: {
  model: GraphGenomeViewModel
  handleClose: () => void
}) {
  const { mode, graphSettings } = model
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
      <DialogContent style={{ minWidth: 800 }}>
        <Tabs
          value={tabValue}
          onChange={(_event, newValue) => {
            setTabValue(newValue)
          }}
        >
          <Tab label="Graph Settings" />
          <Tab label="Mode Settings" />
        </Tabs>

        {tabValue === 1 ? (
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
            {mode === 'server' ? <ServerSettings model={model} /> : null}
          </>
        ) : (
          <GraphSettings
            tmpLinkSteps={tmpLinkSteps}
            setTmpLinkSteps={setTmpLinkSteps}
            tmpChunkSize={tmpChunkSize}
            setTmpChunkSize={setTmpChunkSize}
            tmpStrengthCenter={tmpStrengthCenter}
            setTmpStrengthCenter={setTmpStrengthCenter}
            tmpSequenceThickness={tmpSequenceThickness}
            setTmpSequenceThickness={setTmpSequenceThickness}
            tmpLinkThickness={tmpLinkThickness}
            setTmpLinkThickness={setTmpLinkThickness}
          />
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
