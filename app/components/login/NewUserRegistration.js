//Placeholder for newuser registration component

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../../redux/user';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from '../index';
import { Link } from 'react-router-dom';
import { ErrorBar } from '../index';

function NewUserRegistration(props) {
  const user = useSelector(state => state.user);
  const cart = useSelector(state => state.cart);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [signupError, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false)

  const classes = useStyles();

  const handleChange = (event) => {
    switch (event.target.id) {
      case "firstname":
        setFirstName(event.target.value);
        break;
      case "lastname":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setError(false);
    !submitted && setSubmitted(true);
    await dispatch(createUser({ firstName, lastName, email, password }, cart));
  }

  useEffect(() => {
    if (user) {
      setError(false);
      props.history.push('/');
    }
    else {
      if (submitted) {
        setError(true)
      }
    }
  }, [user]);

  return (
    <div id="loginContainer" className={[classes.root, classes.centerHero].join(' ')}>
      <form className={classes.root}>
        <h1 className={classes.header}>Sign up</h1>
        <h3 className={classes.header}>glad to see you!</h3>
        {signupError &&
          <ErrorBar title={"Signup failed"} message={"Email already exists, please login or use different email to signup."} />
        }
        <TextField
          id="firstname"
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={handleChange}
          className={classes.formElem}
        />
        <TextField
          id="lastname"
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={handleChange}
          className={classes.formElem}
        />
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
        <Button className={classes.formElem} variant="contained" color="primary" onClick={handleSubmit}>Sign up</Button>
        <Link to="/login" variant="body2">Already have an account? Sign in</Link>
      </form>

    </div>
  )

}

export default NewUserRegistration; 