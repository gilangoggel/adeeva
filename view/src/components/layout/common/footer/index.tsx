import * as React from 'react';
import {Container, Grid, Box, List, ListItemIcon, ListItemText, ListItem} from "@mui/material";
import {Instagram, Facebook, Mail, Phone, PinDrop} from "@mui/icons-material";

type Props = {

};

const ContentContainer = ({children} : any) => {
  return (
    <Grid xs={12} item md={4}>
      {children}
    </Grid>
  )
}

const ContentRender = ({items}: {items: any[]}) => (
  <List>
    {
      items.map(({text, icon : Icon, href= "#"})=>(
        <ListItem button sx={{
          borderRadius:10,
          '&:hover * > *':{
            color:'white',
          },
          '& * > *':{
            color:'white!important',
          },
          "&:hover":{
            bgcolor:"rgba(0,0,0,0.24)"
          }
        }} component='a' target='_blank' href={href} key={text}>
          <ListItemIcon>
            <Icon sx={{color:'white'}}/>
          </ListItemIcon>
          <ListItemText secondary={text}/>
        </ListItem>
      ))
    }
  </List>
)

const LogoAddress = ({}) => {
  return (
    <div>
      <h1>
        Adeeva
      </h1>
      <Box sx={{
        p:{
          fontSize:'2rem'
        }
      }}>
        <p className='font-vibes'>
          Suksess berjamaah
        </p>
        <p style={{textAlign: "center"}} className='font-vibes'>
          Together till janna
        </p>

      </Box>
    </div>
  )
}

const socmeds = [
  {
    icon: Instagram,
    text: "@adeeva_group",
    href:"https://www.instagram.com/adeevasnack_official/?utm_medium=copy_link"
  },
  {
    icon: Facebook,
    text: "AdeevaGroupIndonesia",
    href: "https://www.facebook.com/adeevagroup.adeevagroup"
  },
]
const contacts = [
  {
    icon: Mail,
    text: "contact@adeeva.web.id",
    href: `mailto: contact@adeeva.web.id`
  },
  {
    icon: Phone,
    text: "+62817-0000-055",
    href: `tel: 0817-0000-055`
  },
  {
    icon: PinDrop,
    text: "Jl Mr Wahid No 32 Besuk, Wirowongso Ajung jember",
    href: "http://maps.google.com/?q=Jl Mr Wahid No 32 Besuk, Wirowongso Ajung jember"
  },
]

const SocialMedia = ({}) => {
  return (
    <div>
      <h1>
        Follow us
      </h1>
      <ContentRender items={socmeds}/>
    </div>
  )
}
const ContactUs = ({}) => {
  return (
    <div>
      <h1>
        Contact
      </h1>
      <ContentRender items={contacts}/>
    </div>
  )
}

export const Footer = (props: Props) => {
  return (
    <Box sx={{bgcolor: "secondary.main", color:'white'}}>
      <Container sx={{py:5}}>
        <Grid container>
          <ContentContainer>
            <LogoAddress/>
          </ContentContainer>
          <ContentContainer>
            <SocialMedia/>
          </ContentContainer>
          <ContentContainer>
            <ContactUs/>
          </ContentContainer>
        </Grid>
      </Container>
    </Box>
  );
};