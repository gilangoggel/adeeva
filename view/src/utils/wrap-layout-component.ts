import * as React from "react";
import {Layout} from "@components/layout";

export function wrapLayoutComponent(Component: React.ComponentType<any>){
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  // eslint-disable-next-line react/no-children-prop
  Component.layout = component => React.createElement(Layout,{
    children: component
  });
  return Component;
}
