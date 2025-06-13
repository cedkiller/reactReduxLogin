import {configureStore} from '@reduxjs/toolkit';
import homeSlice from '../store/slice/homeSlice';
import signupSlice from '../store/slice/signupSlice';

export const store = configureStore({
    reducer: {
        home: homeSlice,
        signup: signupSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 