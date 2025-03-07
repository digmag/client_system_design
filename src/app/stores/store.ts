import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../shared/api/api";


const rootReducer = {
  [api.reducerPath]: api.reducer
}

const apiMiddleware = [api.middleware];

export const store = configureStore({
  reducer: {
    ...rootReducer,
  },
  middleware: getDefaultMiddleware=>getDefaultMiddleware().concat(...apiMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;