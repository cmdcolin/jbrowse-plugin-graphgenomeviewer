import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import { AbstractSessionModel, isAbstractMenuManager } from '@jbrowse/core/util'
import HubIcon from '@mui/icons-material/Hub'

import { version } from '../package.json'
import GraphGenomeViewF from './GraphGenomeView'

export default class GraphGenomeViewer extends Plugin {
  name = 'GraphGenomeViewer'
  version = version

  install(pluginManager: PluginManager) {
    GraphGenomeViewF(pluginManager)
  }

  configure(pluginManager: PluginManager) {
    if (isAbstractMenuManager(pluginManager.rootModel)) {
      pluginManager.rootModel.appendToSubMenu(['Add'], {
        label: 'Graph genome viewer',
        icon: HubIcon,
        onClick: (session: AbstractSessionModel) => {
          session.addView('GraphGenomeView', {})
        },
      })
    }
  }
}
