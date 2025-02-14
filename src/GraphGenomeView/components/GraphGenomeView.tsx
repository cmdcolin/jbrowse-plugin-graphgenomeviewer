import React from 'react'

import { ErrorMessage, ResizeHandle } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'
import { makeStyles } from 'tss-react/mui'

import GraphPanel from './GraphPanel'
import Header from './Header'

import type { GraphGenomeViewModel } from '../model'

const useStyles = makeStyles()(theme => ({
  resizeHandle: {
    height: 4,
    background: '#ccc',
    boxSizing: 'border-box',
    borderTop: '1px solid #fafafa',
  },
}))
const GraphGenomeView = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { height, error } = model
  const { classes } = useStyles()
  return (
    <div>
      <div
        style={{
          padding: 10,
          height,
        }}
      >
        <Header model={model} />
        <div>
          {error ? <ErrorMessage error={error} /> : null}
          <GraphPanel model={model} />
        </div>
      </div>
      <ResizeHandle
        onDrag={n => model.setHeight(model.height + n)}
        className={classes.resizeHandle}
      />
    </div>
  )
})

export default GraphGenomeView
