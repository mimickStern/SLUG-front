import { createContext, useReducer } from "react";

export const Store = createContext();
const initialState = { cart: 
    { cartItems: localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : [] } };
console.log(initialState);

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      console.log(newItem);

      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem // Check if the new item already exists in the cartItems array
        ? state.cart.cartItems.map(
            (item) => (item._id === existItem._id ? newItem : item) // If it does, replace the existing item with the new one
          )
        : [...state.cart.cartItems, newItem]; // If it doesn't, add the new item to the end of the cartItems array

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return { ...state, cart: { ...state.cart, cartItems } }; // Return a new state object with an updated cart object that has the updated cartItems array

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state, cartItems } };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  console.log(props);

  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
