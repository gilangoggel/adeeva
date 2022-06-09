import { types as t } from 'mobx-state-tree'

export const layoutModel = t.model({
  appbarHeight: t.number
})
  .actions(self=>({
    setHeight(n :number){
      self.appbarHeight = n
    }
  }))
  .views(self=>{
  const get100Vh = () => {
    return window.innerHeight - self.appbarHeight
  }
  return {
    get100Vh
  }
})
export const layoutStore = layoutModel.create({
  appbarHeight: 0
})
