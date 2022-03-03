import * as React from "react";
import { CartItem } from "../../stores/cart-store";
import { observer } from "mobx-react";
import { Box, Typography } from "@mui/material";
import defaultImg from "../../assets/product.png";
import { moneyFormat } from "../../utilities/money-format";
import { useNavigate } from "react-router-dom";
import voca from "voca";

type Props = {
  cart: CartItem;
  onClose(): void;
};

const sx = {
  display: "flex",
  alignItems: "center",
  mb: 2,
  "& > img": {
    width: 75,
    height: 50,
  },
  "& > .content": {
    px: 1,
    cursor: "pointer",
    "&:hover": {
      "& > *": {
        color: (t: any) => `${t.palette.primary.main}!important`,
      },
    },
    "& > .title": {
      fontWeight: "bolder",
    },
    "& > .price": {
      color: "primary.main",
      display: "block",
    },
  },
};

export const CartItemView = observer(({ cart, onClose }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `/product/${voca(cart.name).lowerCase().replaceAll(" ", "-").value()}`,
      {
        state: {
          productId: cart.id,
        },
      }
    );
    setTimeout(onClose, 500);
  };
  return (
    <>
      <Box sx={sx} onClick={handleClick}>
        <Box component="img" src={cart.image ? cart.image : defaultImg} />
        <Box className="content">
          <Typography variant="caption" className="title">
            {cart.name}
          </Typography>
          <Typography className="price" variant="caption">
            Rp {moneyFormat(cart.price)} x {cart.amount}
          </Typography>
        </Box>
      </Box>
    </>
  );
});
