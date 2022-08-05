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

  notifications({auth}){
    return auth.authenticate()
      .then( async (user)=>{
        console.log(await auth.check())
        if (! user) return {};
        const unread = await user.unreadNotifications();
        const readed = await user.readNotifications();
        const {chain} = await import('lodash');
        const format = (item) => {
          return ({
            ...item.data,
            id: item.id,
            read: item.read,
            at: item.createdAt.toFormat('y-MM-d'),
          })
        }
        const stacks = [...unread, ...readed].map(format);
        return chain(stacks).keyBy('id').mapValues().value();
      })
      .catch((error)=>{
        console.log(error);
        return {};
      })
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
