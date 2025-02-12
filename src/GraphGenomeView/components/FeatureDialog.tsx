import React from 'react'

import { Dialog } from '@jbrowse/core/ui'

export default function FeatureDialog({
  data,
  onClose,
}: {
  data: Record<string, unknown>
  onClose: () => void
}) {
  return (
    <Dialog open title="Feature details" onClose={onClose}>
      <div>Attributes</div>
      {Object.entries(data)
        .filter(
          entry => !['source', 'target', 'linkNum', 'tags'].includes(entry[0]),
        )
        .map(([key, value]) => (
          <div
            key={`${key}_${value}`}
            style={{ display: 'flex', maxHeight: 150, margin: 3 }}
          >
            <div style={{ backgroundColor: '#dda', minWidth: 100 }}>{key}</div>
            <div style={{ wordBreak: 'break-word', overflow: 'auto' }}>
              {String(value)}
            </div>
          </div>
        ))}
      <hr />
      {data.tags && Object.keys(data.tags).length > 0 ? (
        <>
          <div>Tags</div>
          {Object.entries(data.tags).map(([key, value]) => (
            <div
              key={`${key}_${value}`}
              style={{ display: 'flex', maxHeight: 150, margin: 3 }}
            >
              <div style={{ backgroundColor: '#dda', minWidth: 100 }}>
                {key}
              </div>
              <div style={{ wordBreak: 'break-word', overflow: 'auto' }}>
                {String(value)}
              </div>
            </div>
          ))}
        </>
      ) : null}
    </Dialog>
  )
}
