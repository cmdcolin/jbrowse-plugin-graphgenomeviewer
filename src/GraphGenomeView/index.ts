import { lazy } from 'react'
import PluginManager from '@jbrowse/core/PluginManager'
import { ViewType } from '@jbrowse/core/pluggableElementTypes'

import stateModelF from './model'

const ReactComponent = lazy(() => import('./components/GraphGenomeView'))

export default function ProteinViewF(pluginManager: PluginManager) {
  pluginManager.addViewType(() => {
    return new ViewType({
      name: 'GraphGenomeView',
      displayName: 'Graph genome view',
      stateModel: stateModelF(),
      ReactComponent,
    })
  })
}
