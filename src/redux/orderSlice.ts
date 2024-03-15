import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk, current } from "@reduxjs/toolkit";
import { IProduct, IProductBuy, orderState, ProductOrder } from "../types/types";

const initialState: orderState = {
  list: [],
  options: [],
  loading: false,
  error: null,
}

export const fetchMenu = createAsyncThunk<IProduct[], undefined, { rejectValue: string }>(
  'orders/fetchMenu',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axios.get("https://dev-su.eda1.ru/test_task/products.php");
      if (response.data.success) {
        return response.data.products
      };
    }

    catch (error) {
      console.error(error);
    }
  }
)

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductBuy>) => {
      state.list.push(action.payload);
    },
    changeCount: (state, action: PayloadAction<ProductOrder>) => {
      const currentId = action.payload.id;
      const addCount = action.payload.count;

      state.list.map(elem => {
        if (elem.id === currentId) {
          elem.count += addCount;
        }
      })
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

export const { addProduct, changeCount, clearProducts } = orderSlice.actions;

export default orderSlice.reducer;