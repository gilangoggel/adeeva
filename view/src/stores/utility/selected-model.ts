import {IModelType, SnapshotIn, types} from "mobx-state-tree";

const { model, maybeNull } = types;

export function selectedModel<T extends IModelType<any, any>>(children: T){
  return  model({
    selected: maybeNull(children)
  }).actions(self=>({
    setSelected(model: SnapshotIn<T> | null ){
      self.selected = model as any;
    }
  }))
}
