import React, { useEffect, useState } from 'react';
import { useStyles } from './index';

function SuccessBar(props) {
  const classes = useStyles();
  return (
    <div className={[classes.root, classes.success, classes.formElem].join(' ')}>
      <h3 className={classes.header}>
        {props.title}
      </h3>
      <p className={classes.p}>
        {props.message}
      </p>
    </div>
  )
};

export default SuccessBar;