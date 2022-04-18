import * as React from 'react';
import { useResellerOrder } from './hoc'
import {useEffect, useMemo} from "react";
import { TabContext, TabPanel } from '@mui/lab'
import {Tab, Tabs, AppBar} from "@mui/material";
import { Detail } from './detail'
import { Form } from './form'
import { Products } from './Products'
import {AnimatePresence} from "framer-motion";
import {observer} from "mobx-react";

type TabItem = {
  value: string
  label: string
}

const sx = {
  "&.Mui-selected":{
    bgcolor: "white"
  },
  color:'white',
  textTransform: "none",
  transition: "all ease-in-out .5s"
}
const tabsItem : TabItem[] = [
  {
    value: "detail",
    label: "Detail"
  },
  {
    value: "products",
    label: "Product"
  },
  {
    value: "form",
    label: "Pengiriman"
  },
];

type Props = {
  disableForm?: boolean
}

export const ResellerOrderDetailModal = observer( ({ disableForm = true }: Props) => {
  const store = useResellerOrder();
  const [{data, entity, mode}, {fetch, changeMode}] = useResellerOrder();
  const tabs = useMemo(()=>{
    if (disableForm || (entity && entity.deliveryReciptNumber)){
      return tabsItem.filter(item=>item.value !== "form")
    }
    return tabsItem;
  }, [disableForm])
  return (
    <>
      <TabContext value={mode}>
        <AppBar position='sticky'>
          <Tabs variant='fullWidth' value={mode} onChange={(e: any, v: any)=>changeMode(v)}>
            {
              tabs.map(item=>(
                <Tab sx={sx} key={item.value} {...item} />
              ))
            }
          </Tabs>
        </AppBar>
        <TabPanel value='detail'>
          <Detail/>
        </TabPanel>
        <TabPanel value='products'>
          <Products/>
        </TabPanel>
        <TabPanel value='form'>
          <Form/>
        </TabPanel>
      </TabContext>
    </>
  );
});

export { Hoc as ResellerOrderProvider } from './hoc'
