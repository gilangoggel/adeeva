import {useEffect} from "react";
import { useResellerOrder } from './hoc'
import { Data } from './types'
import {Box} from "@mui/material";
import {formatMoney} from "@utils/format-money";
import { Wrapper } from './wrapper'
import {observer} from "mobx-react";


const itemSx = {
  display: "flex",
  mb: 2,
  pb:1,
  borderBottom:"solid 1px",
  borderColor:"#eaeaea",
  "& .img-container":{
    backgroundPosition: "center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    width: 128,
    height: 128,
  },
  "& .inner":{
    px:2
  },
  "& .content":{
    flex:1,
  },
  "& .title":{
    fontWeight:"bolder"
  },
  "& .flex":{
    display: 'flex',
    "& > p":{
      width: "50%"
    }
  }
}

const Item = ({ product: {name, image}, subTotal, amount, pax }: Data) => {

  const flexes : Record<'label'| "content", string>[] = [
    {
      label: "Jumlah", content: `x ${amount}`
    },
    {
      label: "Qty barang", content: `${amount * pax} barang`
    },
    {
      label: "Sub total", content: `Rp ${formatMoney(subTotal)}`
    }
  ]

  return (
    <Box sx={itemSx}>
      <div className="img-container" style={{
        backgroundImage:`url(${image})`
      }}/>
      <div className='content'>
        <div className="inner font-poppins">
          <p className='title'>
            {name}
          </p>
          {
            flexes.map(item=>(
              <div key={item.label} className="flex">
                <p>
                  {item.label}
                </p>
                <p>
                  {item.content}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </Box>
  )
}

export const Products = observer( () => {

  const [{entity, data}, {fetch}]  = useResellerOrder();

  useEffect(()=>{
    if (entity){
      fetch();
    }
  }, [])

  return (
    <Wrapper>
      {
        data.map(item=>(
          <Item {...item} key={item.id} />
        ))
      }
    </Wrapper>
  );
});
