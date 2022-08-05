import {
  doAdminCompletion,
  doResellerConfirm,
  pushTracking,
  doResellerCompletion,
  checkPaymentStatus,
  doUserCompletion
} from "./functions";

export function requestViews(self: any){
  return {
    doAdminCompletion(){
      return doAdminCompletion(self)
    },
    doResellerCompletion(message: string){
      return doResellerCompletion(self, message)
    },
    doCustomerCompletion(){
      return doUserCompletion(self);
    },
    doResellerConfirm(){
      return doResellerConfirm(self)
    },
    trakingRequest(isAdmin = true, text: string ){
      return pushTracking(self, text,isAdmin)
    },
    checkPaymentStatus(isAdmin = false){
      return checkPaymentStatus(
        self, isAdmin
      )
    }
  }
}
