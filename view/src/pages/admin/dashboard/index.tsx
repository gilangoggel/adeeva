import { useDashboardProvider, Context } from './provider'
import { Summary } from './summary'
import { Hoc, useDashboardData } from './hoc'
import {useEffect} from "react";
import {usePage} from "@inertiajs/inertia-react";

const Wrap = () => {
  const [_, callback ] = useDashboardData();
  const pageProps = usePage().props;
  useEffect(()=>{
    callback(pageProps);
  }, [callback, pageProps])
  return (
    <Summary/>
  )
}

export const Dashboard = () => {
  return (
    <Hoc>
      <Wrap/>
    </Hoc>
  );
};
