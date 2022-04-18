import {Box, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import {formatMoney} from "@utils/format-money";

const sx = {
  position: "relative",
  borderRadius:1,
  cursor:"pointer",
  "&:hover":{
    "& > .mask":{
      bgcolor:"rgba(0,0,0,0.50)"
    }
  },
  "& .content":{
    position: "absolute",
    bottom: '1rem',
    left: "1rem",
    color:'white',
    "& > div":{
      lineHeight: "1"
    },
    "& h3":{
      fontWeight:"normal",
      display:"block"
    }
  },
  "& img":{
    zIndex: -1,
    borderRadius:1,
  },
  "& .mask":{
    borderRadius:1,
    position: "absolute",
    height: "100%",
    width:"100%",
    bgcolor:"rgba(0,0,0,0.20)",
    transition: "all ease-in-out 0.5s"
  },
}
export const ImageContainer = ({image, expand, name, price}: IProduct & {expand: boolean}) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ImageListItem
      sx={sx}
      cols={ expand ? 2 : 1}
    >
      <div className="mask"/>
      <img
        style={{background:"white"}}
        alt={image}
        src={image}
        loading="lazy"
      />
      <div className="content">
        <div className='font-poppins'>
          <div>
            <h3>{name}</h3>
            <p>
              Rp {formatMoney(price)}
            </p>
          </div>
        </div>
      </div>
    </ImageListItem>
  );
};
