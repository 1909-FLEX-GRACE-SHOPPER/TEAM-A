import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function LoginPage(props) {
    const [loginError, setError] = useState(false);
    const user = useSelector(state => state.user);
    const [initLoad, setInit] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleChange = (event) => {
        switch (event.target.id) {
            case "password": 
                setPassword(event.target.value);
                break;
            case "email":
                setEmail(event.target.value);
                break;
            default:
                break;
        }
    };
    const handleSubmit = () => {
        setInit(false);
        setError(false);
        let user = {email, password}
        dispatch(loginUser(user));
    }

    useEffect(() => {
        //Placeholder
        console.log(email);
        console.log(password);
        if (!initLoad && !user) {
            setError(true);
        }
        
    });

    return (
        <div id="loginContainer">
            <Paper>
                {loginError && 
                    <div>
                        Error Logging In
                    </div>
                }
                {
                    user &&
                    <div>
                        LoggedIn!
                    </div>
                }
                <form>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleChange}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Log In</Button>
                </form>
            </Paper>
        </div>
    )

}

export default LoginPage;