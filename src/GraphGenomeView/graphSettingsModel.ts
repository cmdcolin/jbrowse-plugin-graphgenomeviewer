import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'

const STORAGE_PREFIX = 'graphGenomeView.'

function getStoredSetting<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(STORAGE_PREFIX + key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (e) {
    console.warn(`Failed to read setting ${key} from localStorage:`, e)
    return defaultValue
  }
}
function saveSetting(key: string, value: unknown) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value))
  } catch (e) {
    console.warn(`Failed to save setting ${key} to localStorage:`, e)
  }
}

const defaultSettings = {
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
  colorScheme: 'Rainbow',
}

export default function graphSettingsModelFactory() {
  return types
    .model({
      colorScheme: types.optional(
        types.string,
        getStoredSetting('colorScheme', defaultSettings.colorScheme),
      ),
      chunkSize: types.optional(
        types.number,
        getStoredSetting('chunkSize', defaultSettings.chunkSize),
      ),
      strengthCenter: types.optional(
        types.number,
        getStoredSetting('strengthCenter', defaultSettings.strengthCenter),
      ),
      linkThickness: types.optional(
        types.number,
        getStoredSetting('linkThickness', defaultSettings.linkThickness),
      ),
      sequenceThickness: types.optional(
        types.number,
        getStoredSetting(
          'sequenceThickness',
          defaultSettings.sequenceThickness,
        ),
      ),
      linkSteps: types.optional(
        types.number,
        getStoredSetting('linkSteps', defaultSettings.linkSteps),
      ),
      theta: types.optional(
        types.number,
        getStoredSetting('theta', defaultSettings.theta),
      ),
      forceSteps: types.optional(
        types.number,
        getStoredSetting('forceSteps', defaultSettings.forceSteps),
      ),
      drawPaths: types.optional(
        types.boolean,
        getStoredSetting('drawPaths', defaultSettings.drawPaths),
      ),
      drawNodeHandles: types.optional(
        types.boolean,
        getStoredSetting('drawNodeHandles', defaultSettings.drawNodeHandles),
      ),
      drawLabels: types.optional(
        types.boolean,
        getStoredSetting('drawLabels', defaultSettings.drawLabels),
      ),
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
      setColorScheme(s: string) {
        self.colorScheme = s
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

      afterCreate() {
        addDisposer(
          self,
          autorun(() => {
            for (const [key, value] of [
              ['chunkSize', self.chunkSize],
              ['strengthCenter', self.strengthCenter],
              ['linkThickness', self.linkThickness],
              ['sequenceThickness', self.sequenceThickness],
              ['linkSteps', self.linkSteps],
              ['theta', self.theta],
              ['forceSteps', self.forceSteps],
              ['drawPaths', self.drawPaths],
              ['drawNodeHandles', self.drawNodeHandles],
              ['drawLabels', self.drawLabels],
            ] as const) {
              saveSetting(key, value)
            }
          }),
        )
      },
    }))
}

// this file was created with the help of Claude AI and avante.nvim
