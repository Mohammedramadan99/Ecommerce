import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import mailSlice from './Mail/MailSlice'
import servicesSlice from './Service/servicesSlice'
import orderSlice from './order/orderSlice'
import projectsSlice from './Projects/projectsSlice'

import
{
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

const rootReducer = combineReducers({ auth: authReducer, mail: mailSlice, services: servicesSlice, orders: orderSlice, projects: projectsSlice });
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