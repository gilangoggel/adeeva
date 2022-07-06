import { Box } from '@mui/material'
import { Logo } from './logo'
import { LeftContent } from './left-content'
import { RightContent } from './right-content'
import { useHeader, HeaderContext } from './context'
import { DrawerNode } from './drawer-node'
import { PopperNode } from './popper-node'
import { UserMenu } from './contents/user-menu'
import { UserCart } from './contents/user-cart'
import { UserWishlist } from './contents/user-wishlist'

const sx = {
  display: 'flex',
  '& .logo-container' : {
    flex:1,
    display: 'flex',
    alignItems:'center',
    position: 'relative'
  }
}

export const Header = () => {
  const context = useHeader();
  return (
    <HeaderContext.Provider value={context}>
      <div>
        <Box sx={sx}>
          <div>
            <LeftContent/>
          </div>
          <div className="logo-container">
            <Logo/>
          </div>
          <div>
            <RightContent/>
          </div>
        </Box>
      </div>
      <DrawerNode name='cart'>
        <UserCart/>
      </DrawerNode>
      <PopperNode name='usermenu'>
        <UserMenu/>
      </PopperNode>
    </HeaderContext.Provider>
  );
};
