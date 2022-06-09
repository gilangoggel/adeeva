import * as React from 'react';
import { VirtualAccountInfo, StepCallback, Step } from './types'
import {List, ListItem, ListItemText} from "@mui/material";
import {ITransaction} from "@models/transaction-extended";
import {useMemo} from "react";

type Props = {
  content: VirtualAccountInfo
  transaction :ITransaction
}

type StepProps = {
  item: StepCallback| Step
  transaction :ITransaction
  step: number
}

const StepInfo = ({ item, step, transaction } : StepProps) => {
  const { texts, title } = useMemo(()=>{
    return typeof item === "function" ? item(transaction) : item
  }, [item])


  return (
    <>
      <p className='font-poppins'>
        Langkah {step} : {title}
      </p>
      <List dense>
        {
          texts.map((item, index)=>(
            <ListItem key={index}>
              <ListItemText primary={item}/>
            </ListItem>
          ))
        }
      </List>
    </>
  )
}

export const HowPay = ({content, transaction} : Props) => {
  const { steps} = content;
  return (
    <>
      {
        steps.map((item, index)=>(
          <StepInfo
            step={index+ 1}
            item={item}
            transaction={transaction}
            key={typeof item === "function" ? item(transaction).title : item.title}
          />
        ))
      }
    </>
  );
};
