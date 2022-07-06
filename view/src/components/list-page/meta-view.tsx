import * as React from 'react';
import { Meta } from './type'
import {Box, Pagination} from "@mui/material";
import {useCallback, useMemo} from "react";
import { useListPage } from './Hoc'

const sx = {
  p: 2,
  pb: 2,
  color: "white",
  "& > p":{
    fontWeight:"bold"
  },
  display: "flex",
  alignItems: 'center',
  justifyContent:"space-between",
}
const paginatorSx = {
  "& .Mui-selected":{
    bgcolor:'white!important',
    boxShadow: 3,
    color: "primary.dark",
    "&:hover":{
      bgcolor: "rgba(255,255,255,0.51)",
      color:'primary.dark'
    }
  },
  "& button":{
    color: "white",
    fontFamily:"Poppins",
    "&:hover":{
      bgcolor: "rgba(255,255,255,0.51)",
      color:'white'
    }
  }
}

function usePaginationHandler({current_page, total, per_page}:Meta){
  const [, {updateParams}]  = useListPage();
  const onPageChange = useCallback( (e: any, page: number)=>{
    updateParams({
      page
    })
  }, [updateParams]);
  const paginatorProps = useMemo(()=>{
    return {
      onChange: onPageChange,
      count: Math.ceil(total / per_page),
      page: current_page
    }
  }, [current_page, total, per_page, onPageChange])
  return {
    onPageChange,
    updateParams,
    paginatorProps
  }
}
export const MetaPaginator = (props: Meta) => {
  const { paginatorProps }= usePaginationHandler(props);
  return (
    <Pagination sx={paginatorSx} {...paginatorProps as any} />
  )
}
export const MetaView = (props : Meta) => {
  const {total} = props;
  return (
    <Box sx={sx}>
      {
        total ?
          <p className='font-poppins'>
            Total {total} data
          </p>: null
      }
      {
        total ? <MetaPaginator {...props} /> : null
      }
    </Box>
  );
};
