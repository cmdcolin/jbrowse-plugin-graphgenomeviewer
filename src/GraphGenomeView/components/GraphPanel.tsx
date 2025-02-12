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
  const { graph, graphSettings } = model
  const { chunkSize, linkSteps, linkThickness, sequenceThickness } =
    graphSettings
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
        chunkSize={chunkSize}
        linkSteps={linkSteps}
        sequenceThickness={sequenceThickness}
        linkThickness={linkThickness}
        onFeatureClick={data => {
          setFeatureData(data)
        }}
      />
    </>
  ) : null
})

export default GraphPanel
