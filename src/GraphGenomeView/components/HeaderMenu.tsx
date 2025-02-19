import React from 'react'

import CascadingMenuButton from '@jbrowse/core/ui/CascadingMenuButton'
import { getSession } from '@jbrowse/core/util'
import MenuIcon from '@mui/icons-material/Menu'
import { observer } from 'mobx-react'

import { Settings } from '@mui/icons-material'

import SettingsDialog from './SettingsDialog'

import type { GraphGenomeViewModel } from '../model'

const HeaderMenu = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { graphSettings } = model
  const { colorScheme, drawNodeHandles, drawPaths, drawLabels } = graphSettings
  return (
    <CascadingMenuButton
      menuItems={[
        {
          label: 'Draw labels',
          type: 'checkbox',
          checked: drawLabels,
          onClick: () => {
            graphSettings.setDrawLabels(!drawLabels)
          },
        },
        {
          label: 'Draw paths',
          type: 'checkbox',
          checked: drawPaths,
          onClick: () => {
            graphSettings.setDrawPaths(!drawPaths)
          },
        },
        {
          label: 'Draw node handles',
          type: 'checkbox',
          checked: drawNodeHandles,
          onClick: () => {
            graphSettings.setDrawNodeHandles(!drawNodeHandles)
          },
        },
        {
          label: 'Force redraw',
          onClick: () => {
            model.redraw()
          },
        },
        {
          label: 'Color scheme',
          subMenu: [
            'JustGrey',
            'Turbo',
            'Rainbow',
            'Spectral',
            'Viridis',
            'RdYlBu',
          ].map(r => ({
            label: r,
            type: 'radio',
            checked: colorScheme === r,
            onClick: () => {
              graphSettings.setColorScheme(r)
            },
          })),
        },
        {
          label: 'Export SVG',
          onClick: () => {
            model.exportSVG()
          },
        },
        {
          label: 'Settings',
          icon: Settings,
          onClick: () => {
            getSession(model).queueDialog(handleClose => [
              SettingsDialog,
              {
                handleClose,
                model,
              },
            ])
          },
        },
      ]}
    >
      <MenuIcon />
    </CascadingMenuButton>
  )
})

export default HeaderMenu
