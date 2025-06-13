import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import supabase from '../../config/config';
import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';

//interface here
interface homeSlice {
    email: string;
    pass: string;
}

const initialState: homeSlice = {
    email: "",
    pass: "",
}

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers:{
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },

        setPass: (state, action: PayloadAction<string>) => {
            state.pass = action.payload;
        }
    }
});

export const submitSlice = async (email: string, pass: string, dispatch: any) => {
    const {data, error} = await supabase.from('users').select('*').eq('user_email', email);

    if (error || data.length == 0) {
        Swal.fire({
            title:'Email Not Registered',
            text:'Your email is not registered please try again',
            icon:'error'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(setEmail(""));
                dispatch(setPass(""));
                window.location.reload();
            }
        })
    }

    else {
        const isMatch = await bcrypt.compare(pass, data[0].user_password);

        if (isMatch) {
            if (data[0].user_type === "admin") {
                localStorage.setItem('userName',data[0].user_name);
                localStorage.setItem('userType',data[0].user_type);

                window.location.href='/Admin';
            } else if (data[0].user_type === "user") {
                localStorage.setItem('userName',data[0].user_name);
                localStorage.setItem('userType',data[0].user_type);

                window.location.href='/User';
            }
        }

        else {
            Swal.fire({
                title:'Invalid Password',
                text:'Your password is invalid please try again',
                icon:'error'
            }).then((result) => {
                if (result.isConfirmed) {
                    dispatch(setEmail(""));
                    dispatch(setPass(""));
                    window.location.reload();
                }
            })
        }
    }
}

export const {setEmail, setPass} = homeSlice.actions;

export default homeSlice.reducer;