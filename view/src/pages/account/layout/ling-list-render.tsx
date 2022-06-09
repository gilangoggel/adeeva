import { LinkItem } from './types'
import { List,ListItem, Divider,ListItemText, ListItemSecondaryAction, Collapse } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'
import {useToggle} from "@hooks/use-toggle";
import { Inertia } from '@inertiajs/inertia'


const sx = {
  borderRadius: 2,
  '&[data-parent="true"]':{
    py:1
  },
}
const iconSx = {
  '&[data-open="true"]':{
    transform: "rotate(-180deg)",
  },
  transition : 'all ease-in-out .2s',
  color:'secondary.main'
}

export const LingListRender = ({ title, links }: LinkItem) => {
  const [ open, toggle ] = useToggle()
  const handler = (page:string) => {
    return ()=>Inertia.get(page, {}, {
      preserveState: true
    })
  }
  return (
    <>
      <ListItem data-parent={true} button dense onClick={toggle} data-open={open} disableTouchRipple sx={sx}>
        <ListItemText primaryTypographyProps={{
          color:'secondary',
          className: 'font-poppins'
        }} primary={title}/>
        <ListItemSecondaryAction>
          <ArrowDropDown sx={iconSx} data-open={open} className='icon'/>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse sx={{px:1}} timeout='auto' in={open}>
        <List>
          {
            links.map(item=>(
              <ListItem onClick={handler(item.href)} dense sx={sx} button key={item.href}>
                <ListItemText secondary={item.label}/>
              </ListItem>
            ))
          }
        </List>
      </Collapse>
      <Divider sx={{my:1}}/>
    </>
  );
};
