import {usePage} from "@inertiajs/inertia-react";
import {useSnackbar} from "notistack";
import {useCallback, useEffect} from "react";
import {Inertia} from "@inertiajs/inertia";
import {useGlobalStore} from "@root/provider/globar-store-provider";

interface AuthAction{
  SignIn: (credential: Record<string, any>) => void
  SignOut:()=>void
}

export function useAuthListener(){
  const { props } = usePage();
  const store  = useGlobalStore();
  const { enqueueSnackbar } = useSnackbar();
  const {auth} = props
  useEffect(()=>{
    store.setUser(auth)
    let message = '';
    if (auth && ! store.user){
      message = `Selamat datang ${(auth as any).name}`
    }
    if (!auth && store.user){
      message = 'Anda berhasil keluar'
    }
    if (message){
      enqueueSnackbar(message, {variant:"success"})
    }
  }, [auth, store, enqueueSnackbar])
}

export function useAuthAction() : AuthAction {
  const SignOut = useCallback(()=>{
    Inertia.post('/logout', {})
  },[])
  const SignIn = useCallback((credential: Record<string, any>)=>{
    Inertia.post('/sign-in', credential)
  },[])
  return {
    SignIn,
    SignOut
  }
}
