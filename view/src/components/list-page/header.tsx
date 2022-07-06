import { Column } from './type'
import {TableCell} from "@mui/material";
import { Sort } from '@mui/icons-material'
import {useCallback, useMemo} from "react";
import { useListPage } from './Hoc'
import { motion } from 'framer-motion'

type P = Column<any> & {
  name :string
  totalCol: number
  hasImage:boolean
}

const sx = {
  color:'white',
  cursor: "pointer",
  "& > div":{
    display: "flex",
    alignItems:'center',
    justifyContent:"space-between"
  }
}


const Icon = ({ direction, open }: {direction: 'ASC'| "DESC", open: boolean}) => {
  return (
    <motion.div
      animate={{
        opacity: open ? 1 : 0,
        rotate: direction === "DESC" && open ? 180 : 0
      }}
      transition={{
        rotate:{
          type: "tween"
        }
      }}
    >
      <Sort />
    </motion.div>
  )
}


export const Header = ({title, name, disableOrder, totalCol, type, hasImage, width : widthProps} : P) => {
  const label = useMemo(()=>title ?? name, [title, name]);

  // @ts-ignore
  const [{ sort, direction } , {updateSortOrder}] = useListPage();

  const active = useMemo(()=>sort === name, [sort]);
  const onClick = useCallback( () => {
    if (disableOrder) return;
    if (!active){
      updateSortOrder(name, 'ASC')
      return;
    }
    const reverse = {
      ASC : "DESC",
      DESC : null,
    }
    updateSortOrder(name, reverse[direction as keyof typeof reverse] as any)
  }, [updateSortOrder, active, direction]);

  const width = useMemo(()=>{
    if (type === "image"){
      return 120
    }
    if (hasImage){
      return `calc((100% / ${totalCol}) - ${120}px )`
    }
    return `calc(100% / ${totalCol})`
  }, [hasImage, totalCol, widthProps])
  return (
    <TableCell
      sx={sx}
      style={{
        width,
        overflow: "hidden"
    }}
      onClick={onClick}
      className='font-poppins'
      component='div'
    >
      <div>
        <div>
          {label}
        </div>
        <Icon direction={direction as any} open={active}/>
      </div>
    </TableCell>
  );
}
