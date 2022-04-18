import {BackofficeLayout} from "@components/layout/backoffice-layout";

export function Reseller({children}: any) {

  return (
    <BackofficeLayout mode='reseller'>
      {children}
    </BackofficeLayout>
  );
}
