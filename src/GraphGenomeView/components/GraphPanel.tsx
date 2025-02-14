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
  const {
    chunkSize,
    colorScheme,
    linkSteps,
    linkThickness,
    sequenceThickness,
    drawPaths,
    drawLabels,
    drawNodeHandles,
  } = graphSettings
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
      <div
        ref={ref => {
          model.setRef(ref)
        }}
      >
        <Graph
          graph={graph}
          chunkSize={chunkSize}
          linkSteps={linkSteps}
          sequenceThickness={sequenceThickness}
          linkThickness={linkThickness}
          colorScheme={colorScheme}
          drawLabels={drawLabels}
          drawNodeHandles={drawNodeHandles}
          drawPaths={drawPaths}
          onFeatureClick={data => {
            setFeatureData(data)
          }}
        />
      </div>
    </>
  ) : null
})

export default GraphPanel
