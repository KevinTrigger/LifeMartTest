import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductBuy, orderState} from "../types/types";

const initialState: orderState = {
  list: [],
  options: [],
  loading: false,
  error: null,
}

export const fetchMenu = createAsyncThunk<IProduct[], undefined, {rejectValue: string}>(
  'orders/fetchMenu',
  async function (_, { rejectWithValue }) {
      const response = await axios.get(
        "https://dev-su.eda1.ru/test_task/products.php"
      );
      if (response.data.success) {
        return response.data.products
      };
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductBuy>) => {
      state.list.push(action.payload);
    },
    clearProducts: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.options = action.payload;
        state.loading = false;
      })
  }
})

export const { addProduct, clearProducts } = orderSlice.actions;

export default orderSlice.reducer;