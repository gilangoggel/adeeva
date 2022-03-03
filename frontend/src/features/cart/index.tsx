import * as React from "react";
import { observer } from "mobx-react";
import { useCartStore } from "../../stores/cart-store";
import {
  Badge,
  ClickAwayListener,
  Button,
  Popper,
  Fade,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartItemView } from "./cart-item-view";
import { moneyFormat } from "../../utilities/money-format";

const useCartEvent = () => {
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const mouseEvent = (close: boolean) => {
    return (e: any) => {
      setAnchor(close ? null : e.target);
    };
  };
  const navigate = useNavigate();
  const onClick = () => {
    return navigate("/carts");
  };
  const onMouseEnter = mouseEvent(false);
  const onMouseLeave = mouseEvent(true);
  return {
    onClick,
    onMouseLeave,
    onMouseEnter,
    anchor,
  };
};

const sx = {
  p: 2,
  bgcolor: "white",
  borderRadius: 3,
  boxShadow: 2,
  minWidth: 300,
  "& > .header": {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:hover": {
      color: "success.main",
    },
  },
};

export const Cart = observer(() => {
  const cart = useCartStore();
  const { anchor, onMouseEnter, onMouseLeave, onClick } = useCartEvent();
  return (
    <ClickAwayListener onClickAway={onMouseLeave}>
      <Box>
        <Popper open={Boolean(anchor)} transition anchorEl={anchor}>
          {({ TransitionProps }: any) => (
            <Fade {...TransitionProps} timeout={500}>
              <Box sx={sx}>
                <div className="header">
                  <Typography variant="body2">
                    Keranjang ({cart.items.length})
                  </Typography>
                  <Typography variant="body2">Tampilkan</Typography>
                </div>
                <Divider sx={{ my: 2 }} />
                <Box>
                  {cart.items.map((item) => (
                    <CartItemView
                      onClose={onMouseLeave as any}
                      cart={item}
                      key={item.id}
                    />
                  ))}
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography>Total</Typography>
                <Typography>Rp {moneyFormat(cart.total)}</Typography>
              </Box>
            </Fade>
          )}
        </Popper>
        <Button
          onMouseEnter={onMouseEnter}
          onClick={onClick}
          sx={{ color: "white", textTransform: "none", px: 2, borderRadius: 5 }}
          startIcon={<ShoppingCart />}
        >
          <Badge badgeContent={cart.count()} showZero={false} color="error">
            Keranjang
          </Badge>
        </Button>
      </Box>
    </ClickAwayListener>
  );
});
