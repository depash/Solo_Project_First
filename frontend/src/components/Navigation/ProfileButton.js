import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
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
            <div id="logoutContainer">
                <li id="username">{user.username}</li>
                <Link id="logoutButton" onClick={logout}>Log Out</Link>
            </div>
        </>
    );
}

export default ProfileButton;
