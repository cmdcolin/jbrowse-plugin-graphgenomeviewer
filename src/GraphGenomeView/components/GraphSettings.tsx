import React from 'react'

import { Paper, Slider, TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react'

const GraphSettings = observer(function ({
  tmpLinkSteps,
  setTmpLinkSteps,
  tmpChunkSize,
  setTmpChunkSize,
  tmpStrengthCenter,
  setTmpStrengthCenter,
  tmpSequenceThickness,
  setTmpSequenceThickness,
  tmpLinkThickness,
  setTmpLinkThickness,
}: {
  tmpLinkSteps: number
  setTmpLinkSteps: (val: number) => void
  tmpChunkSize: string
  setTmpChunkSize: (val: string) => void
  tmpStrengthCenter: number
  setTmpStrengthCenter: (val: number) => void
  tmpSequenceThickness: number
  setTmpSequenceThickness: (val: number) => void
  tmpLinkThickness: number
  setTmpLinkThickness: (val: number) => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: 20,
      }}
    >
      <Paper elevation={6} style={{ padding: 16 }}>
        <div>
          <Typography variant="h6">
            Number of simulation steps for the links
          </Typography>
          <br />
          <div>
            Increases the rigidity of the simulation, higher numbers e.g. 10
            makes things much less floppy
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
      </Paper>
      <Paper elevation={6} style={{ padding: 16 }}>
        <div>
          <Typography variant="h6">Sequence chunk size</Typography>
          <br />
          <div>
            If a contig is of length 5000, then chunk length 1000 would become 5
            segments. Note: contigs smaller than the chunk length may be less
            proportionally sized (they do not get spaghettified)
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
      </Paper>

      <Paper elevation={6} style={{ padding: 16 }}>
        <div>
          <Typography variant="h6">Strength (particle charge)</Typography>
          <br />
          <div>
            Akin to charged particle force, a large negative number increases
            the repulsive force
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
      </Paper>
      <Paper elevation={6} style={{ padding: 16 }}>
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
      </Paper>
      <Paper elevation={6} style={{ padding: 16 }}>
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
      </Paper>
    </div>
  )
})

export default GraphSettings
