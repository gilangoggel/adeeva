import {ComponentType, createElement, PureComponent} from 'react';
import {
  CheckPaymentStatus,
  ConfirmPayment,
  PaymentDetail,
  PaymentInfo,
  ShipmentInfo
} from "@components/transaction/extended";

const keys = ['checkPayment', 'paymentDetail', 'shipmentInfo', 'paymentInfo', 'confirmForm'] as const;
type KeyOfComponents = typeof keys[number]

type BoolMap = {
  [k in typeof keys[number]] : boolean
}
type Map = [typeof keys[number], ComponentType<any>]

const map : Map[] = [
  ["checkPayment", CheckPaymentStatus],
  ['paymentDetail', PaymentDetail],
  ['shipmentInfo', ShipmentInfo],
  ['paymentInfo', PaymentInfo],
  ['confirmForm', ConfirmPayment]
]

function getChildrens(self: Component){
  return map.filter((mapper)=>{
    const [k] = mapper;
    return self.state.booleanMap[k];
  }).map(config=>{
    const [ key, component ] = config
    const props = self.state.childrenProps[key];
    return createElement(component, {
      key,
      ...props
    })
  })
}

type ChildrenProps = Record<KeyOfComponents, Record<string, any>>;

type State = {
  childrenProps : Partial<ChildrenProps>
  booleanMap : Partial<BoolMap>
}

type Props = {
  Append?: ComponentType<any>
  Prepend?: ComponentType<any>
}

export class Component extends PureComponent<State & Props, State>{

  childrenProps : Record<KeyOfComponents, Record<string, any>> = {
    paymentDetail: {},
    checkPayment: {},
    paymentInfo: {},
    shipmentInfo: {},
    confirmForm: {}
  }

  constructor(props : any) {
    super(props);
    const { childrenProps, booleanMap } = this.props;
    this.state = {
      booleanMap,
      childrenProps
    }
  }
  render() {

    const { Prepend, Append } = this.props;

    return (
      <div>
        {
          Prepend ? <Prepend/> : null
        }
        {
          getChildrens(this)
        }
        {
          Append ? <Append/> : null
        }
      </div>
    );
  };
}
export class TransactionDrawer{
  node : typeof Component;

  prepend : ComponentType<any> |null = null;
  apppend : ComponentType<any> |null = null;

  map: BoolMap = {
    checkPayment: true, paymentInfo: true, paymentDetail: true, confirmForm: true, shipmentInfo: true
  }
  props: ChildrenProps = {
    checkPayment: {},
    paymentInfo: {},
    confirmForm:{},
    shipmentInfo:{},
    paymentDetail:{}
  }

  constructor() {
    this.node = Component;
  }

  factory = () : ComponentType<any> => {
    return (props: any) => {
      return createElement(
        this.node, {
          ...props,
          childrenProps: this.props,
          booleanMap: this.map,
          Prepend: this.prepend,
          Append: this.apppend
        }
      )
    };
  }

  withProps = (k : KeyOfComponents, props: Record<string, any>) => {
    this.props[k] = props;
    return this;
  }

  withAppend = (component: ComponentType<any>) => {
    this.apppend = component;
    return this;
  }

  withPrepend = (component: ComponentType<any>) => {
    this.prepend = component;
    return this;
  }

  static without(keys: KeyOfComponents[]){
    const self = new TransactionDrawer()
    keys.forEach(k=>{
      self.map[k] = false
    })
    return self;
  }
  static only(keys: KeyOfComponents[]){
    const self = new TransactionDrawer()
    Object.keys(self.props).forEach(k=>{
      self.map[k as KeyOfComponents] = false
    });
    keys.forEach(k=>{
      self.map[k] = true;
    })
    return self;
  }
  static make(){
    return new TransactionDrawer()
  }
}
