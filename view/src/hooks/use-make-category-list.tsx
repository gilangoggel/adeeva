import {ComponentType, useCallback, useMemo} from "react";

const categories = [
  {
    label: "Makanan & snack",
    value: "fnb"
  },
  {
    label: "Pakaian",
    value: "clothes"
  },
  {
    label: "Produk kecantikan",
    value: "skincare"
  },
];

export type ItemProps<T extends Record<string, any> = Record<string, any>> = {
  label: string
  value: string
  selected: boolean
} & T

export type CategoryItemComponent<T> = ComponentType<ItemProps<T>>;

type Config<T> = {
  renderer: CategoryItemComponent<T>
  selected?: string
  mergeProps?: Record<string, any>
}

export function useMakeCategoryList<T extends Record<string, any> = Record<string, any>>({ renderer : Render, selected, mergeProps = {} }: Config<T>){
  const RenderCallback = useCallback( (item: typeof categories[number]) => {
    return <Render { ...item } {...mergeProps as T} key={item.value} selected={selected === item.value}/>
  }, [Render, selected, mergeProps])
  return useMemo(() => {
    return categories.map(RenderCallback)
  }, [RenderCallback]);
}
