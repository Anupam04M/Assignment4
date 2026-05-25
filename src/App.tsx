import React from 'react';
import { CssBaseline, Box } from '@mui/material';
import { CartProvider } from './context/CartContext';
import Navbar from './componets/Navbar';
import ProductList from './componets/ProductList';
import Cart from './componets/Cart';


const App: React.FC = () => {
  return (
    <CartProvider>
      <CssBaseline />
      <Navbar />
      <Box sx={{ pb: 8 }}>
        <ProductList />
        <Cart />
      </Box>
    </CartProvider>
  );
};

export default App;