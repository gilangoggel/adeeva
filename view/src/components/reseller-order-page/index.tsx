import * as React from 'react';
import {ResellerOrderDetailModal, ResellerOrderProvider} from "@components/reseller-order-detail-modal";
import {Column, ListPage} from "@components/list-page";
import {useState} from "react";

type Props = {
  withForm ?: boolean
  title?: string
} & any

const config: Column<IResellerOrder>[] =[
  {
    disableOrder: true,
    title : "Reseller",
    key: "reseller.user.name"
  },
  {
    disableOrder: true,
    title : "Alamat pengiriman",
    key: "reseller.address"
  },
  {
    disableOrder: true,
    title : "Total",
    key: "total",
    type: "money"
  },
  {
    disableOrder: true,
    title : "Jumlah produk",
    key: "productCount"
  },
  {
    key: "status",
    title: "Status",
    type: "status",
    disableOrder: true
  },
  {
    key: "deliveryReciptNumber",
    disableOrder: true,
    title: "Nomor resi pengiriman",
    type: "masked"
  }
]

export const ResellerOrderPage = ({withForm = false, title = "Riwayat produk" , ...rest}: Props) => {
  const [showEntity, setShowEntity] = useState<null| IResellerOrder>(null)
  const onAction = (entity: IResellerOrder, action: string) => {
    if (action === "show"){
      setShowEntity(entity);
      return;
    }
  }
  return (
    <>
      <ResellerOrderProvider entity={showEntity} setter={setShowEntity}>
        <ResellerOrderDetailModal disableForm={! withForm}/>
      </ResellerOrderProvider>
      <ListPage
        {...rest.paginator as any}
        columns={config}
        disabledAction={['edit','delete', 'update']}
        title={title}
        filter={()=><></>}
        onAction={onAction}
        customAction={[
          {
            label: "Tracking",
            disabled(entity: IResellerOrder): boolean {
              if (entity.status === "finish"){
                return true
              }
              return entity.deliveryReciptNumber === null
            },
            action: "tracking"
          }
        ]}
      />
    </>
  );
};
