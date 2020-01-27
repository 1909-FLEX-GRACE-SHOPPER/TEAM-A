//Placeholder for newuser registration component

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/user';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useStyles } from '../index';
import { Link } from 'react-router-dom';

function NewUserRegistration(props) {
  const user = useSelector(state => state.user);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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

  const handleSubmit = () => {
    dispatch(updateUser(user.id, { firstName, lastName, email, password, userId: user.id }));
    props.history.push(`/`)
  }

  return (
    <div id="loginContainer" className={[classes.root, classes.centerHero].join(' ')}>

      {
        user.isRegistered &&
        <div>
          LoggedIn!
                    </div>
      }
      <form className={classes.root}>
        <h1 className={classes.header}>Sign up</h1>
        <h3 className={classes.header}>glad to see you!</h3>

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