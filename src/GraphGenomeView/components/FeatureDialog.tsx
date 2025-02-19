import React from 'react'

// @ts-expect-error
import { Attributes } from '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail'
import { Dialog } from '@jbrowse/core/ui'
import { getEnv } from '@jbrowse/core/util'
import { DialogContent } from '@mui/material'

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
