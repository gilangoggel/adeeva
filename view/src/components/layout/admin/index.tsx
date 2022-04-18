import { BackofficeLayout } from '../backoffice-layout'

export function Admin({children}: any) {

  return (
    <BackofficeLayout mode='admin'>
      {children}
    </BackofficeLayout>
  );
}
