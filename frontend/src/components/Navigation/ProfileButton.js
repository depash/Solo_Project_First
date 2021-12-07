import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => {

        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return (
        <>
            <div className className="logoutContainer">
                <li>{user.username}</li>
                <button onClick={logout}>Log Out</button>
            </div>
        </>
    );
}

export default ProfileButton;
