import {ComponentType} from "react";
import {HourglassEmpty, LocalShipping, Check } from '@mui/icons-material';

type Return = {
  label: string
  color: "primary" | "warning" | "default",
  icon: ComponentType
}
export function resellerOrderStatus({status}: IResellerOrder) : Return{
  switch (status) {
    case "pending":{
      return {
        label: "Menunggu konfirmasi", color: "default", icon: HourglassEmpty
      }
    }
    case "shipment":{
      return {
        label: "Pengiriman", color: "warning", icon: LocalShipping
      }
    }
    default:{
      return {
        label: "Selesai", color: "primary", icon: Check
      }
    }
  }
}
