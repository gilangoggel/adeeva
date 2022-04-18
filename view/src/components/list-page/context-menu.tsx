import {ListPageProps, ContextAction, ActionList} from './type'
import {useMemo} from "react";
import { useListPage } from './Hoc'
import {Menu, MenuItem, ListItemIcon, ListItemText} from '@mui/material'
import { Label } from '@mui/icons-material'

const defaultActions: ContextAction[] = [
  {
    label: "Detail", action : "show"
  },
  {
    label: "Update", action : "update"
  },
  {
    label: "Hapus", action : "delete"
  },
]

export const ContextMenu = ({ onAction, customAction= [], disabledAction = [] } : ListPageProps<any>) => {

  const [{entity, contextMenu}, {closeContextMenu}]  = useListPage();

  const actionList : ActionList = useMemo(()=>{
    const merged = [...defaultActions, ...customAction];
    return merged.filter(item => {
      return disabledAction?.includes(item.action as any) === false
    }).map(item=>{
      return {
        ...item,
        disabled: item.disabled && entity ? item.disabled(entity as any): false,
        onClick(){
          if (entity && onAction){
            onAction(entity, item.action)
          }
          closeContextMenu();
        }
      }
    })
  }, [onAction, customAction, disabledAction, entity])


  return (
    <Menu
      PaperProps={{
        elevation: 1,
        sx:{
          minWidth: 300,
          bgcolor:'primary.main'
        }
      }}
      open={Boolean(contextMenu && entity)}
      onClose={closeContextMenu}
      anchorReference='anchorPosition'
      anchorPosition={
      contextMenu ? {
        top: contextMenu.y,
        left: contextMenu.x
      } : undefined
      }
    >
      {
        actionList.map(item=>(
          <MenuItem
            onClick={item.onClick}
            key={item.action}
            disabled={item.disabled}
          >
            <ListItemIcon>
              <Label sx={{mr: 1, color:'white'}}/>
            </ListItemIcon>
            <ListItemText secondary={item.label} secondaryTypographyProps={{
              className : "font-poppins",
              sx:{
                color:'white'
              }
            }}/>
          </MenuItem>
        ))
      }
    </Menu>
  );
};
