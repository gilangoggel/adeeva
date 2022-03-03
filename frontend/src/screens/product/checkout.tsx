import * as React from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import {
  Add,
  ChatBubble,
  Favorite,
  Remove,
  ShoppingCart,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useProductPage } from "./provider";
import { moneyFormat } from "../../utilities/money-format";
import { useCartStore } from "../../stores/cart-store";
import { observer } from "mobx-react";

export const Checkout = observer(() => {
  const cart = useCartStore();
  const [amount, setAmount] = useState(1);
  const { product } = useProductPage();
  const { price } = product;

  const onSubmit = () => {
    cart.push({ ...product, amount });
  };

  useEffect(() => {
    if (cart.has(product.id)) {
      const current = cart.has(product.id);
      if (current) {
        setAmount(current.amount);
      }
    }
  }, [product]);

  const add = () => {
    setAmount(amount + 1);
  };
  const sub = () => {
    setAmount(amount - 1);
  };

  return (
    <Box sx={{ px: 1 }}>
      <Box
        sx={{
          border: "solid 1px",
          borderColor: "primary.main",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "fit-content",
        }}
      >
        <Button disabled={amount === 1} onClick={sub}>
          <Remove />
        </Button>
        <Box sx={{ width: 100, textAlign: "center" }}>
          <Typography sx={{ fontWeight: "bolder" }} variant="caption">
            {amount}
          </Typography>
        </Box>
        <Button onClick={add}>
          <Add />
        </Button>
      </Box>
      <Typography variant="caption">Total</Typography>
      <Typography sx={{ fontWeight: "bolder" }}>
        Rp {moneyFormat(amount * price)}
      </Typography>
      <div>
        <Button
          startIcon={<ShoppingCart />}
          sx={{ my: 2, textTransform: "none" }}
          variant="contained"
          onClick={onSubmit}
        >
          Tambahkan ke keranjang
        </Button>
        <Box sx={{ my: 1 }}>
          <Button
            size="small"
            startIcon={<ChatBubble />}
            color="primary"
            sx={{ mr: 2, textTransform: "none" }}
          >
            Tanya
          </Button>
          <Button
            size="small"
            startIcon={<Favorite />}
            color="primary"
            sx={{ mr: 2, textTransform: "none" }}
          >
            Wishlist
          </Button>
        </Box>
      </div>
    </Box>
  );
});
