import * as React from 'react';
import {ColumnProps} from "@components/list-page";

const intl = new Intl.NumberFormat('ID', {
  currency:"IDR"
})

function toMoney(n : number){
  return intl.format(n);
}

export const Money = ({ config : {key}, entity }: ColumnProps) => {

  const num = entity[key as keyof typeof entity];
  return (
    <div>
      Rp. {
        toMoney(num as number)
      }
    </div>
  );
};
