import { Container } from './container'
import { useRenderShipmentInfo } from '@components/transaction/extended/shipment-info'
export const ShipmentInfo = () => {
  return (
    <Container title='Informasi pengiriman'>
      {
        useRenderShipmentInfo()
      }
    </Container>
  );
};
