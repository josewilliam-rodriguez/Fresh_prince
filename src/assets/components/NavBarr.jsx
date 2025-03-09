import { AppBar, Avatar, Box, IconButton, Toolbar, Typography} from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/userContext'
import Logo from '../images/logo.png'
import ModalAdmin from './ModalAdmin';

const NavBarr = () => {
  const { context, setContext } = useContext(AppContext)
  const [open, setOpen] = useState(false)


  return (
    <>
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", boxShadow: "none", padding: "0.5rem 2rem" }}>
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      
    <Link to="/">
          <img src={Logo} alt="Príncipe Fresco" style={{ height: "50px" }} />
        </Link>

      <Box sx={{ display: "flex", gap: 4 }}>
        <Typography component={Link} to="/Shop" sx={navLinkStyles}>SHOP</Typography>
        <Typography component={Link} to="/Collections" sx={navLinkStyles}>COLLECTIONS</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton component={Link} to="/ShoppingCart">
          <AddShoppingCartIcon  />
        </IconButton>

        <IconButton onClick={() => setOpen(true)}>
          <Avatar alt={context.nombre} src={context.profile || ""} />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
        <ModalAdmin open={open} handleClose={() => setOpen(false)} />
  </>
);
};

const navLinkStyles = {
color: "#000",
textDecoration: "none",
fontWeight: "500",
fontSize: "1rem",
"&:hover": {
  color: "red",
},
};

export default NavBarr