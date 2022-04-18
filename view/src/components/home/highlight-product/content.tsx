import {Box} from "@mui/material";
import {formatMoney} from "@utils/format-money";

const sx = {
  h3:{
    fontWeight: "lighter"
  },
  h6:{
    fontWeight: "normal",
    fontSize: "1.5rem"
  },
  '& p.category':{
    fontWeight: 'bolder'
  }
}

export const Content = ({name, category, price}: IProduct) => {
  return (
    <Box className='font-poppins' sx={sx}>
      <h3>
        {name}
      </h3>
      <p>
        {category}
      </p>
      <h6>
        Rp {formatMoney(price)}
      </h6>
    </Box>
  );
};
