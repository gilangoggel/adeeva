
interface AuthAction{
  SignIn: (credential: Record<string, any>) => void
  SignOut:()=>void
}

export function useAuthListener(){
  // useEffect(()=>{
  //   store.setUser(auth)
  //   let message = '';
  //   if (auth && ! store.user){
  //     message = `Selamat datang ${(auth as any).name}`
  //   }
  //   if (!auth && store.user){
  //     message = 'Anda berhasil keluar'
  //   }
  //   if (message){
  //     enqueueSnackbar(message, {variant:"success"})
  //   }
  // }, [auth, store, enqueueSnackbar])
}
