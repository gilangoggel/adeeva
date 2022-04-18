import { motion } from 'framer-motion'
import { animation } from './styles'
import {Inertia} from "@inertiajs/inertia";
import {memo, PropsWithChildren} from "react";
import {Box, Divider, IconButton, Tooltip} from "@mui/material";
import {ArrowBack} from "@mui/icons-material";
import * as React from "react";
import { sx } from './styles'
import {FormUtilsProvider, UseFormUtils} from "@hooks/use-form-utils";

type Props = {
  title: string
  backuri: string
  backTooltip: string
  context: UseFormUtils<any>
  resolveUrl(): string
}

const Head = memo(({ title = 'Ubah data produk', backuri, backTooltip }: Omit<Props, 'context'| 'resolveUrl'>)=>{
  const onBack = () => {
    Inertia.get(backuri)
  }
  return (
    <Box sx={{display: "flex"}}>
      <Tooltip title={backTooltip}>
        <IconButton onClick={onBack} sx={{mr: 2, color:"primary.dark"}}>
          <ArrowBack/>
        </IconButton>
      </Tooltip>
      <h2 className='font-poppins'>
        {title}
      </h2>
    </Box>
  )
})

export const FormLayout = ({ title, backuri, backTooltip, context, resolveUrl, children } : PropsWithChildren<Props>) => {
  return (
    <FormUtilsProvider.Provider value={context as any}>
      <motion.div {...animation}>
        <Box sx={sx}>
          <div>
            <Head
              title={title}
              backuri={backuri}
              backTooltip={backTooltip}
            />
            <Divider className='divider'/>
            <form onSubmit={context.onSubmit(resolveUrl())} >
              {
                children
              }
            </form>
          </div>
        </Box>
      </motion.div>
    </FormUtilsProvider.Provider>
  );
};

export { GroupedField } from './grouped-field'
