import React, { useState } from 'react'

import { Graph } from 'graphgenomeviewer'
import { observer } from 'mobx-react'

import FeatureDialog from './FeatureDialog'

import type { GraphGenomeViewModel } from '../model'

const GraphPanel = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { graph } = model
  const [featureData, setFeatureData] = useState<Record<string, unknown>>()
  return graph ? (
    <>
      {featureData ? (
        <FeatureDialog
          data={featureData}
          onClose={() => {
            setFeatureData(undefined)
          }}
        />
      ) : null}
      <Graph
        graph={graph}
        onFeatureClick={data => {
          setFeatureData(data)
        }}
      />
    </>
  ) : null
})

export default GraphPanel
