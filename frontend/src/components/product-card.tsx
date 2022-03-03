import * as React from "react";
import { Box, Typography } from "@mui/material";
import defaultImg from "../assets/product.png";
import { moneyFormat } from "../utilities/money-format";
import { useNavigate } from "react-router-dom";
import voca from "voca";

export const ProductCard = ({
  image,
  price,
  name,
  category,
  id,
}: Record<string, any>) => {
  const navigate = useNavigate();

  const handleClick = () =>
    navigate(
      `/product/${voca(name).lowerCase().replaceAll(" ", "-").value()}`,
      {
        state: {
          productId: id,
        },
      }
    );

  return (
    <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
      <Box sx={{ textAlign: "center" }}>
        <Box
          component="img"
          sx={{ width: "100%", maxHeight: 200 }}
          src={image ? image : defaultImg}
        />
      </Box>
      <Typography variant="caption">
        {name} | {category}
      </Typography>
      <Typography variant="body2" sx={{ fontWeight: "bolder" }}>
        Rp {moneyFormat(price)}
      </Typography>
    </Box>
  );
};
