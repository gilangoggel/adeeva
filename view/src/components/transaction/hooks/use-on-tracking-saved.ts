import {useSnackbar} from "notistack";
import {useCallback} from "react";
import {Inertia} from "@inertiajs/inertia";

type Props = {
  callback() : void
};

export function useOnTrackingSaved({callback}: Props){
  const {enqueueSnackbar}  = useSnackbar();
  return useCallback((res: boolean)=>{
    if (res){
      setTimeout(()=>{
        enqueueSnackbar("Order berhasil dilanjutkan ke pengiriman", {variant:"info"})
        callback();
      }, 1000)
    }
  }, [])
}
