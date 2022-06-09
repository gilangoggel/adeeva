import { Inertia } from '@inertiajs/inertia'

function useHandler() {
  return (admin = true)=> {
    return ()=>{
      return Inertia.post('/sign-in',{
        email: admin ? 'administrator@adeeva.group' : 'user@adeeva.group',
        password: "password"
      })
    }
  }
}


export const LoginForm = () => {
  const handler = useHandler()
  return (
    <div>
      <div>
        <button onClick={handler()}>
          Login admin
        </button>
      </div>
      <div style={{marginTop:"2rem"}}>
        <button onClick={handler(false)}>
          Login user
        </button>
      </div>
    </div>
  )
}
