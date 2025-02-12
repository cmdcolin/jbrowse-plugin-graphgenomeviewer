import { types } from 'mobx-state-tree'

import type { Instance } from 'mobx-state-tree'

export default function graphSettingsModelFactory() {
  return types
    .model({
      chunkSize: 1000,
      strengthCenter: -50,
      linkThickness: 2,
      sequenceThickness: 10,
      linkSteps: 3,
      theta: 0.9,
      forceSteps: 200,
      drawPaths: false,
      drawNodeHandles: false,
      drawLabels: false,
    })
    .actions(self => ({
      setChunkSize(size: number) {
        self.chunkSize = size
      },
      setStrengthCenter(strength: number) {
        self.strengthCenter = strength
      },
      setLinkThickness(thickness: number) {
        self.linkThickness = thickness
      },
      setSequenceThickness(thickness: number) {
        self.sequenceThickness = thickness
      },
      setLinkSteps(steps: number) {
        self.linkSteps = steps
      },
      setTheta(theta: number) {
        self.theta = theta
      },
      setForceSteps(steps: number) {
        self.forceSteps = steps
      },
      setDrawPaths(draw: boolean) {
        self.drawPaths = draw
      },
      setDrawNodeHandles(draw: boolean) {
        self.drawNodeHandles = draw
      },
      setDrawLabels(draw: boolean) {
        self.drawLabels = draw
      },
    }))
}

export type GraphGenomeViewStateModel = ReturnType<typeof stateModelFactory>
export type GraphGenomeViewModel = Instance<GraphGenomeViewStateModel>
