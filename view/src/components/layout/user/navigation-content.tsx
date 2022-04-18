import * as React from 'react';
import {ComponentType} from "react";
import {Box, Divider, List, ListItem, ListItemText} from "@mui/material";


type ItemContent = {
  link: string
  icon?: ComponentType<any>,
  label: string
};

type Props = {
  title: string
  items: ItemContent[]
}

const sx = {
  mt: 2, textAlign: "left" , px : 2,
  "& > .title":{
    color: "primary.main",
    fontWeight:"light",
    fontSize:"1.2rem"
  }
}

export const NavigationContentItem= ({ label, link, icon, onClick }: ItemContent & {onClick(): void}) => {
  return (
    <ListItem button key={link} onClick={onClick}>
      <ListItemText
        secondary={label}
      />
    </ListItem>
  )
}

export const NavigationContent = ({title, items}: Props) => {
  return (
    <Box className='font-poppins' sx={sx}>
      <p className='title'>
        {title}
      </p>
      <Divider sx={{my: 1, bgcolor:"primary.main"}}/>
      <List>
        {
          items.map(item=>(
            <NavigationContentItem key={item.link} {...item} onClick={console.log}/>
          ))
        }
      </List>
    </Box>
  );
};
