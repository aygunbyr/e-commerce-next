import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

export interface ProductsState {
  products: Product[];
  productsError: any;
  productsLoading: boolean;
  categories: string[];
  categoriesError: any;
  categoriesLoading: boolean;
  product: Product | null;
  productError: any;
  productLoading: boolean;
  filteredProducts: Product[];
  category: string;
  searchText: string;
  currentPage: number;
  numberOfPages: number;
}

const initialState: ProductsState = {
  products: [],
  productsError: null,
  productsLoading: false,
  categories: [],
  categoriesError: null,
  categoriesLoading: false,
  product: null,
  productError: null,
  productLoading: false,
  filteredProducts: [],
  category: 'all',
  searchText: '',
  currentPage: 1,
  numberOfPages: 1,
};

const BASE_URL = 'https://fakestoreapi.com';
const PRODUCTS_PER_PAGE = 10;

export const getCategories = createAsyncThunk(
  'products/getCategories',
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  async (productId: number) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterProducts: (state) => {
      const filteredByCategory =
        state.category === 'all'
          ? state.products
          : state.products.filter(
              (product) => product.category === state.category,
            );

      const filteredBySearchText = !state.searchText
        ? filteredByCategory
        : filteredByCategory.filter(({ title }) =>
            title.toLowerCase().includes(state.searchText.toLowerCase()),
          );

      const numberOfPagesCalculated = Math.ceil(
        filteredBySearchText.length / PRODUCTS_PER_PAGE,
      );

      state.numberOfPages = numberOfPagesCalculated;

      const startIndex = (state.currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = Math.min(
        startIndex + PRODUCTS_PER_PAGE,
        filteredBySearchText.length,
      );

      const filteredByPageNumber =
        state.numberOfPages === 1
          ? filteredBySearchText
          : filteredBySearchText.slice(startIndex, endIndex);

      state.filteredProducts = filteredByPageNumber;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.currentPage = 1;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      if (action.payload > state.numberOfPages || action.payload < 1) return;
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state, action) => {
        state.categoriesLoading = true;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<string[]>) => {
          state.categories = action.payload;
          state.categoriesError = null;
          state.categoriesLoading = false;
        },
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.categories = [];
        state.categoriesError = action.error;
        state.categoriesLoading = false;
      })
      .addCase(getProducts.pending, (state, action) => {
        state.productsLoading = true;
      })
      .addCase(
        getProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.productsError = null;
          state.productsLoading = false;
        },
      )
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.productsError = action.error;
        state.productsLoading = false;
      })
      .addCase(getProductById.pending, (state, action) => {
        state.productLoading = true;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<Product>) => {
          state.product = action.payload;
          state.productError = null;
          state.productLoading = false;
        },
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.product = null;
        state.productError = action.error;
        state.productLoading = false;
      });
  },
});

export const { filterProducts, setCategory, setSearchText, setCurrentPage } =
  productsSlice.actions;

export default productsSlice.reducer;
