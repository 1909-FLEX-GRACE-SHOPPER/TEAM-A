import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../redux/user';
import { mergeCart, fetchCart } from '../../redux/cart';
import { ErrorBar } from '../index';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from '../index';
import { Link } from 'react-router-dom';

function LoginPage(props) {
  const [loginError, setError] = useState(false);
  const user = useSelector(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false)
  const dispatch = useDispatch();

  const classes = useStyles();

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

  const handleSubmit = async () => {
    setError(false);
    !submitted && setSubmitted(true);
    await dispatch(loginUser({ email, password }));
    await dispatch(mergeCart());
  }

  useEffect(() => {
    if (user) {
      setError(false);
      props.history.push('/');
    }
    else {
      if (submitCount > 0) {
        setError(true);
      }
    }
  }, [user]);

  return (
    <div id="loginContainer" className={[classes.root, classes.centerHero].join(' ')}>

      {
        user &&
        <div>
          LoggedIn!
                    </div>
      }
      <form className={classes.root}>
        <h1 className={classes.header}>Welcome Back</h1>
        <h3 className={classes.header}>Please login to your account</h3>
        {loginError &&
          <ErrorBar title={"Login failed"} message={"Incorrect email or password"} />
        }
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleChange}
          className={classes.formElem}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handleChange}
          className={classes.formElem}
        />
        <Button className={classes.formElem} variant="contained" color="primary" onClick={handleSubmit}>Log In</Button>
        <Link to="/signup" variant="body2">Don't have an account? Sign Up</Link>
      </form>
    </div>
  )

}

export default LoginPage;