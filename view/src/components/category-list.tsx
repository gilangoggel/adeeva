import { List, ListItem, ListItemText, ListProps } from '@mui/material'
import {Navigation} from "@utils/navigation";
import { useMakeCategoryList, ItemProps } from '@hooks/use-make-category-list'
import {memo, useCallback} from "react";


type Props = {
  callback?:()=>void
  selected?: string
  handler?(v:string): void
  listProps?: ListProps
}

type CategoryItemProps = ItemProps & {
  handleClick(v: string): ()=>void
}

const Item = memo(({label, value, selected, handleClick}: CategoryItemProps)=>{
  return (
    <ListItem selected={selected} onClick={handleClick(value)} button>
      <ListItemText
        primaryTypographyProps={{
          className: "font-raleway"
      }}
        primary={label}
      />
    </ListItem>
  )
}, (p, n)=>p.selected === n.selected)

export const CategoryList = ({callback, selected, handler, listProps = {} }: Props) => {
  const handleClick = useCallback( (category: string) => {
    if (handler){
      return ()=>handler(category)
    }
    return Navigation.toCallback('toSearch', callback, {
      category
    })
  }, [])
  const nodes = useMakeCategoryList<{
    handleClick(v: string) : ()=>void
  }>({
    renderer: Item, selected, mergeProps : {
      handleClick
    }
  })
  return (
    <List {...listProps}>
      {
        nodes
      }
    </List>
  );
};
