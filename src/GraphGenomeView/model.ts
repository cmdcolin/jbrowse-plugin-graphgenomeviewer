import { BaseViewModel } from '@jbrowse/core/pluggableElementTypes'
import { parseGFA } from 'graphgenomeviewer'
import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'
import { saveAs } from 'file-saver'

import { myfetchtext } from './util'

import type { Instance } from 'mobx-state-tree'
import graphSettingsModelFactory from './graphSettingsModel'

export default function stateModelFactory() {
  return types.compose(
    'GraphGenomeView',
    BaseViewModel,
    types
      .model({
        /**
         * #property
         */
        type: 'GraphGenomeView',

        /**
         * #property
         */
        locstring: types.maybe(types.string),

        /**
         * #property
         */
        gfaUrl: types.maybe(types.string),
        /**
         * #property
         */
        mode: 'files',
        /**
         * #property
         */
        serverRoot: '',
        /**
         * #property
         */
        graphSettings: types.optional(graphSettingsModelFactory(), {}),
        /**
         * #property
         */
        height: 100,
      })
      .volatile(() => ({
        /**
         * #volatile
         */
        resultData: undefined as string | undefined,
        /**
         * #volatile
         */
        error: undefined as unknown,

        /**
         * #volatile
         */
        ref: null as HTMLDivElement | null,
      }))
      .actions(self => ({
        /**
         * #action
         */
        setHeight(n: number) {
          self.height = n
          return n
        },
        /**
         * #action
         */
        exportSVG() {
          if (self.ref) {
            saveAs(
              new Blob([self.ref.innerHTML || ''], {
                type: 'image/svg+xml',
              }),
              'out.svg',
            )
          }
        },
      }))
      .views(self => ({
        /**
         * #getter
         */
        get graph() {
          return self.resultData ? parseGFA(self.resultData) : undefined
        },
        /**
         * #getter
         */
        menuItems() {
          return [
            {
              label: 'Export SVG',
              onClick: () => {
                self.exportSVG()
              },
            },
          ]
        },
      }))
      .actions(self => ({
        /**
         * #action
         */
        setRef(ref: HTMLDivElement | null) {
          self.ref = ref
        },
        /**
         * #action
         */
        setServerRoot(arg: string) {
          self.serverRoot = arg
        },
        /**
         * #action
         */
        setMode(arg: string) {
          self.mode = arg
        },
        /**
         * #action
         */
        setError(arg: unknown) {
          self.error = arg
        },
        /**
         * #action
         */
        setResultData(arg: string) {
          self.resultData = arg
        },
        /**
         * #action
         */
        setGenomicRegionLocString(arg: string) {
          self.locstring = arg
        },
        /**
         * #action
         */
        setGfaUrl(url: string) {
          self.gfaUrl = url
        },
      }))
      .actions(self => ({
        afterAttach() {
          addDisposer(
            self,
            autorun(async () => {
              if (!self.gfaUrl) {
                return
              }
              try {
                self.setError(undefined)
                const url = self.gfaUrl
                const data = await myfetchtext(url)
                self.setResultData(data)
              } catch (e) {
                self.setError(e)
                console.error(e)
              }
            }),
          )
        },
      })),
  )
}

export type GraphGenomeViewStateModel = ReturnType<typeof stateModelFactory>
export type GraphGenomeViewModel = Instance<GraphGenomeViewStateModel>
