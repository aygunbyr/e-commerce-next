import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
// Used aliases to prevent name conflicts
import {
  getCategories as getCategoriesFn,
  getProducts as getProductsFn,
  getProductById as getProductByIdFn,
} from '@/services/products';

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
  searchBarText: string;
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
  searchBarText: '',
  currentPage: 1,
  numberOfPages: 1,
};

const PRODUCTS_PER_PAGE = 10;

export const getCategories = createAsyncThunk(
  'products/getCategories',
  getCategoriesFn,
);

export const getProducts = createAsyncThunk(
  'products/getProducts',
  getProductsFn,
);

export const getProductById = createAsyncThunk(
  'products/getProductById',
  getProductByIdFn,
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetFilter: (state) => {
      state.filteredProducts = state.products;
    },
    filterByCategory: (state) => {
      state.filteredProducts =
        state.category === 'all'
          ? state.products
          : state.products.filter(
              (product) => product.category === state.category,
            );
    },
    filterBySearchText: (state) => {
      state.filteredProducts = !state.searchText
        ? state.filteredProducts
        : state.filteredProducts.filter((product) =>
            product.title
              .toLowerCase()
              .includes(state.searchText.toLowerCase()),
          );
    },
    paginateProducts: (state) => {
      const numberOfPagesCalculated = Math.ceil(
        state.filteredProducts.length / PRODUCTS_PER_PAGE,
      );

      state.numberOfPages = numberOfPagesCalculated;

      const startIndex = (state.currentPage - 1) * PRODUCTS_PER_PAGE;
      const endIndex = Math.min(
        startIndex + PRODUCTS_PER_PAGE,
        state.filteredProducts.length,
      );

      const filteredByPageNumber =
        state.numberOfPages === 1
          ? state.filteredProducts
          : state.filteredProducts.slice(startIndex, endIndex);

      state.filteredProducts = filteredByPageNumber;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      if (state.filteredProducts.length > 0) {
        state.currentPage = 1;
      }
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setSearchBarText: (state, action: PayloadAction<string>) => {
      state.searchBarText = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
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

export const {
  setCategory,
  setSearchText,
  setSearchBarText,
  setCurrentPage,
  resetFilter,
  filterByCategory,
  filterBySearchText,
  paginateProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
