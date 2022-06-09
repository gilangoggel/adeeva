import { modeWithModel } from './mode-with-model'
import {IModelType, SnapshotIn} from "mobx-state-tree";

export function listDrawerStore<T extends IModelType<any, any>>(model: T, tabs:string[]) {
  const base = modeWithModel<T>(model, tabs);
  return base
    .views(self=>({
      close(){
        self.setSelected(null);
        self.setMode("detail")
      },
      selectModel(entity : SnapshotIn<T>| null, mode: any){
        self.setSelected(entity);
        self.setMode(mode)
      },
    }))
}
