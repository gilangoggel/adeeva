import {Column, ListPage} from "@components/list-page";
import { Filter } from './filter'
import * as React from "react";

const config: Column<IReseller>[] =[
  {
    key: "user.name",
    title: "Nama reseller"
  },
  {
    key: "city",
    title: "Kota"
  },
  {
    key: "address",
    title: "Alamat"
  },
]

export const List = (props: any) => {

  return (
    <>
      <ListPage
        filter={Filter}
        title='Data Reseller'
        columns={config}
        onAction={console.log}
        {...props.paginator as any}
      />
    </>
  );
};
