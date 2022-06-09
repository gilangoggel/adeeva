import { observer } from "mobx-react";
import { useTransactionDialog } from '../context';
import { Create } from './create'
import { View } from './view'
import { Send } from './send'


export const ReturForm = observer( () => {
  const [store ] = useTransactionDialog()
  const retur = store.retur;

  if (! retur) {
    return <Create/>
  }
  if (retur && retur.accepted && !retur.tracking_number){
    return <Send/>
  }
  return (
    <View/>
  );
});
