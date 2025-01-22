import React, { useState } from 'react'

import { parseLocString } from '@jbrowse/core/util'
import { Button, TextField } from '@mui/material'
import { GFAGraph } from 'graphgenomeviewer'
import { observer } from 'mobx-react'

import FeatureDialog from './FeatureDialog'

import type { GraphGenomeViewModel } from '../model'

const GraphGenomeView = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { location } = model
  const [val, setVal] = useState('GRCh38#chr21:1000-2000')

  const [featureData, setFeatureData] = useState<Record<string, unknown>>()
  return (
    <div
      style={{
        padding: 10,
      }}
    >
      {featureData ? (
        <FeatureDialog
          data={featureData}
          onClose={() => {
            setFeatureData(undefined)
          }}
        />
      ) : null}
      <div>
        <form
          onSubmit={event => {
            event.preventDefault()

            const ret = parseLocString(val, arg => {
              return !arg.includes(':')
            })
            model.setLocation(
              `http://localhost:3003/?graph=chr21.vg&chr=${encodeURIComponent(ret.refName)}&start=${ret.start}&end=${ret.end}`,
            )
          }}
        >
          <TextField
            type="text"
            variant="outlined"
            size="small"
            value={val}
            style={{ minWidth: 500 }}
            onChange={event => {
              setVal(event.target.value)
            }}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
      {location ? (
        <GFAGraph
          url={location}
          onFeatureClick={data => {
            setFeatureData(data)
          }}
        />
      ) : null}
    </div>
  )
})

export default GraphGenomeView
