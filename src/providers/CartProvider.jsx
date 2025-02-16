import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export const useCartContext = () => useContext(CartContext);
