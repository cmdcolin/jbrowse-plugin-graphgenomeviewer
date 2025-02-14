import React, { useEffect, useState } from 'react'

import { FileSelector } from '@jbrowse/core/ui'
import CascadingMenuButton from '@jbrowse/core/ui/CascadingMenuButton'
import { FileLocation, getSession } from '@jbrowse/core/util'
import { openLocation } from '@jbrowse/core/util/io'
import { observer } from 'mobx-react'
import MenuIcon from '@mui/icons-material/Menu'

import { Settings } from '@mui/icons-material'

import SettingsDialog from './SettingsDialog'
import AreYouSureDialog from './AreYouSureDialog'

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
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        model.setError(undefined)
        const data = await openLocation(loc).readFile('utf8')
        if (data.length > 5_000_000) {
          getSession(self).queueDialog(handleClose => [
            AreYouSureDialog,
            {
              handleClose: arg => {
                if (arg) {
                  if ('uri' in loc) {
                    model.setGfaUrl(loc.uri)
                  } else {
                    model.setResultData(data)
                  }
                }
                handleClose()
              },
              data,
            },
          ])
        } else {
          model.setResultData(data)
        }
      } catch (e) {
        console.error(e)
        model.setError(e)
      }
    })()
  })
  return (
    <div style={{ display: 'flex', gap: 40 }}>
      <CascadingMenuButton
        menuItems={[
          {
            label: 'Draw labels',
            type: 'checkbox',
            checked: drawLabels,
            onClick: () => graphSettings.setDrawLabels(!drawLabels),
          },
          {
            label: 'Draw paths',
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

      {mode === 'files' ? (
        <div style={{ maxWidth: 500 }}>
          <FileSelector
            name="Open a GFA file"
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
    </div>
  )
})

export default Header
