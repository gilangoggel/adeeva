import { TabWrapper } from '../tab-wrapper'
import { RecipmentField } from './recipment-field'
import { SellerOption } from './seller-option'
import { Layout } from '../layout'
import { Box } from '@mui/material'

export const ShipmentTab = () => {
  return (
    <TabWrapper>
      <Box sx={{mt: 2}}>
        <Layout>
          <Box sx={{pr:[0,3]}}>
            <RecipmentField/>
            <SellerOption/>
          </Box>
        </Layout>
      </Box>
    </TabWrapper>
  );
};
