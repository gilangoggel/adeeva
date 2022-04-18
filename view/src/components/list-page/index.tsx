import * as React from 'react';
import { ListPageProps } from './type'
import { Table, TableContainer, TableHead, Paper, TableBody, Box } from '@mui/material'
import { Header } from './header'
import { Row } from './Row'
import { Hoc } from './Hoc'
import {memo, useMemo} from "react";
import { MetaView } from './meta-view'
import {MoreVert} from "@mui/icons-material";
import { ContextMenu } from './context-menu'
import { motion } from 'framer-motion'

const paperSx = {
  mb: 5,
  mt: 2,
  bgcolor:"primary.main",
}
type HeadProps = {
  columns: ListPageProps<any>['columns']
}
type BodyProps = {
  data: Record<string, any>[]
  columns: ListPageProps<any>['columns']
}
type HeaderProps = {
  filter: ListPageProps<any>['filter']
  title: string
}

const Head = memo( ({ columns } : HeadProps) => {

  const hasImage = useMemo(()=>Boolean(
    columns.find(item=>item.type === "image")
  ), [columns])
  return (
    <TableHead component='div'>
      {columns.map(item => (
        <Header {...item as any} hasImage={hasImage} totalCol={columns.length} name={item.key as string}/>
      ))}
    </TableHead>
  )
},(p, n)=>p.columns.length === n.columns.length)

const Body = ({data, columns}: BodyProps) => {
  return ( (
    <TableBody sx={{bgcolor:'white'}} component='div'>
      {
        data.map(item=>(
          <Row data={item} key={item.id} columns={columns}/>
        ))
      }
    </TableBody>
  ))
}


const PageHeader = memo( ({filter: Filter, title}: HeaderProps) => {
  return (
    <Box sx={{p: 2, color:'primary.dark', bgcolor:"white"}}>
      <h1 className='font-poppins'>
        {title}
      </h1>
      <Box sx={{py: 1}}>
        <Filter/>
      </Box>
      <div>
        <small className='font-poppins'>
          Klik kanan pada baris data atau klik icon <MoreVert/> untuk menampilkan menu
        </small>
      </div>
    </Box>
  )
}, (p, n)=>p.title === n.title)

export const ListPage = (props : ListPageProps<any>) => {
  const {
    data, columns, title, filter, meta
  } = props

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        opacity: {
          duration :1
        }
      }}
    >
      <Hoc>
        <ContextMenu {...props} />
        <Paper sx={paperSx}>
          <PageHeader filter={filter} title={title}/>
          <MetaView {...meta} />
          <TableContainer>
            <Table component='div'>
              <Head columns={columns}/>
              <Body data={data} columns={columns}/>
            </Table>
          </TableContainer>
        </Paper>
      </Hoc>
    </motion.div>
  );
};
export * from './type'
export { useListPage } from './Hoc'
