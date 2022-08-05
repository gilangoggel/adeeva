import { Dashboard as Base } from '../../admin/dashboard'
import {Box} from "@mui/material";
import {formatMoney} from "@utils/format-money";

export const Dashboard = ({reseller : {balance}} : any) => {
  return (
    <Base>
      <Box sx={{p:2, bgcolor:"primary.main", mt: 3, color: "white"}}>
        <p>
          Saldo anda
        </p>
        <h1>
          Rp {formatMoney(balance)}
        </h1>
      </Box>
    </Base>
  );
};
