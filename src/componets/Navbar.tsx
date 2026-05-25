import React from 'react';
import { AppBar, Toolbar, Typography, Badge, IconButton } from '@mui/material';

import { useCart } from '../context/CartContext';
import { ShoppingCartIcon } from 'lucide-react';


const Navbar: React.FC = () => {
  const { state } = useCart();
  
  // Calculate total items for the badge
  const totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Shoping  Cart
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={totalItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;