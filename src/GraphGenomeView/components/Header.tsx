import React, { useEffect, useState } from 'react'

import { FileSelector } from '@jbrowse/core/ui'
import CascadingMenuButton from '@jbrowse/core/ui/CascadingMenuButton'
import { FileLocation, getSession } from '@jbrowse/core/util'
import { openLocation } from '@jbrowse/core/util/io'
import { IconButton } from '@mui/material'
import { observer } from 'mobx-react'
import MenuIcon from '@mui/icons-material/Menu'

import { Settings } from '@mui/icons-material'

import SettingsDialog from './SettingsDialog'

import type { GraphGenomeViewModel } from '../model'
import LocStringInput from './LocStringInput'

const Header = observer(function ({ model }: { model: GraphGenomeViewModel }) {
  const { mode, graphSettings } = model
  const { colorScheme, drawPaths, drawLabels } = graphSettings
  const [loc, setLoc] = useState<FileLocation>()
  useEffect(() => {
    if (!loc) {
      return
    }
    if ('uri' in loc && loc.uri) {
      model.setGfaUrl(loc.uri)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        try {
          model.setError(undefined)
          const data = await openLocation(loc).readFile('utf8')
          model.setResultData(data)
        } catch (e) {
          console.error(e)
          model.setError(e)
        }
      })()
    }
  })
  return (
    <div style={{ display: 'flex' }}>
      <CascadingMenuButton
        menuItems={[
          {
            label: 'Draw labels',
            type: 'checkbox',
            checked: drawLabels,
            onClick: () => graphSettings.setDrawLabels(!drawLabels),
          },
          {
            label: 'Draw labels',
            type: 'checkbox',
            checked: drawPaths,
            onClick: () => graphSettings.setDrawPaths(!drawPaths),
          },
          {
            label: 'Draw node handles',
            type: 'checkbox',
            checked: drawPaths,
            onClick: () => graphSettings.setDrawPaths(!drawPaths),
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
              onClick: () => graphSettings.setColorScheme(r),
            })),
          },
          {
            label: 'Export SVG',
            onClick: () => {
              model.exportSVG()
            },
          },
        ]}
      >
        <MenuIcon />
      </CascadingMenuButton>

      {mode === 'files' ? (
        <div style={{ maxWidth: 500 }}>
          <FileSelector
            name="GFA path"
            inline
            location={loc}
            setLocation={loc => {
              setLoc(loc)
            }}
          />
        </div>
      ) : (
        <LocStringInput model={model} />
      )}
      <div style={{ flexGrow: 1 }} />
      <div>
        <IconButton
          onClick={() => {
            getSession(model).queueDialog(handleClose => [
              SettingsDialog,
              {
                handleClose,
                model,
              },
            ])
          }}
        >
          <Settings />
        </IconButton>
      </div>
    </div>
  )
})

export default Header
