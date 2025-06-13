import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

//interface here
interface signupState {
    name: string;
    email: string;
    pass: string;
    type: string;
}

const initialState: signupState = {
    name: "",
    email: "",
    pass: "",
    type: "",
}

const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },

        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setPass: (state, action: PayloadAction<string>) => {
            state.pass = action.payload;
        },

        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload;
        }
    }
});

export const submitSlice = async (name: string, email: string, pass: string, type: string, dispatch: any) => {
    const hashPass = await bcrypt.hash(pass, 10);

    const {data, error} = await supabase.from('users').insert({user_name: name, user_email: email, user_password: hashPass, user_type: type});

    if (error) {
        Swal.fire({
            title:'Error Signing Up',
            text:'There has been error in signing up',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setName(""));
                dispatch(setEmail(""));
                dispatch(setPass(""));
                dispatch(setType(""));
                window.location.reload();
            }
        })
    }

    else {
        Swal.fire({
            title:'Account Registered',
            text:'Your account has been registered successfully',
            icon:'success'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setName(""));
                dispatch(setEmail(""));
                dispatch(setPass(""));
                dispatch(setType(""));
                window.location.href='/';
            }
        })
    }
}

export const {setName, setEmail, setPass, setType} = signupSlice.actions;

export default signupSlice.reducer;