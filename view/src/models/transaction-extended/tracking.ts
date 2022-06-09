import {SnapshotIn, types} from 'mobx-state-tree'

export const trackingModel = types.model({
  id: types.identifierNumber,
  text: types.string,
  created_at: types.string
})
export type ITracking = SnapshotIn<typeof trackingModel['Type']>
