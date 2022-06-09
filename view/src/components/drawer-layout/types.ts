import {ComponentType} from "react";

type TabConfig = string | {
  name: string
  label: string
}

export type TabsContent = [string | TabConfig, ComponentType<any>];
export type TabContentCallback = () => TabsContent[]


export type Props = {
  open: boolean
  contents: TabsContent[] | TabContentCallback
  tabvalue: string
  handleClose() : void
  onSwap(v: string) : void
  render: boolean
  componentProps : Record<string, any>
}
