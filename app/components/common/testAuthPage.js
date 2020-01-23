import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../redux/user';

function TestAuthPage() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(fetchLogin());
        }
    });

    return (
        <div>
            {user ? `currently  logged in as ${user.email} and sessionId ${user.sessionId}` : `no user`}
        </div>
    )
};

export default TestAuthPage;