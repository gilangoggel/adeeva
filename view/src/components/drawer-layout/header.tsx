import { Tabs, Tab } from '@mui/material'
import { useTabControl } from './context'

const sx= {
  position: "sticky",
  top:0,
  bgcolor:"background.paper",
  zIndex: (t: any)=>t.zIndex.appBar + 1
}

export const Header = () => {
  const [ tabs, value, onChange ] = useTabControl()
  return (
    <Tabs variant='fullWidth' sx={sx} value={value} onChange={onChange}>
      <Tab value='' label='' sx={{width: '0px!important',position: 'fixed'}}/>
      {
        tabs.map(item=>(
          <Tab {...item} key={item.value} />
        ))
      }
    </Tabs>
  );
};
