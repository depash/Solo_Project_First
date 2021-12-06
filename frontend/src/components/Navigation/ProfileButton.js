import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => {

        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <li>{user.username}</li>
            <button onClick={logout}>Log Out</button>
        </>
    );
}

export default ProfileButton;
