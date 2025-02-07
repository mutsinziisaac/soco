import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  productId: number;
  price: number;
  quantity: number;
  name: string;
  image: string;
  discount: number;
  uom: string;
}

interface CartState {
  cart: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  cart: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.cart.push(action.payload);
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.productId !== action.payload
      );
    },

    incQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    decQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.productId === action.payload) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    },
    totalPrice: (state: any) => {
      state.totalPrice = state.cart.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0
      );
    },
  },
});

export const { addItem, removeItem, incQuantity, decQuantity, totalPrice } =
  cartSlice.actions;
export default cartSlice.reducer;
