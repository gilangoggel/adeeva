import { Header } from './header'

export function User({children}: any) {

  return (
    <>
      <Header/>
      {children}
    </>
  );
}
