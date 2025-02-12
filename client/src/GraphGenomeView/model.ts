import { BaseViewModel } from '@jbrowse/core/pluggableElementTypes'
import { parseGFA } from 'graphgenomeviewer'
import { autorun } from 'mobx'
import { addDisposer, types } from 'mobx-state-tree'

import { myfetchtext } from './util'

import type { FileLocation } from '@jbrowse/core/util'
import type { Instance } from 'mobx-state-tree'

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
        genomicRegionLocString: types.maybe(types.string),

        /**
         * #property
         */
        gfaUrl: types.maybe(types.string),
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
      }))
      .views(self => ({
        /**
         * #getter
         */
        get graph() {
          return self.resultData ? parseGFA(self.resultData) : undefined
        },
      }))
      .actions(self => ({
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
        genomicRegionLocString(arg: string) {
          self.genomicRegionLocString = arg
        },
        /**
         * #action
         */
        setGfaFileLocation(file: FileLocation) {
          if ('uri' in file && file.uri) {
            self.gfaUrl = file.uri
          } else {
            console.log('wtf')
          }
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
