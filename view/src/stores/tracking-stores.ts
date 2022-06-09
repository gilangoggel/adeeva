import {applySnapshot, Instance, SnapshotIn, types} from 'mobx-state-tree'
import { getExpeditionAttributes } from '@utils/expeditions'
import {transactionModel} from "@models/transaction-extended";

const trackingModel = types.model({
  date: types.Date,
  text: types.string,
  id: types.identifier
})
type ITrackingItem = Instance<typeof trackingModel['Type']>

type Input = SnapshotIn<ITrackingItem> | ITrackingItem;

const trackingPageModel = types.model({
  tracks : types.optional( types.array(trackingModel), []),
  expedition: types.optional(types.enumeration(['jne', 'tiki', 'pos']), 'jne'),
}).actions(self=>({
  add(data: Input){
    self.tracks.push(data)
  },
}))
  .views(getExpeditionAttributes())
  .views((self)=>({
    push(data: Input){
      return new Promise(resolve => {
        setTimeout(()=>{
          resolve(
            self.add(data)
          )
        }, 3000)
      })
    }
  }));

export const store = trackingPageModel.create({})

export function initTrackingStore(tracks: SnapshotIn<ITrackingItem[]>){
  applySnapshot(store, {
    tracks
  })
}
