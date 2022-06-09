import {types} from "mobx-state-tree";

const { model, enumeration, optional } = types;

export function modeTab(enums: string[], defaultEnum = ""){
  return model({
    mode: optional(enumeration(enums), defaultEnum ? defaultEnum : enums[0])
  }).actions(self => ({
    setMode(mode: string) {
      self.mode = mode
    }
  }));
}
