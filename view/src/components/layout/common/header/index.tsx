import { Container, Box } from '@mui/material'
import { Logo } from './logo'
import { CategoryMenu } from './category-menu'
import { UserControl } from './user-control'
import { forwardRef } from 'react'
import { useAppHeader, AppHeaderContext } from '../contexts/use-app-header'

const sx = {
  position: 'fixed',
  width: "100%",
  top:0,
  left: 0,
  zIndex: (t: any)=>t.zIndex.appBar * 1,
  bgcolor: "white",
  "& > div > div":{
    minHeight: 70,
    // zIndex: (t: any)=>t.zIndex.appBar * 1000,
    display: 'flex',
    alignItems: 'center',
  }
}

export const Header = forwardRef(({}, ref)=>{
  const context = useAppHeader();
  return (
    <AppHeaderContext.Provider value={context}>
      <Box ref={ref} sx={sx}>
        <Container sx={{px: [0]}}>
          <div>
            <CategoryMenu/>
            <UserControl />
            <Logo/>
          </div>
        </Container>
      </Box>
    </AppHeaderContext.Provider>
  )
});
