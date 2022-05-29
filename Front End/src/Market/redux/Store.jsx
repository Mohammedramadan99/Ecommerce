import {configureStore,combineReducers} from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import productsReducer from './product/productSlice'
import cartReducer from './cart/cartSlice'
import orderReducer from './order/orderSlice'
import customerRevReducer from './customer/customerSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  const rootReducer = combineReducers({ auth: authReducer,products:productsReducer, cart: cartReducer, orders:orderReducer, customerRevs:customerRevReducer });
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export let persistor = persistStore(store);


// export const store = configureStore({
//     reducer:{
//         auth:authReducer,
//         products:productsReducer,
//         cart:cartReducer
//     },
// })