import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';

export interface ProductsState {
  product: Product | null;
  productError: any;
  productLoading: boolean;
  filteredProducts: Product[];
  selectedCategory: string;
  searchText: string;
  searchBarText: string;
  currentPage: number;
  numberOfPages: number;
}

const initialState: ProductsState = {
  product: null,
  productError: null,
  productLoading: false,
  filteredProducts: [],
  selectedCategory: 'all',
  searchText: '',
  searchBarText: '',
  currentPage: 1,
  numberOfPages: 1,
};

const PRODUCTS_PER_PAGE = 10;

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilteredProducts: (state, action: PayloadAction<Product[]>) => {
      state.filteredProducts = action.payload;
    },
    filterByCategory: (state) => {
      state.filteredProducts =
        state.selectedCategory === 'all'
          ? state.filteredProducts
          : state.filteredProducts.filter(
              (product) => product.category === state.selectedCategory,
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
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
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
  extraReducers: (builder) => {},
});

export const {
  setSelectedCategory,
  setSearchText,
  setSearchBarText,
  setCurrentPage,
  setFilteredProducts,
  filterByCategory,
  filterBySearchText,
  paginateProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
