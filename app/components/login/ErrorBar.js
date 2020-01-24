import React, { useEffect, useState } from 'react';
import { useStyles } from '../index';

function ErrorBar(props) {
    const classes = useStyles();
    return (
        <div className={[classes.root, classes.error, classes.formElem].join(' ')}>
            <h3 className={classes.header}>
                {props.title}
            </h3>
            <p className={classes.p}>
                {props.message}
            </p>
        </div>
    )
};

export default ErrorBar;