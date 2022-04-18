import {ColumnProps} from "../type";
import {ComponentType} from "react";
import { AccessAlarm, LocalShipping, Check, HelpOutline } from '@mui/icons-material'
import {get} from "lodash";
import {Chip} from "@mui/material";

type StatusContent = {
  color: string
  label: string
  icon: ComponentType
}
const map : Record<string, StatusContent> = {
  shipment: {
    color: "warning",
    label: "pengiriman", icon: LocalShipping
  },
  pending: {
    color: "default",
    label: "Pending",
    icon: AccessAlarm
  },
  success:{
    color: "success",
    label: "Barang telah sampai",
    icon: Check
  },
  finish:{
    color: "success",
    label: "Barang telah sampai",
    icon: Check
  }
}
const defaultItem: StatusContent = {
  icon: HelpOutline,
  color: "default",
  label: "Not define"
}

export const Status = ({ entity, config: {key} } : ColumnProps) => {
  const { icon : Icon, color, label } = map[get(entity, key)] ?? defaultItem;
  return (
    <>
      <Chip color={color as any} label={label} icon={
        <Icon/>
      }/>
    </>
  );
};
