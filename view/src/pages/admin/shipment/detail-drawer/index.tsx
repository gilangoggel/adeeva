import { DrawerLayout } from '@components/drawer-layout'
import {observer} from "mobx-react";
import { store } from '../store'
import { Info } from '../info'
import { Tracking } from './contents/tracking'

const contents = [
  [{label: "Transaksi", name: "info"}, Info],
  [{label: "Tracking", name: "tracking"}, Tracking],
]

export const DetailDrawer = observer( () => {
  return (
    <DrawerLayout
      open={Boolean(store.selected)}
      contents={contents as any}
      tabvalue={store.mode}
      handleClose={store.close}
      onSwap={store.setMode}
      render={Boolean(store.selected)}
      componentProps={{
        store: store.selected
      }}/>
  );
});
