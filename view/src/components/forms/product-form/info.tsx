import {Box, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import infos from "./info.json";
import {ArrowRight} from "@mui/icons-material";
import {memo} from "react";

export const Info = memo( ({type = "pricing"}: {type?:"pricing"| "photo"}) => {

  return (
    <Box sx={{flex: 1, px: 2}}>
      <List disablePadding>
        {
          infos[type].map(item=>(
            <ListItem key={item}>
              <ListItemIcon sx={{minWidth:10}}>
                <ArrowRight/>
              </ListItemIcon>
              <ListItemText
                secondaryTypographyProps={{
                  className:"font-poppins"
                }}
                secondary={item}/>
            </ListItem>
          ))
        }
      </List>
    </Box>
  );
});
