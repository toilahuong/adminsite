import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/user';
import fileReducer from './slices/file';
import categoryReducer from './slices/category';
import selectReducer from './slices/select';

export default configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        category: categoryReducer,
        select: selectReducer,
    },
  })