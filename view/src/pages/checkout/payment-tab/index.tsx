import { TabWrapper } from '../tab-wrapper'
import { Layout } from '../layout'
import { Box } from '@mui/material'
import { OptionContainer } from './option-container'

const virtualAccount = {
  items: ['bca', 'mandiri', 'bri'],
  title: "Transfer bank",
  description: "Metode pembayaran melalui transfer antar bank melalui virtual account"
}
const ewallet = {
  items: ['gopay', {
    label: "Shopee pay",
    value: 'shopeepay'
  }],
  title: "E-Wallet / Mobile banking ( QR code )",
  description: "Metode pembayaran melalui jaringan pembayaran digital QRIS (OVO, GoPay, DANA, BCA mobile, dll)"
}

export const PaymentTab = () => {
  return (
    <TabWrapper>
      <Layout>
        <Box sx={{pt: 5, pr: [0,3]}}>
          <OptionContainer {...virtualAccount}/>
          <OptionContainer {...ewallet}/>
        </Box>
      </Layout>
    </TabWrapper>
  );
};
