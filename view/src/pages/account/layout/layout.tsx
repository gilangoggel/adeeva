import { Box,Grid, Container } from '@mui/material'
import { Sidebar } from './sidebar'
import { Header } from './header'
export const Layout = ({children}: any) => {
  return (
    <Container>
      <Grid container>
        <Grid item md={3}>
          <Sidebar/>
        </Grid>
        <Grid item md={9}>
          <Box sx={{px:3}}>
            <Header/>
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
