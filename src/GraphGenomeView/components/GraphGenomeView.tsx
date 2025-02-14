import React from 'react'

import { ErrorMessage } from '@jbrowse/core/ui'
import { observer } from 'mobx-react'

import GraphPanel from './GraphPanel'
import Header from './Header'

import type { GraphGenomeViewModel } from '../model'

const GraphGenomeView = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { error } = model
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
    </div>
  )
})

export default GraphGenomeView
