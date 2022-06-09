import { Props } from './types'
import { Drawer } from '@mui/material'
import { Header } from './header'
import { Context } from './context'
import { Content } from './content'

export const DrawerLayout = (props: Props) => {
  const { open, handleClose }  = props;
  return (
    <Context.Provider value={props}>
      <Drawer
        PaperProps={{
          sx:{
            minWidth: "30vw"
          }
        }}
        onClose={handleClose}
        anchor='right'
        open={open}
      >
        <Header/>
        <Content/>
      </Drawer>
    </Context.Provider>
  );
};
