import React from 'react';
import { 
  Container, Typography, List, ListItem, ListItemText, 
  IconButton, Box, Divider, Paper 
} from '@mui/material';
import { DeleteIcon, PlusSquareIcon, RemoveFormattingIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';


const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  // Calculate total cart price
  const totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="text.secondary">
          Your cart is currently empty.
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Paper elevation={3} sx={{ p: 2 }}>
        <List>
          {state.items.map((item) => (
            <React.Fragment key={item.id}>
              <ListItem
                secondaryAction={
                  <IconButton edge="end" color="error" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.name}
                  secondary={`$${item.price.toFixed(2)}`}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                  <IconButton size="small" onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}>
                    <RemoveFormattingIcon />
                  </IconButton>
                  <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                  <IconButton size="small" onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}>
                    <PlusSquareIcon />
                  </IconButton>
                </Box>
                <Typography variant="body1" sx={{ minWidth: 80, textAlign: 'right' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Typography variant="h5">
            Total: ${totalPrice.toFixed(2)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Cart;