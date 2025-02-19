import React from 'react'

import { TextField, Typography } from '@mui/material'
import { observer } from 'mobx-react'

import type { GraphGenomeViewModel } from '../model'

const ServerSettings = observer(function ({
  model,
}: {
  model: GraphGenomeViewModel
}) {
  const { serverRoot } = model
  return (
    <div>
      <div>Server settings:</div>
      <TextField
        label="Path to the simpleGfaServer e.g. http://localhost:9000/"
        style={{ minWidth: 500 }}
        value={serverRoot}
        onChange={event => {
          model.setServerRoot(event.target.value)
        }}
      />
      <div>
        <Typography variant="h6">What is the GFA server?</Typography>
        <div>
          It is a server that runs vg commands on pre-configured .vg graph
          files. It requires a server side setup to use, please see{' '}
          <a href="https://github.com/cmdcolin/jbrowse-plugin-graphgenomeviewer/">
            here
          </a>{' '}
          for details
        </div>
        <div>
          The alternative way to use this plugin is to run these vg commands
          yourself, and open the raw GFA files
        </div>
      </div>
    </div>
  )
})

export default ServerSettings
