import {Box, Divider, ImageList, ImageListItem, useMediaQuery, useTheme} from '@mui/material'
import { sx } from './sx'
import { useHighlightProductProvider } from './provider'
import { ImageContainer } from './image-container'
import { Content } from './content'

export const HighlightProducts = () => {
  const { product, products } = useHighlightProductProvider();
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));


  if (! product){
    return <></>
  }
  return (
    <Box sx={{mt: 1, px:2}}>
      <ImageList
        variant='quilted'
        cols={4}
        rowHeight={isSm ? 200 : 420} gap={10}
      >
        {
          products.map((item, index)=>(
            <ImageContainer
              {...item}
              key={item.id}
              expand={index === 0 || index === products.length - 1 || isSm}
            />
          ))
        }
      </ImageList>
    </Box>
  );
};
