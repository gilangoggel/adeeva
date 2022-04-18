import * as React from 'react';
import { Column, ColumnProps } from './type'
import {TableCell, TableRow, IconButton, Theme} from "@mui/material";
import { Money as money } from './columns/money'
import { Number as number } from './columns/number'
import { Image as image } from './columns/image'
import { Text as text } from './columns/text'
import { Status as status } from './columns/status'
import { Masked as masked } from './columns/masked'
import {ComponentType, useMemo} from "react";
import { MoreVert } from '@mui/icons-material'
import { useListPage } from './Hoc'

const colMap: Record<string, ComponentType<ColumnProps>> = {
  money,
  text,
  number,
  image,
  status,
  masked
}

type Props = {
  data: Record<string, any>,
  columns: Column<any>[]
}
type CellProps = {
  column: Column<any>
  data: Record<string, any>
}

const Cell = ({column, data}: CellProps) => {
  const { type = "text" } = column;
  const Child = colMap[type];
  const sx = useMemo(()=>{
    if (type === 'image'){
      return {
        width: 120,
        height: 120,
      }
    }
    return {
      height: 30
    }
  }, [type])
  return (
    <TableCell sx={sx} className='cell' component='div'>
      <Child config={column} entity={data}/>
    </TableCell>
  )
}

const sx = {
  position: "relative",
  "& > .control":{
    position: "absolute",
    right:(t: Theme)=> t.spacing(2),
    top:(t: Theme)=> t.spacing(2),
  },
  '&[data-has-image="true"]':{
    "& .cell":{
      verticalAlign:"top"
    }
  }
}

export const Row = ({ data, columns } : Props) => {

  const hasImage = useMemo( () => {
    return Boolean(columns.find(item=>item.type === "image"))
  }, [columns])
  const [, {onContextMenu, onControlClick}] = useListPage();

  const openContextMenu = onContextMenu(data);
  const openContextMenuViaClick = onControlClick(data);

  return (
    <TableRow onContextMenu={openContextMenu} sx={sx} data-has-image={hasImage} component='div'>
      {
        columns.map((column)=>(
          <Cell key={column.key as any} column={column} data={data}/>
        ))
      }
      <IconButton className='control' onClick={openContextMenuViaClick}>
        <MoreVert/>
      </IconButton>
    </TableRow>
  );
};
