import React from 'react'

import { Dialog } from '@jbrowse/core/ui'

// @ts-expect-error this will need to eventually get updated...mismatched in core
import { Attributes } from '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail'
import { DialogContent } from '@mui/material'
import { getEnv } from '@jbrowse/core/util'
import { GraphGenomeViewModel } from '../model'

export default function FeatureDialog({
  data,
  model,
  onClose,
}: {
  data: Record<string, unknown>
  model: GraphGenomeViewModel
  onClose: () => void
}) {
  const { pluginManager } = getEnv(model)
  const { BaseAttributes } = pluginManager.jbrequire(
    '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail',
  )
  const omit = ['sequence', 'source', 'target']
  return (
    <Dialog open maxWidth="xl" title="Feature details" onClose={onClose}>
      <DialogContent style={{ minWidth: 800 }}>
        {BaseAttributes ? (
          <BaseAttributes feature={data} omit={omit} />
        ) : (
          <Attributes attributes={data} omit={omit} />
        )}
      </DialogContent>
    </Dialog>
  )
}
