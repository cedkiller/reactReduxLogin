import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import {setEmail, setPass, submitSlice} from '../store/slice/homeSlice';
import Swal from 'sweetalert2';
import '../assets/css/Style.css';

function Home () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useSelector((state: RootState) => state.home.email);
    const pass = useSelector((state: RootState) => state.home.pass);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        submitSlice(email, pass, dispatch)
    }

    const signup = async () => {
        navigate('/Signup');
    }

    return(
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Login</h1>
                <br />

                <form onSubmit={submit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" placeholder='Enter a email' value={email} onChange={(e) => dispatch(setEmail(e.target.value))} className='form-control'/>
                        </div>
                    </div>
                    <br />

                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" value={pass} onChange={(e) => dispatch(setPass(e.target.value))} className='form-control'/>
                        </div>
                    </div>
                    <br />

                    <button className='btn btn-primary w-100'>Login</button>
                </form>
                <hr />

                <button className='btn btn-light w-100' onClick={() => signup()}>Sign Up</button>
            </div>
        </div>
        </>
    );
}

export default Home;