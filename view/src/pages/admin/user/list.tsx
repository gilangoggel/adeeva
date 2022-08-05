import * as React from 'react';
import {Column, ListPage} from "@components/list-page";
import {Filter} from "@root/pages/admin/reseller/list/filter";

const config: Column<IReseller>[] =[
  {
    key: "email",
    title: "Alamat email"
  },
  {
    key: "name",
    title: "Nama"
  },
]

export const List = (props: any) => {
  return (
      <>
        <ListPage
          filter={Filter}
          title='Data pengguna'
          columns={config}
          onAction={console.log}
          {...props.paginator as any}
        />
      </>
  );
};
