import React, { useEffect, useState } from 'react'

import { FileSelector } from '@jbrowse/core/ui'
import { FileLocation, getSession } from '@jbrowse/core/util'
import { openLocation } from '@jbrowse/core/util/io'
import { observer } from 'mobx-react'

import AreYouSureDialog from './AreYouSureDialog'
import HeaderMenu from './HeaderMenu'
import LocStringInput from './LocStringInput'

import type { GraphGenomeViewModel } from '../model'

const Header = observer(function ({ model }: { model: GraphGenomeViewModel }) {
  const { mode } = model
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
          getSession(globalThis).queueDialog(handleClose => [
            AreYouSureDialog,
            {
              handleClose: (arg: boolean) => {
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
      <HeaderMenu model={model} />

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
