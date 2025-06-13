import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from '../store/store';
import {setName, setEmail, setPass, setType, submitSlice} from '../store/slice/signupSlice';
import Swal from 'sweetalert2';
import '../assets/css/Style.css';

function Signup () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const name = useSelector((state: RootState) => state.signup.name);
    const email = useSelector((state: RootState) => state.signup.email);
    const pass = useSelector((state: RootState) => state.signup.pass);
    const type = useSelector((state: RootState) => state.signup.type);

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        submitSlice(name, email, pass, type, dispatch);
    }

    const login = async () => {
        navigate('/');
    }

    return(
        <>
        <br />

        <div style={{display:'flex', justifyContent:'center'}}>
            <div className='div'>
                <h1 style={{textAlign:'center', fontSize:20, fontWeight:'bold'}}>Sign Up</h1>
                <br />

                <form onSubmit={submit}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" placeholder='Enter a name' value={name} onChange={(e) => dispatch(setName(e.target.value))} className='form-control'/>
                        </div>
                    </div>
                    <br />

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

                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">User Type</label>
                        <div className="col-sm-10">
                            <select onChange={(e) => dispatch(setType(e.target.value))} className='form-control'>
                                <option value="" selected disabled>Select User Type</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>
                    <br />

                    <button className='btn btn-primary w-100'>Sign Up</button>
                </form>
                <hr />

                <button className='btn btn-light w-100' onClick={() => login()}>Login</button>
            </div>
        </div>
        </>
    );
}

export default Signup;