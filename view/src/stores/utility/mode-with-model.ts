import {IModelType, types} from "mobx-state-tree";
import { modeTab } from './mode-tab'
import { selectedModel } from './selected-model'

export function modeWithModel<T extends IModelType<any, any>>(children: T, modes: string[]){
  return types.compose(
    modeTab(modes),
    selectedModel<T>( children )
  )
}
