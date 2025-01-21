import { BaseViewModel } from '@jbrowse/core/pluggableElementTypes'
import { types } from 'mobx-state-tree'

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
        location: types.maybe(types.string),
      })
      .actions(self => ({
        setLocation(arg: string) {
          self.location = arg
        },
      })),
  )
}

export type GraphGenomeViewStateModel = ReturnType<typeof stateModelFactory>
export type GraphGenomeViewModel = Instance<GraphGenomeViewStateModel>
