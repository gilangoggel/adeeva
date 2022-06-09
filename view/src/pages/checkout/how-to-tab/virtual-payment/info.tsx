import * as React from 'react';
import {ITransaction} from "@models/transaction-extended";
import { bri } from './bri'
import { bca } from './bca'
import { mandiri } from './mandiri'
import { VirtualAccountInfo } from './types'
import { VirtualAccountDetail } from './virtual-account-detail'
import {Tabs, Tab, Box} from "@mui/material";
import { HowPay } from './how-pay'
import { TabWrapper } from '../../tab-wrapper'

type Props = {
  transaction: ITransaction
};
const map : Record<string, VirtualAccountInfo[]> = {
  bri,
  bca,
  mandiri
}

type State = {
  tab: number
};

export class Info extends React.Component<Props, State> {

  mode: "bca" | 'mandiri' | 'bri';

  get contents(){
    if (this.mode === "mandiri"){
      return mandiri;
    }
    return map[this.mode];
  }

  constructor(props: any) {
    super(props);
    this.state = {
      tab: 0
    }
    const meta = this.props.transaction.meta;
    const { payment_type } = meta;
    if (payment_type === "echannel"){
      this.mode = "mandiri"
    }else{
      const { va_numbers : [{ bank }] } = meta;
      this.mode = bank as any;
    }
  }

  onChange = (e: any, tab:any)=>{
    this.setState({
      tab
    })
  }
  render() {
    return (
      <div>
        <VirtualAccountDetail transaction={this.props.transaction} />
        <Tabs onChange={this.onChange} value={this.state.tab}>
          {
            this.contents.map((item)=>(
              <Tab label={item.title} key={item.title}/>
            ))
          }
        </Tabs>
        <TabWrapper key={this.state.tab}>
          <Box sx={{py:2, mb: 10}}>
            <HowPay transaction={this.props.transaction} content={this.contents[this.state.tab]}/>
          </Box>
        </TabWrapper>
      </div>
    );
  };
};
