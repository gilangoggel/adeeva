import { Container } from './container'
import { Content as Payment } from '@components/transaction/extended/payment-info'
export const PaymnetDetail = () => {
  return (
    <Container title='Metode pembayaran'>
      <Payment withContent/>
    </Container>
  );
};
