import React, { useEffect, useState } from 'react'

import { FileSelector } from '@jbrowse/core/ui'
import { FileLocation, getSession } from '@jbrowse/core/util'
import { openLocation } from '@jbrowse/core/util/io'
import { IconButton } from '@mui/material'
import { observer } from 'mobx-react'

import { Settings } from '@mui/icons-material'

import SettingsDialog from './SettingsDialog'

import type { GraphGenomeViewModel } from '../model'
import LocStringInput from './LocStringInput'

const Header = observer(function ({ model }: { model: GraphGenomeViewModel }) {
  const { mode } = model
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
