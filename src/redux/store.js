import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/user';
import fileReducer from './slices/file';
import categoryReducer from './slices/category';
import selectReducer from './slices/select';
import selectAttributeReducer from './slices/selectAttribute';
import attributeReducer from './slices/attribute';
import attributeParentReducer from './slices/attributeParent';
import variantReducer from './slices/variant';

export default configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        category: categoryReducer,
        select: selectReducer,
        selectAttribute: selectAttributeReducer,
        attribute: attributeReducer,
        attributeParent: attributeParentReducer,
        variant: variantReducer,
    },
  })