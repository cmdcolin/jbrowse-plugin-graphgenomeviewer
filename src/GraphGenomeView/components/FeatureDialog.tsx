import React from 'react'

import { Dialog } from '@jbrowse/core/ui'
// @ts-expect-error
import { Attributes } from '@jbrowse/core/BaseFeatureWidget/BaseFeatureDetail'

export default function FeatureDialog({
  data,
  onClose,
}: {
  data: Record<string, unknown>
  onClose: () => void
}) {
  return (
    <Dialog open maxWidth="xl" title="Feature details" onClose={onClose}>
      <div style={{ minWidth: 800 }}>
        <Attributes attributes={data} omit={['sequence']} />
      </div>
    </Dialog>
  )
}
