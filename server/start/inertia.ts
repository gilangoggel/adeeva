import Inertia from '@ioc:EidelLev/Inertia'

Inertia.share({
  admin: async ({auth}) => {
    return auth.check().then( async (response) => {
      if (response && auth.user?.role !=="ADMINISTRATOR"){
        const User = await import('App/Models/User')
        const user = await User.default.FindAdmin();
        return user ? {
          name: user.name,
          id: user.id
        } : null;
      }
      return null;
    }).catch((e)=> {
      console.log(e)
      return null
    })
  },
  errors:async (ctx) => {
    return ctx.session.flashMessages.get('errors')
  },
  auth: ( {auth  }) => {
    // await auth.use('web').authenticate().then(console.log).catch(console.log)
    return auth.authenticate().then((user)=>user).catch(()=>null)
  },
  query: async ({params, request })=>({
    ...params,
    ...request.qs()
  })
})
