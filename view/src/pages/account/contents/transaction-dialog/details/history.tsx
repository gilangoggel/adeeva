import { Container } from './container'
import { Tracking } from '@components/shipment/tracking'
export const History = () => {
  return (
    <Container title='Riwayat transaksi & pengiriman'>
      <Tracking hideTrackingNumber/>
    </Container>
  );
};
