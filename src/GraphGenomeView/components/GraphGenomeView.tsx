import React from 'react'

import { ErrorMessage, ResizeHandle } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'
import { makeStyles } from 'tss-react/mui'

import GraphPanel from './GraphPanel'
import Header from './Header'

import type { GraphGenomeViewModel } from '../model'

const useStyles = makeStyles()({
  resizeHandle: {
    height: 4,
    background: '#ccc',
    boxSizing: 'border-box',
    borderTop: '1px solid #fafafa',
    zIndex: 100,
  },
})
const GraphGenomeView = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { height, error, graph } = model
  const { classes } = useStyles()
  return (
    <div>
      <div
        style={{
          padding: 10,
        }}
      >
        <Header model={model} />
        <div>
          {error ? <ErrorMessage error={error} /> : null}
          <GraphPanel model={model} />
        </div>
      </div>
      {graph ? (
        <ResizeHandle
          onDrag={n => model.setHeight(height + n)}
          className={classes.resizeHandle}
        />
      ) : null}
    </div>
  )
})

export default GraphGenomeView
