import {getExpeditionImage, getTrackingUrl} from "@models/transaction-extended/functions";
import {cities} from "@root/enums/cities";
import {sumBy} from "lodash";
import {TransactionStatus} from '@root/enums/transaction-status'

export function computedViews(self: any){
  return {

    isStatus(status : TransactionStatus) : boolean {
      return self.status === status;
    },

    get canBeRetur(){
      if([TransactionStatus.RECEIVED_TO_CUSTOMER,TransactionStatus.RETUR ].includes(this.status)){
        return true;
      }
      return false;
      // return this.isStatus(TransactionStatus.RECEIVED_TO_CUSTOMER);
    },

    get invoiceId(){
      const items = [
        self.id,
        self.customer_id,
        self.city_id,
        self.reseller_id
      ].filter(Boolean)
      return  `INV/${items.join("")}`
    },
    get expeditionImage(){
      if (! self.expedition){
        return ""
      }
      const uri = getExpeditionImage(self.expedition);
      return `/assets/expedition/${uri}`
    },
    onTrackingUrlClick(){
      const url = getTrackingUrl(self.expedition as string);
      if (! url) return;
      const a = document.createElement('a');
      a.setAttribute("target", "_blank");
      a.setAttribute("href", url)
      a.click();
      a.remove();
    },
    get cityName(){
      const find = cities.find(item=>item.city_id == self.city_id);
      return find? `${find.type} ${find.city_name}` : ''
    },
    get productQuantity(){
      return sumBy(self.items, 'amount')
    },
    get beforShipping(){
      return self.total - self.shipping_cost;
    },
    get isPaymentSettled(){
      return self.meta.status === "settlement"
    }
  }
}
