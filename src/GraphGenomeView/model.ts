import { BaseViewModel } from '@jbrowse/core/pluggableElementTypes'
import { types } from 'mobx-state-tree'

export default function stateModelFactory() {
  return types.compose(
    'GraphGenomeView',
    BaseViewModel,
    types.model({
      type: 'GraphGenomeView',
    }),
  )
}
