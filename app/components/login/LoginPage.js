import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/user';
import Paper from '@material-ui/core/Paper';

function LoginPage(props) {
    const [loginError, setError] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loggedIn = useSelector(state => state.user);
    useEffect(() => {
        //TODO
    });

    return (
        <div id="loginContainer">
            <Paper>
                Test Login
            </Paper>
        </div>
    )

}

export default LoginPage;