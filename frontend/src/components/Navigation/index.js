import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [LogedIn, setLogedIn] = useState("/")
    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
            <>
                <NavLink className="auth" to="/login">Log In</NavLink>
                <NavLink className="auth" id="sighnup" to="/signup">Sign Up</NavLink>
            </>
        );
    }
    useEffect(() => {
        if (sessionUser) {
            setLogedIn("/showAlbums")
        }
        else {
            setLogedIn("/")
        }
    }, [sessionUser])

    return (
        <div className="navDiv">
            <nav>
                <ul>
                    <li>
                        <div className="links">
                            <div className="logo">
                                <NavLink exact to={`${LogedIn}`}>Picturocity</NavLink>
                            </div>
                            <div class="login">
                                {isLoaded && sessionLinks}
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Navigation;
