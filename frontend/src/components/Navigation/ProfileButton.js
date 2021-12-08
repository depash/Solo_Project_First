import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const logout = (e) => {

        e.preventDefault();
        history.push(`/`);
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
