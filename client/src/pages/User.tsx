import React from 'react';
import {useNavigate} from 'react-router-dom';

function User () {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');

    const back = async () => {
        navigate('/');
    }

    return(
        <>
        <p>{userName}</p>
        <p>{userType}</p>
        <button onClick={() => back()}>back</button>
        </>
    );
}

export default User;